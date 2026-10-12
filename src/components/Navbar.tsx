import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useShortlist } from '../context/ShortlistContext';
import { Bookmark, Plus, Menu, X, Sparkles, LogOut, ArrowRight } from 'lucide-react';
import { Avatar } from './Avatar';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string, creatorId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { currentUser, isAuthenticated, role, logout } = useAuth();
  const { count, setIsShortlistOpen } = useShortlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
