import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShortlist } from '../context/ShortlistContext';
import { UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { 
  ShieldCheck, Lock, Mail, Eye, EyeOff, ArrowRight, 
  Sparkles, CheckCircle2, AlertCircle, Building2, Palette, Shield,
  Award, FileCode, Check, HelpCircle, KeyRound, Zap, Send
} from 'lucide-react';

interface LoginPageProps {
  navigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login, loginWithEmailOnly, isAuthenticated, currentUser, logout, isSupabaseActive } = useAuth();
  const { showToast } = useShortlist();

  // Active portal tab: 'brand' vs 'creator'
  const [selectedRole, setSelectedRole] = useState<'brand' | 'creator' | 'admin'>('brand');

  // Auth method: 'email-only' (Supabase primary) vs 'password'
  const [authMethod, setAuthMethod] = useState<'email-only' | 'password'>('email-only');

  const [email, setEmail] = useState('david.vance@auramotors.com');
  const [password, setPassword] = useState('••••••••••••');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (role: 'brand' | 'creator' | 'admin') => {
    setSelectedRole(role);
    setError(null);
    setOtpSent(false);
    if (role === 'brand') {
      setEmail('david.vance@auramotors.com');
    } else if (role === 'creator') {
      setEmail('alex.morgan@runwaycinema.com');
    } else {
      setEmail('sarah.jenkins@creatorbridge.ai');
    }
  };

  // 1. Supabase Email-Only Authentication for existing accounts
  const handleEmailOnlyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginWithEmailOnly(cleanEmail);
      setLoading(false);

      if (res.success) {
        showToast(`Authenticated via Supabase Auth as ${cleanEmail}!`, 'success');
        if (selectedRole === 'brand' || cleanEmail.includes('brand') || cleanEmail.includes('david')) {
          navigate('home');
        } else if (selectedRole === 'creator' || cleanEmail.includes('creator') || cleanEmail.includes('alex')) {
          navigate('creator-profile');
        } else {
          navigate('home');
        }
      } else {
        setError(res.error || 'Authentication failed. Please verify your email or register a new account.');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Login failed. Please try again.');
    }
  };

  // 2. Standard Email + Password Login
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email) {
      setError('Please provide a valid work email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = login(email, password, selectedRole);
      setLoading(false);
      if (success) {
        showToast(`Welcome back to CreatorBridge!`, 'success');
        if (selectedRole === 'brand') {
          navigate('home');
        } else if (selectedRole === 'creator') {
          navigate('creator-profile');
        } else {
          navigate('home');
        }
      } else {
        setError('Invalid credentials. Please verify your email or use email-only auth.');
      }
    }, 400);
  };

  // 1-Click Fast Persona Login
  const handleQuickLogin = (roleKey: UserRole) => {
    const demo = DEMO_USERS[roleKey];
    if (demo) {
      setEmail(demo.email);
      setSelectedRole(roleKey as any);
      login(demo.email, 'password123', roleKey);
      showToast(`Signed in via Supabase as ${demo.name} (${demo.title})`, 'success');
      if (roleKey === 'creator') {
        navigate('creator-profile');
      } else {
        navigate('home');
      }
    }
  };

  return (
    <div className="min-h-[85vh] bg-[#F8F9FF] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-xl">
        
        {/* Brand Header */}
        <div className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-[#000E23] flex items-center justify-center text-white font-bold text-lg shadow-md mb-3">
            <span className="text-[#6AA0FD]">CB</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#001B3F]">
            Sign in to CreatorBridge<span className="text-[#175CB5]">.AI</span>
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-slate-500">
            Enterprise Generative AI Talent Marketplace & Dual-Sign Escrow
          </p>

          {/* Supabase status badge */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Supabase Email Authentication Active</span>
          </div>
        </div>

        {/* Currently Logged In Notice */}
        {isAuthenticated && currentUser && (
          <div className="mt-4 mx-4 sm:mx-0 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Signed in as <strong>{currentUser.name}</strong> ({currentUser.title})</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('home')}
                className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-xs hover:bg-emerald-700 cursor-pointer"
              >
                Enter Marketplace →
              </button>
              <button
                onClick={() => {
                  logout();
                  showToast('Signed out successfully', 'info');
                }}
                className="text-emerald-700 underline font-semibold hover:text-emerald-900 cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        )}

      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-2xl border border-slate-200">
          
          {/* DUAL PORTAL SWITCHER TABS */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
              Select Your Access Portal:
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Brand Portal Tab */}
              <button
                type="button"
                onClick={() => handleRoleChange('brand')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'brand'
                    ? 'border-[#175CB5] bg-[#F0F4FF] ring-2 ring-[#175CB5]/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Building2 className={`w-5 h-5 ${selectedRole === 'brand' ? 'text-[#175CB5]' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold text-slate-900">Brand / Agency</span>
                  </div>
                  {selectedRole === 'brand' && (
                    <span className="w-2 h-2 rounded-full bg-[#175CB5]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Post project briefs, hire creators & manage milestone escrow
                </p>
              </button>

              {/* Creator Portal Tab */}
              <button
                type="button"
                onClick={() => handleRoleChange('creator')}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedRole === 'creator'
                    ? 'border-[#6D28D9] bg-[#FAF5FF] ring-2 ring-[#6D28D9]/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <Palette className={`w-5 h-5 ${selectedRole === 'creator' ? 'text-[#6D28D9]' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold text-slate-900">AI Creator</span>
                  </div>
                  {selectedRole === 'creator' && (
                    <span className="w-2 h-2 rounded-full bg-[#6D28D9]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  Deliver milestone assets, upload depth passes & receive disbursements
                </p>
              </button>
            </div>
          </div>

          {/* AUTH METHOD SELECTOR (Email-Only vs Password) */}
          <div className="mb-5 flex items-center justify-between p-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 pl-2">Authentication Method:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setAuthMethod('email-only')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  authMethod === 'email-only'
                    ? 'bg-white text-[#175CB5] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                ✉ Email-Only Auth (Supabase)
              </button>
              <button
                type="button"
                onClick={() => setAuthMethod('password')}
                className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all cursor-pointer ${
                  authMethod === 'password'
                    ? 'bg-white text-[#175CB5] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔒 Email + Password
              </button>
            </div>
          </div>

          {/* 1-CLICK DEMO SHORTCUT BUTTON */}
          <div className="mb-5 p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="font-semibold text-slate-700">
                {selectedRole === 'brand' ? 'Fast Demo Client:' : 'Fast Demo Creator:'}
              </span>
              <span className="text-slate-500">
                {selectedRole === 'brand' ? 'David Vance (Aura Motors)' : 'Alex Morgan (Runway Cinema)'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleQuickLogin(selectedRole)}
              className="px-3 py-1 text-xs font-bold rounded-lg bg-[#000E23] hover:bg-[#14243A] text-white transition-colors cursor-pointer"
            >
              One-Click Sign In
            </button>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* ============================================================== */}
          {/* METHOD 1: EMAIL-ONLY AUTH (PRIMARY SUPABASE FLOW)              */}
          {/* ============================================================== */}
          {authMethod === 'email-only' ? (
            <form className="space-y-4" onSubmit={handleEmailOnlyLogin}>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
                  {selectedRole === 'brand' ? 'Brand Corporate Email' : 'Creator Studio Email'}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'brand' ? 'name@brand.com' : 'artist@studio.com'}
                    className="block w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5] focus:border-transparent"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Already registered? Simply provide your email to authenticate directly through Supabase Auth.
                </p>
              </div>

              {/* Submit Email Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                  selectedRole === 'brand'
                    ? 'bg-[#175CB5] hover:bg-[#124b96]'
                    : 'bg-[#6D28D9] hover:bg-[#5b21b6]'
                }`}
              >
                <span>{loading ? 'Authenticating via Supabase...' : `Sign In with Supabase Email Auth`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* ============================================================== */
            /* METHOD 2: EMAIL + PASSWORD LOGIN                               */
            /* ============================================================== */
            <form className="space-y-4" onSubmit={handlePasswordSubmit}>
              <div>
                <label htmlFor="email-pw" className="block text-xs font-semibold text-slate-700 mb-1">
                  {selectedRole === 'brand' ? 'Corporate Work Email' : 'Creator Studio Email'}
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email-pw"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'brand' ? 'name@brand.com' : 'artist@studio.com'}
                    className="block w-full pl-9 pr-3 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5] focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthMethod('email-only')}
                    className="text-xs text-[#175CB5] hover:underline cursor-pointer"
                  >
                    Switch to Email-Only Auth
                  </button>
                </div>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 pr-10 py-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#175CB5] focus:border-transparent font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Password Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 ${
                  selectedRole === 'brand'
                    ? 'bg-[#175CB5] hover:bg-[#124b96]'
                    : 'bg-[#6D28D9] hover:bg-[#5b21b6]'
                }`}
              >
                <span>{loading ? 'Authenticating credentials...' : `Sign In to ${selectedRole === 'brand' ? 'Brand' : 'Creator'} Portal`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Registration Redirect Cards */}
          <div className="mt-6 pt-6 border-t border-slate-100">
            {selectedRole === 'brand' ? (
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-slate-900">New Brand Client?</p>
                  <p className="text-slate-500 text-[11px]">Fill brand details, scope briefs & escrow budgets</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('register')}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#175CB5] hover:bg-[#124b96] text-white font-semibold transition-colors cursor-pointer"
                >
                  Complete Brand Form & Register
                </button>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <p className="font-bold text-purple-950">New AI Creator? Verification Required</p>
                  <p className="text-slate-600 text-[11px]">Verify portfolio with AI before creating account</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('register')}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5b21b6] text-white font-semibold transition-colors cursor-pointer"
                >
                  AI Verification & Registration
                </button>
              </div>
            )}
          </div>

          {/* Security certifications footer badge */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Supabase Auth • Dual-Signature Escrow • $250k IP Indemnity</span>
          </div>

        </div>
      </div>
    </div>
  );
};
