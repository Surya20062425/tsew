import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, BrandDetails, CreatorVerificationData } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { supabaseAuthService, isSupabaseConfigured } from '../lib/supabase';

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

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  role: UserRole;
  login: (email: string, password?: string, specificRole?: UserRole) => Promise<boolean> | boolean;
  loginWithEmailOnly: (email: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  register: (payloadOrName: string | RegisterPayload, email?: string, password?: string, role?: UserRole, company?: string, extra?: any) => Promise<boolean> | boolean;
  switchRole: (newRole: UserRole) => void;
  isSupabaseActive: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check Supabase session or localStorage. Start as null so user goes to Login first!
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const sessionUser = supabaseAuthService.getSessionUser();
      if (sessionUser) {
        return {
          id: sessionUser.id,
          name: sessionUser.user_metadata?.name || sessionUser.email.split('@')[0],
          email: sessionUser.email,
          role: sessionUser.role,
          title: sessionUser.user_metadata?.title || (sessionUser.role === 'brand' ? 'Brand Creative Director' : 'AI Generative Filmmaker'),
          company: sessionUser.user_metadata?.company || (sessionUser.role === 'brand' ? 'Enterprise Client' : 'Independent AI Studio'),
          avatar: sessionUser.role === 'creator' ? DEMO_USERS.creator.avatar : sessionUser.role === 'admin' ? DEMO_USERS.admin.avatar : DEMO_USERS.brand.avatar,
          badge: sessionUser.user_metadata?.verifiedTier || (sessionUser.role === 'brand' ? 'Verified Enterprise Client' : 'Tier 1 Verified Creator'),
          brandDetails: sessionUser.user_metadata?.brandDetails,
          creatorVerification: sessionUser.user_metadata?.creatorVerification,
        };
      }
      const saved = localStorage.getItem('creatorbridge_user');
      if (saved) return JSON.parse(saved);
      return null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('creatorbridge_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('creatorbridge_user');
    }
  }, [currentUser]);

  // Email-only authentication using Supabase for accounts that already exist
  const loginWithEmailOnly = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const res = await supabaseAuthService.signInWithEmailOnly(email);
      if (res.success && res.user) {
        const u = res.user;
        const role = u.role;
        const activeUser: User = {
          id: u.id,
          name: u.user_metadata?.name || u.email.split('@')[0].replace(/[._]/g, ' '),
          email: u.email,
          role,
          title: u.user_metadata?.title || (role === 'brand' ? 'Brand Creative Director' : 'AI Generative Filmmaker'),
          company: u.user_metadata?.company || (role === 'brand' ? 'Enterprise Client' : 'Independent AI Studio'),
          avatar: role === 'creator' ? DEMO_USERS.creator.avatar : role === 'admin' ? DEMO_USERS.admin.avatar : DEMO_USERS.brand.avatar,
          badge: u.user_metadata?.verifiedTier || (role === 'brand' ? 'Verified Enterprise Client' : 'Tier 1 Verified Creator'),
          brandDetails: u.user_metadata?.brandDetails,
          creatorVerification: u.user_metadata?.creatorVerification,
        };
        setCurrentUser(activeUser);
        return { success: true };
      }
      return { success: false, error: res.error || 'Could not verify email' };
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  };

  const login = (email: string, _password?: string, specificRole?: UserRole): boolean => {
    const roleKey = specificRole || (email.includes('alex') ? 'creator' : email.includes('admin') || email.includes('sarah') ? 'admin' : 'brand');
    const demo = DEMO_USERS[roleKey];
    if (demo) {
      const activeUser = { ...demo, email };
      setCurrentUser(activeUser);
      supabaseAuthService.signInWithEmailOnly(email);
      return true;
    }
    // Fallback standard email sign-in
    loginWithEmailOnly(email);
    return true;
  };

  const logout = () => {
    supabaseAuthService.signOut();
    setCurrentUser(null);
  };

  const register = (
    payloadOrName: string | RegisterPayload,
    email?: string,
    password?: string,
    roleArg?: UserRole,
    companyArg?: string
  ): boolean => {
    let name = '';
    let userEmail = '';
    let role: UserRole = 'brand';
    let company: string | undefined;
    let title: string | undefined;
    let brandDetails: BrandDetails | undefined;
    let creatorVerification: CreatorVerificationData | undefined;

    if (typeof payloadOrName === 'object') {
      name = payloadOrName.name;
      userEmail = payloadOrName.email;
      role = payloadOrName.role;
      company = payloadOrName.company;
      title = payloadOrName.title;
      brandDetails = payloadOrName.brandDetails;
      creatorVerification = payloadOrName.creatorVerification;
    } else {
      name = payloadOrName;
      userEmail = email || '';
      role = roleArg || 'brand';
      company = companyArg;
    }

    const defaultTitle = role === 'brand' 
      ? 'Brand Creative Director' 
      : role === 'creator' 
        ? 'AI Generative Filmmaker' 
        : 'Compliance Officer';

    const defaultBadge = role === 'brand'
      ? (brandDetails?.companySize ? `${brandDetails.companySize} Enterprise Brand` : 'Verified Enterprise Client')
      : role === 'creator'
        ? (creatorVerification?.verifiedTier || 'Tier 1 Verified Creator')
        : 'System Auditor';

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name,
      email: userEmail,
      role,
      title: title || defaultTitle,
      company: company || (role === 'brand' ? 'Enterprise Client' : 'Independent AI Studio'),
      avatar: role === 'creator' ? DEMO_USERS.creator.avatar : role === 'admin' ? DEMO_USERS.admin.avatar : DEMO_USERS.brand.avatar,
      badge: defaultBadge,
      brandDetails,
      creatorVerification,
    };

    // Store in Supabase Auth
    supabaseAuthService.signUpWithForm(
      userEmail,
      password || 'Password123!',
      {
        name,
        company,
        title,
        brandDetails,
        creatorVerification,
        verifiedTier: creatorVerification?.verifiedTier,
      },
      role === 'creator' ? 'creator' : 'brand'
    );

    setCurrentUser(newUser);
    return true;
  };

  const switchRole = (newRole: UserRole) => {
    if (DEMO_USERS[newRole]) {
      setCurrentUser(DEMO_USERS[newRole]);
    }
  };

  const role: UserRole = currentUser?.role || 'brand';

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      role,
      login,
      loginWithEmailOnly,
      logout,
      register,
      switchRole,
      isSupabaseActive: isSupabaseConfigured,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
