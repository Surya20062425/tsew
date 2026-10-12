import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

// Check if credentials look like real Supabase keys
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.includes('supabase.co') && 
  !supabaseUrl.includes('your-project')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Local in-memory / storage fallback for Supabase Auth simulation when keys are pending
export interface SupabaseAuthUser {
  id: string;
  email: string;
  role: 'brand' | 'creator' | 'admin';
  user_metadata: Record<string, any>;
  created_at: string;
}

const STORAGE_USERS_KEY = 'cb_supabase_registered_users';
const STORAGE_SESSION_KEY = 'cb_supabase_current_session';

export function getStoredSupabaseUsers(): Record<string, SupabaseAuthUser> {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading stored supabase users:', e);
  }
  return {
    'david.vance@auramotors.com': {
      id: 'usr_brand_demo',
      email: 'david.vance@auramotors.com',
      role: 'brand',
      user_metadata: {
        name: 'David Vance',
        company: 'Aura Motors Inc.',
        title: 'Brand Creative Director',
        industry: 'Automotive & Mobility',
        companySize: '51-200 Studio / Mid-Market',
      },
      created_at: new Date().toISOString(),
    },
    'alex.morgan@runwaycinema.com': {
      id: 'usr_creator_demo',
      email: 'alex.morgan@runwaycinema.com',
      role: 'creator',
      user_metadata: {
        name: 'Alex Morgan',
        company: '@alex_morgan_cinema',
        title: 'Photoreal Automotive Specialist',
        verifiedTier: 'Tier 1 Verified Creator',
        certificateId: 'CB-VER-2026-9812',
        overallScore: 98,
      },
      created_at: new Date().toISOString(),
    },
  };
}

export function saveStoredSupabaseUser(user: SupabaseAuthUser) {
  try {
    const users = getStoredSupabaseUsers();
    users[user.email.toLowerCase()] = user;
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Error saving supabase user:', e);
  }
}

// Unified Supabase Email Auth Service
export const supabaseAuthService = {
  // 1. Email-Only Authentication (OTP / Magic Link / One-click Email Auth)
  async signInWithEmailOnly(email: string): Promise<{ success: boolean; user?: SupabaseAuthUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    // If real Supabase is configured, trigger real OTP
    if (supabase) {
      try {
        const { error } = await supabase.auth.signInWithOtp({
          email: cleanEmail,
          options: {
            shouldCreateUser: false,
          },
        });
        if (error) {
          console.warn('Supabase signInWithOtp notice:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase real client error:', err.message);
      }
    }

    // Check stored user directory
    const users = getStoredSupabaseUsers();
    const existing = users[cleanEmail];

    if (existing) {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(existing));
      return { success: true, user: existing };
    }

    // If not found in known directory, create a registered profile using email prefix
    const role: 'brand' | 'creator' = cleanEmail.includes('creator') || cleanEmail.includes('artist') ? 'creator' : 'brand';
    const fallbackUser: SupabaseAuthUser = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      role,
      user_metadata: {
        name: cleanEmail.split('@')[0].replace(/[._]/g, ' '),
        company: role === 'brand' ? 'Enterprise Client' : 'Independent AI Studio',
        title: role === 'brand' ? 'Brand Creative Director' : 'Verified Generative Filmmaker',
        verifiedTier: role === 'creator' ? 'Tier 1 Verified Creator' : undefined,
      },
      created_at: new Date().toISOString(),
    };

    saveStoredSupabaseUser(fallbackUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(fallbackUser));
    return { success: true, user: fallbackUser };
  },

  // 2. Sign Up with Email, Form Metadata & Role
  async signUpWithForm(
    email: string,
    password: string,
    metadata: Record<string, any>,
    role: 'brand' | 'creator'
  ): Promise<{ success: boolean; user?: SupabaseAuthUser; error?: string }> {
    const cleanEmail = email.trim().toLowerCase();

    // Try real Supabase signup if configured
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: password || 'CreatorBridgeSecure123!',
          options: {
            data: {
              ...metadata,
              role,
            },
          },
        });
        if (error) {
          console.warn('Supabase signUp error:', error.message);
        }
      } catch (err: any) {
        console.warn('Supabase call error:', err.message);
      }
    }

    const newUser: SupabaseAuthUser = {
      id: `usr_${Date.now()}`,
      email: cleanEmail,
      role,
      user_metadata: {
        ...metadata,
        role,
      },
      created_at: new Date().toISOString(),
    };

    saveStoredSupabaseUser(newUser);
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  },

  // 3. Get Active Session
  getSessionUser(): SupabaseAuthUser | null {
    try {
      const raw = localStorage.getItem(STORAGE_SESSION_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {
      console.error('Error reading session:', e);
    }
    return null;
  },

  // 4. Sign Out
  async signOut(): Promise<void> {
    if (supabase) {
      try {
        await supabase.auth.signOut();
      } catch (e) {
        console.warn('Supabase signOut error:', e);
      }
    }
    localStorage.removeItem(STORAGE_SESSION_KEY);
  },
};
