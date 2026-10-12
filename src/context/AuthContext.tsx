import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, BrandDetails, CreatorVerificationData } from '../types';
import { DEMO_USERS } from '../data/mockData';
import * as auth from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export interface RegisterPayload {
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  company?: string;
  title?: string;
  brandDetails?: BrandDetails;
  creatorVerification?: CreatorVerificationData;
}

export interface AuthOutcome {
  success: boolean;
  error?: string;
  needsEmailConfirm?: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password: string) => Promise<AuthOutcome>;
  sendMagicLink: (email: string) => Promise<AuthOutcome>;
  register: (payload: RegisterPayload) => Promise<AuthOutcome>;
  resendConfirmation: (email: string) => Promise<AuthOutcome>;
  logout: () => Promise<void>;
  isSupabaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Map a Supabase session onto the app's User shape. Identity comes only from the token. */
function userFromSession(session: Session): User {
  const m = session.user.user_metadata || {};
  const role: UserRole = m.role === 'creator' || m.role === 'admin' ? m.role : 'brand';
  const fallbackName = session.user.email?.split('@')[0].replace(/[._]/g, ' ') || 'User';
  return {
    id: session.user.id,
    name: m.name || fallbackName,
    email: session.user.email || '',
    role,
    title:
      m.title || (role === 'brand' ? 'Brand Creative Director' : role === 'creator' ? 'AI Generative Filmmaker' : 'Compliance Officer'),
    company: m.company || (role === 'brand' ? 'Enterprise Client' : 'Independent AI Studio'),
    avatar: role === 'creator' ? DEMO_USERS.creator.avatar : role === 'admin' ? DEMO_USERS.admin.avatar : DEMO_USERS.brand.avatar,
    badge: m.verifiedTier || (role === 'brand' ? 'Verified Enterprise Client' : 'Tier 1 Verified Creator'),
    brandDetails: m.brandDetails,
    creatorVerification: m.creatorVerification,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);

  // The Supabase client is the single source of truth for who is signed in.
  useEffect(() => {
    let active = true;

    auth.getSession().then((session) => {
      if (!active) return;
      setCurrentUser(session ? userFromSession(session) : null);
      setBooting(false);
    });

    const { data } = auth.onAuthStateChange((session) => {
      if (!active) return;
      setCurrentUser(session ? userFromSession(session) : null);
      setBooting(false);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const login = (email: string, password: string) => auth.signIn(email, password);

  const sendMagicLink = (email: string) => auth.sendMagicLink(email);

  const register = async (payload: RegisterPayload): Promise<AuthOutcome> => {
    const { name, email, password, role, company, title, brandDetails, creatorVerification } = payload;
    const passwordToUse = password || '';
    if (passwordToUse.length < 8) {
      return { success: false, error: 'Password must be at least 8 characters.' };
    }
    return auth.signUp(
      email,
      passwordToUse,
      { name, company, title, brandDetails, creatorVerification, verifiedTier: creatorVerification?.verifiedTier },
      role === 'creator' ? 'creator' : 'brand'
    );
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  const role: UserRole = currentUser?.role || 'brand';

  if (booting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FF] text-slate-500 text-sm">
        Restoring session…
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        role,
        login,
        sendMagicLink,
        register,
        resendConfirmation: auth.resendConfirmation,
        logout,
        isSupabaseActive: auth.isSupabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
