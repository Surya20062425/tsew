/**
 * The one branch that stayed untested: a confirmed account actually signing in.
 * Run: node scripts/auth-check3.mjs <email> <password>
 */
import { createServer } from 'vite';

globalThis.window = { location: { origin: 'http://localhost:3000' } };

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error('usage: node scripts/auth-check3.mjs <email> <password>');
  process.exit(2);
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'error' });
const auth = await server.ssrLoadModule('/src/lib/supabase.ts');

const results = [];
const check = (name, cond, detail) => {
  results.push({ name, pass: !!cond });
  console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${cond ? '' : `  -> ${JSON.stringify(detail)}`}`);
};

const signIn = await auth.signIn(email, password);
check('confirmed account signs in', signIn.success === true, signIn);

const session = await auth.getSession();
check('session exists after sign-in', !!session, session);
check('session carries the user id', !!session?.user?.id, session?.user?.id);
check('role metadata survived signup', session?.user?.user_metadata?.role === 'brand', session?.user?.user_metadata);

// verify the token actually authenticates against the API
if (session?.access_token) {
  const res = await fetch(`${session.user.aud ? '' : ''}https://bjqxcjeylswzphlhsnbn.supabase.co/auth/v1/user`, {
    headers: { apikey: 'sb_publishable_GbQjXtcjNr-tFeKm9fXhKA_GRnZc8b-', Authorization: `Bearer ${session.access_token}` },
  });
  const body = await res.json();
  check('access token authenticates with the API', res.status === 200 && body.email === email, { status: res.status, body });
}

await auth.signOut();
check('signOut clears the session', (await auth.getSession()) === null, null);

await server.close();
const failed = results.filter((r) => !r.pass);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
