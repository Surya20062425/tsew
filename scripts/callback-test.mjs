/**
 * Verifies the auth-callback landing behaviour: a confirmation/magic link
 * redirects back with tokens (or an error) in the URL hash, and the app must
 * not mistake that for a route. Uses the full App (hash router + AuthProvider).
 *
 * Run: node scripts/callback-test.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const env = Object.fromEntries(
  readFileSync(path.join(root, '.env'), 'utf8')
    .split('\n')
    .filter((l) => l.trim() && !l.trim().startsWith('#'))
    .map((l) => {
      const i = l.indexOf('=');
      return [l.slice(0, i).trim(), l.slice(i + 1).trim()];
    })
);

await build({
  entryPoints: [path.join(root, 'scripts/_app-entry.tsx')],
  bundle: true, format: 'iife', jsx: 'automatic',
  outfile: path.join(root, 'scripts/_app-bundle.js'),
  define: { 'process.env.NODE_ENV': '"development"', 'import.meta.env': JSON.stringify(env) },
  logLevel: 'warning',
});

const { JSDOM } = await import(new URL('file:///C:/Users/b7993/fiverr/client/node_modules/jsdom/lib/api.js').href);
const results = [];
const check = (name, cond, detail) => {
  results.push({ name, pass: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  -> ${JSON.stringify(detail)}`}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const boot = async (url) => {
  const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
    url, runScripts: 'outside-only', pretendToBeVisual: true,
  });
  const { window } = dom;
  window.fetch = (...a) => fetch(...a);
  window.localStorage.clear();
  globalThis.window = window;
  globalThis.document = window.document;
  Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
  window.eval(readFileSync(path.join(root, 'scripts/_app-bundle.js'), 'utf8'));
  for (let i = 0; i < 30; i++) await wait(50);
  return window;
};

// 1. Confirmation link landing: tokens in the hash, as Supabase actually sends them.
const w1 = await boot('http://localhost:3000/#access_token=eyJhbG.fake&expires_in=3600&refresh_token=abc&token_type=bearer&type=signup');
const t1 = (w1.document.body.textContent || '').replace(/\s+/g, ' ');
check('token hash is not treated as a route', !/Unrecognized|not found/i.test(t1), t1.slice(0, 150));
check('app still renders the login gate (unauthenticated)', /Sign in to CreatorBridge/.test(t1), t1.slice(0, 150));
check('token fragment is cleared from the URL', !w1.location.hash.includes('access_token='), w1.location.hash);

// 2. Error landing: Supabase reports failures in the hash too.
const w2 = await boot('http://localhost:3000/#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired');
const t2 = (w2.document.body.textContent || '').replace(/\s+/g, ' ');
check('expired-link hash does not crash the app', /Sign in to CreatorBridge/.test(t2), t2.slice(0, 150));
check('expired-link hash is cleared from the URL', !w2.location.hash.includes('error_description='), w2.location.hash);

// 3. Normal deep link still routes correctly.
const w3 = await boot('http://localhost:3000/#register');
const t3 = (w3.document.body.textContent || '').replace(/\s+/g, ' ');
check('normal hash route still works (#register)', /Join CreatorBridge/.test(t3), t3.slice(0, 150));

// 4. No hash at all -> home/login gate.
const w4 = await boot('http://localhost:3000/');
const t4 = (w4.document.body.textContent || '').replace(/\s+/g, ' ');
check('no hash renders without crashing', /Sign in to CreatorBridge/.test(t4), t4.slice(0, 150));

console.log(`\n${results.filter((r) => r.pass).length}/${results.length} checks passed`);
writeFileSync(path.join(root, 'scripts', '_callback-result.json'), JSON.stringify(results, null, 2));
process.exit(results.filter((r) => !r.pass).length ? 1 : 0);
