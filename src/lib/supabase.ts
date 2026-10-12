import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { UserRole } from '../types';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(
  supabaseUrl && supabaseAnonKey && supabaseUrl.includes('supabase.co')
);

if (!isSupabaseConfigured) {
  console.error('[auth] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — sign-in will fail.');
}

// PKCE puts the magic-link token in ?code= instead of #access_token=, which the
// hash router in App.tsx would otherwise mistake for a route.
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { flowType: 'pkce', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});

export type AuthResult = {
  success: boolean;
  error?: string;
  needsEmailConfirm?: boolean;
};

const clean = (email: string) => email.trim().toLowerCase();

export async function signUp(
  email: string,
  password: string,
  metadata: Record<string, any>,
  role: Extract<UserRole, 'brand' | 'creator'>
): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signUp({
    email: clean(email),
    password,
    options: { data: { ...metadata, role } },
  });
  if (error) return { success: false, error: error.message };
  // Supabase returns an empty identities array when the email is already registered.
  if (data.user && data.user.identities?.length === 0) {
    return { success: false, error: 'An account with this email already exists. Sign in instead.' };
  }
  return { success: true, needsEmailConfirm: !data.session };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithPassword({ email: clean(email), password });
  if (!error) return { success: true };
  if (error.code === 'email_not_confirmed') {
    return {
      success: false,
      needsEmailConfirm: true,
      error: 'Email not confirmed. Check your inbox for the verification link, then sign in.',
    };
  }
  if (error.code === 'invalid_credentials') {
    return { success: false, error: 'Incorrect email or password.' };
  }
  return { success: false, error: error.message };
}

export async function sendMagicLink(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.signInWithOtp({
    email: clean(email),
    options: { shouldCreateUser: false, emailRedirectTo: window.location.origin },
  });
  if (error) {
    // Supabase phrases "no such account" as "Signups not allowed for otp" because
    // shouldCreateUser is false; map it, plus the generic phrasing, to plain English.
    const msg = /user not found|signups not allowed/i.test(error.message)
      ? 'No account for that email. Register first.'
      : error.message;
    return { success: false, error: msg };
  }
  return { success: true, needsEmailConfirm: true };
}

export async function resendConfirmation(email: string): Promise<AuthResult> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: clean(email),
    options: { emailRedirectTo: window.location.origin },
  });
  return error ? { success: false, error: error.message } : { success: true, needsEmailConfirm: true };
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export function onAuthStateChange(cb: (session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((_event, session) => cb(session));
}
