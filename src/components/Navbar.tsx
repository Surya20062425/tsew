import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShortlist } from '../context/ShortlistContext';
import { UserRole } from '../types';
import { Bookmark, Plus, Menu, X, Shield, Sparkles, LogOut, Check, ArrowRight } from 'lucide-react';
import { Avatar } from './Avatar';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string, creatorId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { currentUser, isAuthenticated, role, logout, switchRole } = useAuth();
  const { count, setIsShortlistOpen } = useShortlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = role === 'creator' ? [
    { id: 'brand-briefs', label: 'Brand Briefs' },
    { id: 'brands-directory', label: 'Enterprise Brands' },
    { id: 'workspace', label: 'Production Workspace' },
    { id: 'creator-profile', label: 'My Verified Profile' },
    { id: 'how-it-works', label: 'Escrow Guarantees' },
  ] : [
    { id: 'explore-creators', label: 'Explore Creators' },
    { id: 'categories', label: 'Categories' },
    { id: 'matching-results', label: 'Candidate Matches' },
    { id: 'workspace', label: 'Project Workspace' },
    { id: 'how-it-works', label: 'How Escrow Works' },
    { id: 'for-brands', label: 'For Brands' },
  ];

  const handleRoleSelect = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
  };

  const getRoleBadgeStyle = (userRole: UserRole) => {
    switch (userRole) {
      case 'brand':
        return 'bg-[#14243A] text-white border-slate-700';
      case 'creator':
        return 'bg-[#E9DDFF] text-[#23005C] border-[#D0BCFF]';
      case 'admin':
        return 'bg-[#ECFDF5] text-[#065F46] border-[#A7F3D0]';
    }
  };

  const getRoleLabel = (userRole: UserRole) => {
    switch (userRole) {
      case 'brand': return 'Enterprise Brand';
      case 'creator': return 'AI Creator';
      case 'admin': return 'System Admin';
    }
  };

  return (
    <>
      {/* Main Sticky Header */}
      <header className="sticky top-0 w-full z-40 bg-[#F8F9FF]/90 backdrop-blur-xl border-b border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => navigate('home')}
              className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-[#000E23] flex items-center justify-center text-white font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                <span className="text-[#6AA0FD]">CB</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#000E23]">
                CreatorBridge<span className="text-[#175CB5]">.AI</span>
              </span>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentPath === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => navigate(link.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-[#D7E2FF] text-[#001B3F] font-semibold'
                      : 'text-[#44474D] hover:text-[#0B1C30] hover:bg-[#E5EEFF]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            
            {/* Shortlist Bookmark Toggle */}
            <button
              onClick={() => setIsShortlistOpen(true)}
              aria-label="View shortlist"
              className="relative p-2 rounded-lg text-[#44474D] hover:text-[#0B1C30] hover:bg-[#E5EEFF] transition-colors cursor-pointer"
              title="View Shortlisted Creators"
            >
              <Bookmark className="w-5 h-5" />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-[#175CB5] text-white text-[10px] font-bold leading-none animate-scale-in">
                  {count}
                </span>
              )}
            </button>

            {/* Role Switcher Pill */}
            {isAuthenticated && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer shadow-sm ${getRoleBadgeStyle(role)}`}
                  title="Switch Role Preview"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>{getRoleLabel(role)}</span>
                  <span className="text-[10px] opacity-70">▾</span>
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        Role-Based Access Control
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Switch persona to test permissions:
                      </p>
                    </div>

                    <button
                      onClick={() => handleRoleSelect('brand')}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${role === 'brand' ? 'font-bold text-[#175CB5]' : 'text-slate-700'}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">Brand Client (Demo)</span>
                        <span className="text-[11px] text-slate-400">Post briefs & sample approvals</span>
                      </div>
                      {role === 'brand' && <Check className="w-4 h-4 text-[#175CB5]" />}
                    </button>

                    <button
                      onClick={() => handleRoleSelect('creator')}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${role === 'creator' ? 'font-bold text-[#175CB5]' : 'text-slate-700'}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">AI Creator (Demo)</span>
                        <span className="text-[11px] text-slate-400">Sample deliverables & rates</span>
                      </div>
                      {role === 'creator' && <Check className="w-4 h-4 text-[#175CB5]" />}
                    </button>

                    <button
                      onClick={() => handleRoleSelect('admin')}
                      className={`w-full px-3 py-2 text-left flex items-center justify-between text-xs hover:bg-slate-50 transition-colors ${role === 'admin' ? 'font-bold text-[#175CB5]' : 'text-slate-700'}`}
                    >
                      <div className="flex flex-col">
                        <span className="font-semibold">Platform Reviewer (Demo)</span>
                        <span className="text-[11px] text-slate-400">Sample workflow reviews</span>
                      </div>
                      {role === 'admin' && <Check className="w-4 h-4 text-[#175CB5]" />}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Log in / Register or User Avatar */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-9 h-9 rounded-full ring-2 ring-slate-200 overflow-hidden bg-slate-900 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                  title={currentUser?.name}
                >
                  <Avatar
                    src={currentUser?.avatar}
                    name={currentUser?.name || 'User'}
                    alt={currentUser?.name || 'User profile'}
                    sizeClass="w-9 h-9"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-in">
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900 truncate">{currentUser?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-semibold text-[#175CB5] bg-[#D7E2FF] px-2 py-0.5 rounded-full">
                        {currentUser?.title}
                      </span>
                    </div>

                    <button
                      onClick={() => { setProfileDropdownOpen(false); navigate('workspace'); }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>Active Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                    </button>

                    <button
                      onClick={() => { setProfileDropdownOpen(false); logout(); }}
                      className="w-full px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100 mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => navigate('login')}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate('register')}
                  className="hidden sm:inline-block px-3 py-1.5 text-sm font-medium text-slate-900 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}

            {/* Role-Specific Action CTA */}
            {role === 'creator' ? (
              <button
                onClick={() => navigate('brand-briefs')}
                className="bg-[#6D28D9] hover:bg-[#5b21b6] text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span className="hidden sm:inline">Browse Brand Briefs</span>
                <span className="sm:hidden">Briefs</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('brief')}
                className="bg-[#175CB5] hover:bg-[#004590] text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Post a Brief</span>
                <span className="sm:hidden">Brief</span>
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 shadow-lg animate-fade-in">
            <div className="flex flex-col gap-1.5 mb-4">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Navigation
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium transition-colors ${
                    currentPath === link.id
                      ? 'bg-[#D7E2FF] text-[#001B3F] font-bold'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Role switch in mobile */}
            {isAuthenticated && (
              <div className="border-t border-slate-100 pt-3 mb-4">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-2">
                  Active Role: {getRoleLabel(role)}
                </span>
                <div className="grid grid-cols-3 gap-1.5 px-1">
                  <button
                    onClick={() => handleRoleSelect('brand')}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center ${role === 'brand' ? 'bg-[#14243A] text-white border-transparent' : 'bg-slate-50 text-slate-700'}`}
                  >
                    Brand
                  </button>
                  <button
                    onClick={() => handleRoleSelect('creator')}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center ${role === 'creator' ? 'bg-[#2C0070] text-white border-transparent' : 'bg-slate-50 text-slate-700'}`}
                  >
                    Creator
                  </button>
                  <button
                    onClick={() => handleRoleSelect('admin')}
                    className={`py-1.5 text-xs font-semibold rounded-md border text-center ${role === 'admin' ? 'bg-[#065F46] text-white border-transparent' : 'bg-slate-50 text-slate-700'}`}
                  >
                    Admin
                  </button>
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {isAuthenticated ? (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="text-xs text-red-600 font-semibold px-2 py-1 flex items-center gap-1"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              ) : (
                <div className="flex items-center gap-2 w-full">
                  <button
                    onClick={() => { navigate('login'); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 text-center text-xs font-semibold bg-slate-100 rounded-lg"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => { navigate('register'); setMobileMenuOpen(false); }}
                    className="flex-1 py-2 text-center text-xs font-semibold bg-[#175CB5] text-white rounded-lg"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
