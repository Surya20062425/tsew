/**
 * Real DOM test of the Supabase auth UI wiring.
 * Bundles the actual LoginPage + AuthProvider with esbuild (Vite's .env injection
 * reproduced via --define), runs it in jsdom against the live Supabase project,
 * and drives the form the way a user would.
 *
 * Run: node scripts/dom-auth-test.mjs
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bundle = path.join(root, 'scripts', '_dom-bundle.js');

// Parse .env the way Vite does, so the test exercises the same credentials.
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
  entryPoints: [path.join(root, 'scripts/_dom-entry.tsx')],
  bundle: true,
  format: 'iife',
  jsx: 'automatic',
  outfile: bundle,
  define: {
    'process.env.NODE_ENV': '"development"',
    'import.meta.env': JSON.stringify(env),
  },
  logLevel: 'warning',
});

// jsdom lives in the sibling fiverr project; no need to add a dependency here.
const jsdomPath = 'C:/Users/b7993/fiverr/client/node_modules/jsdom/lib/api.js';
if (!existsSync(jsdomPath)) {
  console.error(`jsdom not found at ${jsdomPath} — cannot run the DOM test.`);
  process.exit(2);
}
const { JSDOM } = await import(new URL('file:///' + jsdomPath).href);

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
});
const { window } = dom;

// jsdom has no fetch, and supabase-js needs it.
window.fetch = (...args) => fetch(...args);
window.localStorage.clear();
globalThis.window = window;
globalThis.document = window.document;
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const errors = [];
window.addEventListener('error', (e) => errors.push(String(e.error || e.message)));
window.onunhandledrejection = (e) => errors.push(String(e.reason));

try {
  window.eval(readFileSync(bundle, 'utf8'));
} catch (e) {
  console.error('bundle threw during eval:', e);
  process.exit(3);
}

const results = [];
const check = (name, cond, detail) => {
  results.push({ name, pass: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  -> ${JSON.stringify(detail)}`}`);
};

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const text = () => window.document.body.textContent || '';
const $ = (sel) => window.document.querySelector(sel);
const settle = async (n = 40) => { for (let i = 0; i < n; i++) await wait(25); };

// React 19 mounts asynchronously — give it a tick before asserting.
await settle(20);

// --- render ---
check('no uncaught render errors', errors.length === 0, errors.slice(0, 3));
check('login form rendered', /Sign in to CreatorBridge/.test(text()), text().slice(0, 120));
check('password method is the default', !!$('#password'), null);
check('supabase configured badge is honest', /Supabase Auth Connected/.test(text()), null);
check('one-click persona backdoor is gone', !/One-Click Sign In/.test(text()), null);
check('demo emails are no longer prefilled', $('#email-pw')?.value === '', $('#email-pw')?.value);
check('admin role tab is gone', !/System Admin|Platform Reviewer/.test(text()), null);
check('magic-link method is available', /Email Sign-In Link/.test(text()), null);

const errorBanner = () => {
  const el = window.document.querySelector('.bg-rose-50');
  return el ? el.textContent.replace(/\s+/g, ' ').trim() : null;
};
const noticeBanner = () => {
  const el = window.document.querySelector('.bg-blue-50');
  return el ? el.textContent.replace(/\s+/g, ' ').trim() : null;
};

const setVal = (el, v) => {
  // React's value tracker only notices changes made through the native setter.
  Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set.call(el, v);
  el.dispatchEvent(new window.InputEvent('input', { bubbles: true, cancelable: true }));
};

/** Submit the form and wait until the in-flight "Authenticating…" label clears. */
const submitAndWait = async () => {
  const form = $('form');
  if (form.requestSubmit) form.requestSubmit();
  else form.dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true }));
  for (let i = 0; i < 200; i++) {
    await wait(50);
    if (!/Authenticating|Sending link/.test(text())) return true;
  }
  return false;
};

// --- 1. wrong password surfaces a real error ---
setVal($('#email-pw'), 'tsew-test-1791827246@mailinator.com');
setVal($('#password'), 'definitely-the-wrong-password');
await submitAndWait();
await settle(8);
check('wrong password shows the exact inline error', errorBanner() === 'Incorrect email or password.', errorBanner());
check('wrong password did not authenticate', window.__auth.isAuthenticated === false, null);
check('wrong password did not navigate', window.__t.nav.length === 0, window.__t.nav);

// --- 2. unconfirmed account surfaces the confirm-pending path with a resend action ---
// Needs an account that exists but is not yet confirmed. If it is already
// confirmed (or absent), report these as SKIPPED rather than passing silently.
setVal($('#password'), 'TestPass123!');
await submitAndWait();
await settle(8);
const confirmBanner = errorBanner();
const unconfirmedApplicable = /not confirmed/i.test(confirmBanner || '');
if (unconfirmedApplicable) {
  check('unconfirmed account shows the exact confirm-your-email error',
    confirmBanner === 'Email not confirmed. Check your inbox for the verification link, then sign in.Resend link', confirmBanner);
  check('resend-confirmation button appears for this error only', /Resend link/.test(confirmBanner), confirmBanner);
  check('unconfirmed account did not authenticate', window.__auth.isAuthenticated === false, null);
} else {
  console.log('SKIP  unconfirmed-account branch — no unconfirmed test account available (banner: ' + JSON.stringify(confirmBanner) + ')');
}

// --- 3. magic link mode rejects an unknown email with plain English ---
const linkTab = [...window.document.querySelectorAll('button')].find((b) => /Email Sign-In Link/.test(b.textContent || ''));
linkTab.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await settle(8);
check('magic-link form rendered', !!$('#email'), null);
setVal($('#email'), `nobody-${Date.now()}@mailinator.com`);
await submitAndWait();
await settle(8);
check('unknown email is rejected in plain English', /No account for that email/.test(errorBanner() || ''), errorBanner());
check('stale resend button does not leak into the magic-link error', !/Resend link/.test(errorBanner() || ''), errorBanner());

// --- 4. a confirmed account signs in and lands on the right dashboard ---
const pwTab = [...window.document.querySelectorAll('button')].find((b) => /Email \+ Password/.test(b.textContent || ''));
pwTab.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
await settle(8);
setVal($('#email-pw'), 'tsew-test-1791827246@mailinator.com');
setVal($('#password'), 'TestPass123!');
await submitAndWait();
await settle(20);
check('confirmed account authenticates', window.__auth.isAuthenticated === true, window.__auth.currentUser);
check('authenticated user is the account we signed in as',
  window.__auth.currentUser?.email === 'tsew-test-1791827246@mailinator.com', window.__auth.currentUser?.email);
check('role comes from token metadata, not the UI tab',
  window.__auth.currentUser?.role === 'brand', window.__auth.currentUser?.role);
check('successful sign-in navigates to the dashboard', window.__t.nav.includes('home'), window.__t.nav);
check('error banner cleared on success', errorBanner() === null, errorBanner());

console.log(`\n${results.filter((r) => r.pass).length}/${results.length} checks passed`);
writeFileSync(path.join(root, 'scripts', '_dom-result.json'), JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.pass).length;
process.exit(failed ? 1 : 0);
