/**
 * End-to-end check of src/lib/supabase.ts against the live Supabase project.
 * Loads the REAL module through Vite's SSR transform (so import.meta.env resolves),
 * then exercises every branch the login/register UI depends on.
 * Run: node scripts/auth-check.mjs
 */
import { createServer } from 'vite';

globalThis.window = { location: { origin: 'http://localhost:3000' } };

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

const auth = await server.ssrLoadModule('/src/lib/supabase.ts');

const results = [];
const check = (name, cond, detail) => {
  results.push({ name, pass: !!cond, detail });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  -> ${JSON.stringify(detail)}`}`);
};

const email = `tsew-e2e-${Date.now()}@mailinator.com`;
const password = 'CorrectHorse9!';

check('isSupabaseConfigured is true with .env keys', auth.isSupabaseConfigured === true, auth.isSupabaseConfigured);

// 1. sign up a fresh brand
const up = await auth.signUp(email, password, { name: 'E2E Brand', role: 'brand' }, 'brand');
check('signUp new email succeeds', up.success === true, up);
check('signUp asks for email confirmation (needsEmailConfirm)', up.needsEmailConfirm === true, up);

// 2. duplicate signup is rejected, not silently swallowed
const dup = await auth.signUp(email, password, { name: 'E2E Brand', role: 'brand' }, 'brand');
check('signUp duplicate email is rejected', dup.success === false, dup);

// 3. wrong password
const bad = await auth.signIn(email, 'totally-wrong-password');
check('signIn wrong password fails', bad.success === false, bad);
check('wrong password reports "Incorrect email or password."', bad.error === 'Incorrect email or password.', bad.error);

// 4. correct password but unconfirmed email -> must be flagged as confirm-pending
const unconfirmed = await auth.signIn(email, password);
check('signIn unconfirmed email fails', unconfirmed.success === false, unconfirmed);
check('unconfirmed sign-in sets needsEmailConfirm', unconfirmed.needsEmailConfirm === true, unconfirmed);

// 5. magic link for an email with no account
const noAcct = await auth.sendMagicLink(`nobody-${Date.now()}@mailinator.com`);
check('magic link for unknown email is rejected', noAcct.success === false, noAcct);

// 6. magic link for the account we just made
const link = await auth.sendMagicLink(email);
check('magic link for existing account succeeds', link.success === true, link);

// 7. resend confirmation
const resend = await auth.resendConfirmation(email);
check('resendConfirmation succeeds', resend.success === true, resend);

// 8. session accessors exist and return null when signed out
check('getSession returns null when signed out', (await auth.getSession()) === null, null);
check('onAuthStateChange returns an unsubscribe handle', typeof auth.onAuthStateChange(() => {}).data.subscription.unsubscribe === 'function', null);

await server.close();

const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
