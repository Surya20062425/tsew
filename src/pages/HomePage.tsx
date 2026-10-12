import React, { useState } from 'react';
import { useShortlist } from '../context/ShortlistContext';
import { 
  Search, ArrowRight, Heart, Users, ShieldCheck, GitBranch, Clock, 
  Clapperboard, Sparkles, ShoppingBag, Box, Palette, Layers, Calendar, CheckCircle, FileText
} from 'lucide-react';
import { Avatar } from '../components/Avatar';

interface HomePageProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isShortlisted, toggleShortlist } = useShortlist();

  const trendingTags = [
    'Runway Gen-3',
    'Midjourney v6',
    'Photoreal VFX',
    'ComfyUI Workflows',
    'Sora Stylized',
    'Commercial Ready'
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('explore-creators');
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    navigate('explore-creators');
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Ambient Glow Field & Hero Section */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#DCE9FF]/40 via-[#F8F9FF] to-[#F8F9FF]">
        {/* Subtle Neural Mesh SVG Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply flex items-center justify-center">
          <svg className="w-full h-full text-[#6AA0FD]" fill="none" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="180" fill="currentColor" fillOpacity="0.12" filter="blur(90px)" r="280"></circle>
            <circle cx="950" cy="240" fill="currentColor" fillOpacity="0.15" filter="blur(110px)" r="320"></circle>
            <path d="M100 250 Q 400 120 700 280 T 1200 180" opacity="0.4" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1.2"></path>
            <path d="M50 480 Q 450 350 850 520 T 1300 390" opacity="0.3" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1.2"></path>
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-16 text-center flex flex-col items-center">
          
          {/* Enterprise Verification Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D3E4FE] text-[#001B3F] text-xs font-semibold shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-[#175CB5] animate-pulse"></span>
            <span className="uppercase tracking-wider">Tier-1 Curated AI Talent Roster</span>
            <span className="text-[#175CB5] font-bold">2025 Standard</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold text-[#000E23] tracking-tight leading-[1.12] max-w-4xl">
            Find the Right <span className="text-[#175CB5]">AI Creative</span> for Your Next Big Idea.
          </h1>

          {/* Supporting Copy */}
          <p className="text-base sm:text-lg text-[#44474D] max-w-2xl leading-relaxed mt-4">
            Discover AI filmmakers, animators and generative artists. Compare portfolios, explore creative workflows, and find the right talent for your project.
          </p>

          {/* Interactive Search Suite */}
          <div className="w-full max-w-3xl mt-6 bg-white rounded-2xl shadow-lg border border-[#E2E8F0] p-2.5 flex flex-col gap-2.5 text-left">
            <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 px-3.5 py-2 bg-[#EFF4FF] rounded-xl">
              <Search className="w-5 h-5 text-[#175CB5] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI creators, tools or styles (e.g., Runway Gen-3, Sora cinematic, LoRA)..."
                className="w-full bg-transparent text-sm sm:text-base text-[#0B1C30] placeholder:text-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#175CB5] text-white hover:bg-[#004590] px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-sm shrink-0 cursor-pointer"
              >
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Quick Trending Pill Filter Tags */}
            <div className="flex items-center gap-1.5 flex-wrap px-1 pt-1 pb-0.5">
              <span className="text-xs text-[#44474D] font-medium mr-1">Trending:</span>
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleTagClick(tag)}
                  className="px-2.5 py-1 rounded-full bg-[#E5EEFF] text-[#0B1C30] text-xs font-medium hover:bg-[#D7E2FF] hover:text-[#001B3F] transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Hero CTAs */}
          <div className="flex items-center justify-center gap-3 pt-6 flex-wrap">
            <button
              onClick={() => navigate('explore-creators')}
              className="bg-[#175CB5] text-white hover:bg-[#004590] px-6 py-3 rounded-xl text-sm font-semibold shadow-md transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Explore Creators</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => navigate('brief')}
              className="bg-white text-[#000E23] hover:bg-[#E5EEFF] border border-[#CBD5E1] px-6 py-3 rounded-xl text-sm font-semibold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#175CB5]" />
              <span>Post a Creative Brief</span>
            </button>
          </div>

        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="w-full bg-white border-y border-[#E2E8F0] py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0 text-[#175CB5]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#000E23] block tracking-tight">Curated</span>
                <span className="text-xs text-[#44474D] font-medium">AI Creators Roster</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0 text-[#175CB5]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#000E23] block tracking-tight">Declared</span>
                <span className="text-xs text-[#44474D] font-medium">Commercial-Use Terms</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0 text-[#175CB5]">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#000E23] block tracking-tight">Documented</span>
                <span className="text-xs text-[#44474D] font-medium">Model Workflows</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center shrink-0 text-[#175CB5]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-2xl font-bold text-[#000E23] block tracking-tight">Fast</span>
                <span className="text-xs text-[#44474D] font-medium">Simulated Matching</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-1.5 h-4 bg-[#175CB5] rounded-full"></span>
              <span className="text-xs text-[#175CB5] uppercase font-bold tracking-wider">Curated Disciplines</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#000E23] tracking-tight">
              Explore Popular AI Specializations
            </h2>
            <p className="text-sm text-[#44474D] mt-1">
              Specialized creators with tested human-in-the-loop workflows and model fine-tuning.
            </p>
          </div>

          <button
            onClick={() => navigate('categories')}
            className="text-xs font-semibold text-[#175CB5] hover:text-[#004590] flex items-center gap-1 shrink-0 transition-colors cursor-pointer"
          >
            <span>View all 14 categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <Clapperboard className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  142 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                AI Filmmaking
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                Cinematic generative video, temporal coherence, shot sequencing & pacing.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Sora</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Runway Gen-3</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Luma Dream Machine</span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  98 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                AI Animation & Anime
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                Dynamic anime interpolation, 2.5D illustration rigging, and loop physics.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Stable Video</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">AnimateDiff</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Live2D AI</span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <Palette className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  215 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                Generative Art & Key Visuals
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                Ultra-resolution creative hero assets, lookbooks, and high-concept imagery.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Midjourney v6</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">SDXL Custom</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">DALL-E 3</span>
            </div>
          </div>

          {/* Card 4 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  176 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                AI Product Advertising
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                E-commerce photoreal composite sets, brand-accurate geometry, product LoRAs.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">ComfyUI LoRA</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">ControlNet</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Firefly Gen Fill</span>
            </div>
          </div>

          {/* Card 5 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <Box className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  84 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                AI 3D & Motion Graphics
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                Neural radiance fields (NeRFs), Gaussian splat environments, generative meshes.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Gaussian Splat</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Blender AI</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Kaedim 3D</span>
            </div>
          </div>

          {/* Card 6 */}
          <div
            onClick={() => navigate('explore-creators')}
            className="group bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#EFF4FF] flex items-center justify-center text-[#175CB5] group-hover:bg-[#175CB5] group-hover:text-white transition-colors">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] font-semibold">
                  120 Creators
                </span>
              </div>
              <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors mb-1">
                AI Graphic & Brand Systems
              </h3>
              <p className="text-xs text-[#44474D] mb-4">
                Vector generation pipelines, font synthesis, dynamic identity asset engines.
              </p>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-slate-100">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Vectorizer AI</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">Illustrator AI</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">TypeSynthesis</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured AI Directors & Artists Spotlight */}
      <section className="w-full bg-[#EFF4FF] py-16 border-y border-[#DCE9FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-1.5 h-4 bg-[#175CB5] rounded-full"></span>
                <span className="text-xs text-[#175CB5] uppercase font-bold tracking-wider">Verified Spotlight</span>
              </div>
              <h2 className="text-3xl font-extrabold text-[#000E23] tracking-tight">
                Featured AI Directors & Artists
              </h2>
              <p className="text-sm text-[#44474D] mt-1">
                Pre-vetted portfolio deliverables with verified workflow telemetry and commercial contracts.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#44474D]">Showing 4 of 500+</span>
              <button
                onClick={() => navigate('matching-results')}
                className="bg-white text-[#000E23] hover:bg-slate-100 px-4 py-2 rounded-lg text-xs font-semibold shadow-xs border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Find Best Match</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 4 Creator Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Creator 1: Alex Morgan */}
            <div className="bg-white rounded-xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgveh8lHXHEjDQMLrO9PgiLlr4neuN4foOTD1sQZMekDqfol-gZVeWctrxYbi9Wqr3_-UZM3DArIjIMqyI5E3m8zGVnyN0n-CXmAPeM00gNPyKSQqQkEiVKUNS-ffkmQPqTmDFQub_BAuBF3djv03kEJt9PMfYaLiTY3mzxVJ9DKLfedO8S6TOtymdXwTmyw_SOUW8rrXn8aAFkVr3RBHl5pgDgmn7HLedoo5otIvERP3y07xnlWLRew"
                    alt="Cinematic still from Aura Fragrance luxury commercial"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleShortlist('alex-morgan', 'Alex Morgan')}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                      isShortlisted('alex-morgan') ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isShortlisted('alex-morgan') ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                    Project: Aura Fragrance
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold text-slate-900">Alex Morgan</h3>
                        <span className="text-[#175CB5] text-xs" title="Verified Creator">✓</span>
                      </div>
                      <p className="text-xs text-slate-500">Senior AI Filmmaker & VFX Director</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Available
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-[10px]">Runway Gen-3</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDFF] text-[#23005C] text-[10px]">Midjourney</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">DaVinci</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 bg-[#F8F9FF] rounded-lg px-2.5 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rate</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">From $1,200/min</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Delivery</span>
                      <span className="text-xs font-bold text-slate-900">4-day turnaround</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate('creator-profile', 'alex-morgan')}
                  className="w-full bg-[#175CB5] text-white hover:bg-[#004590] py-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Creator 2: Elena Rostova */}
            <div className="bg-white rounded-xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDs314SYC12TmLrVvUxJl7RQdq6se1sAOrNRuLA1g21jrbqD25xfRib-Xek6XUSyK7atF8DSUB4_6UlBhy_BacoD-LMXBRLL07eKsYmYjHQ92iqZcUYN3F_9xQ_IPaLpSGIgYhQaMGXJQj9paRzoe-sZvcb3jKGavfYIVl6BSEL1_0WFhe9gluwXVWFJUwQRaLF0rwT46sXHnbjL1kQaLOaqPmLkulMletdnA77eqcCZd49thtt-LsPAw"
                    alt="High energy athletic footwear product render"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleShortlist('elena-rostova', 'Elena Rostova')}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                      isShortlisted('elena-rostova') ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isShortlisted('elena-rostova') ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                    Project: Apex Velocity
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold text-slate-900">Elena Rostova</h3>
                        <span className="text-[#175CB5] text-xs">✓</span>
                      </div>
                      <p className="text-xs text-slate-500">AI Commercial & Motion Artist</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      In 2 days
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-[10px]">ComfyUI</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDFF] text-[#23005C] text-[10px]">ControlNet</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">Cinema4D</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 bg-[#F8F9FF] rounded-lg px-2.5 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rate</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">From $850</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Delivery</span>
                      <span className="text-xs font-bold text-slate-900">3-day turnaround</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate('creator-profile', 'elena-rostova')}
                  className="w-full bg-[#175CB5] text-white hover:bg-[#004590] py-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Creator 3: Marcus Chen */}
            <div className="bg-white rounded-xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrkX0prA1LRgwB1pGR8YWC5wEqiVBhjBO5zZLe3-mw6aNPYPRMWbZKSeMAm7qUvGMSDgMmyolmkUmUGfQZFVtSFTSY2PQVSLFH0GZSO63CePIASLkQMh5hTgCeVNGPghK6jsqvkzMcVDof-Ab7EMndHmEVFjy_5bhg9mscMLK2uzvCBWMzyfz_Gjwo8iErIN71KD08b7h6DL1nbEUeVWGNcghmmXOdbJZ5IdsdwkUMj7HEaX_xXoDhKw"
                    alt="Futuristic cyber-metropolis architectural walkthrough"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleShortlist('marcus-chen', 'Marcus Chen')}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                      isShortlisted('marcus-chen') ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isShortlisted('marcus-chen') ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                    Project: Neo-Kyoto Splat
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold text-slate-900">Marcus Chen</h3>
                        <span className="text-[#175CB5] text-xs">✓</span>
                      </div>
                      <p className="text-xs text-slate-500">Generative 3D & Worldbuilder</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Available
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-[10px]">3D Splatting</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDFF] text-[#23005C] text-[10px]">Unreal Engine 5</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">Kaedim</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 bg-[#F8F9FF] rounded-lg px-2.5 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rate</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">From $1,500</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Delivery</span>
                      <span className="text-xs font-bold text-slate-900">5-day turnaround</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate('creator-profile', 'marcus-chen')}
                  className="w-full bg-[#175CB5] text-white hover:bg-[#004590] py-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Creator 4: Maya Lin */}
            <div className="bg-white rounded-xl shadow-xs hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden border border-[#E2E8F0] flex flex-col justify-between">
              <div>
                <div className="relative w-full aspect-video overflow-hidden bg-slate-900">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7soq78N0D5G74Zlt8kT7YLHk7nSvDHHwSV_ZfkYiLN1QyDDlLvlBZGmvPSke69UqMfvmnccJLE0u1v9u9xyTbln42zq5TE8sPZpyPR-vEGzd7dnFAAK2mJ0k6ktWaZUOTvLc3EhJ6OAP1t7bfEzaGTvFT-HdCt_T3nTPS-m1sa-ah2YAUYShhjJgtKu2joen68r0spXzUyb648senh_4vP9FFerVCumh1YqfhQRU0ou0h42TZ91NBjQ"
                    alt="Haute couture editorial fashion portrait"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleShortlist('maya-lin', 'Maya Lin')}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center transition-colors shadow-xs cursor-pointer ${
                      isShortlisted('maya-lin') ? 'text-red-500' : 'text-slate-600 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isShortlisted('maya-lin') ? 'fill-current' : ''}`} />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-white text-[10px] font-semibold">
                    Project: Vogue Futurism
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold text-slate-900">Maya Lin</h3>
                        <span className="text-[#175CB5] text-xs">✓</span>
                      </div>
                      <p className="text-xs text-slate-500">Surreal Fashion & Editorial Artist</p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      Available
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-wrap mb-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#D7E2FF] text-[#001B3F] text-[10px]">Midjourney v6</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#E9DDFF] text-[#23005C] text-[10px]">Topaz Gigapixel</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px]">Photoshop</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 py-2 bg-[#F8F9FF] rounded-lg px-2.5 border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rate</span>
                      <span className="text-xs font-bold text-slate-900 font-mono">From $600</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Delivery</span>
                      <span className="text-xs font-bold text-slate-900">2-day turnaround</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => navigate('creator-profile', 'maya-lin')}
                  className="w-full bg-[#175CB5] text-white hover:bg-[#004590] py-2 rounded-lg text-xs font-semibold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works for Enterprise Teams */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EEFF] mb-2 text-[#175CB5]">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-xs font-bold">Collaborative Workflow Standard</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#000E23] tracking-tight">
            How CreatorBridge Works for Creative Teams
          </h2>
          <p className="text-sm text-[#44474D] mt-2">
            A structured 4-step framework bridging rapid generative exploration with transparent creator workflows, milestone reviews, and digital delivery.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#000E23] text-white font-bold text-xs flex items-center justify-center">
                  01
                </span>
                <Search className="w-5 h-5 text-[#175CB5]" />
              </div>
              <h3 className="text-base font-bold text-[#000E23] mb-2">
                Discover AI Creators
              </h3>
              <p className="text-xs text-[#44474D] leading-relaxed">
                Browse creator profiles with documented model pipelines, preferred toolchains, and transparent production rates.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#175CB5] font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Sample Profile & Tools
              </span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#000E23] text-white font-bold text-xs flex items-center justify-center">
                  02
                </span>
                <GitBranch className="w-5 h-5 text-[#175CB5]" />
              </div>
              <h3 className="text-base font-bold text-[#000E23] mb-2">
                Explore Workflows
              </h3>
              <p className="text-xs text-[#44474D] leading-relaxed">
                Review human-in-the-loop editing, prompt architecture, ControlNet conditioning, and post-production color grading.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#175CB5] font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Workflow Documentation
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#000E23] text-white font-bold text-xs flex items-center justify-center">
                  03
                </span>
                <FileText className="w-5 h-5 text-[#175CB5]" />
              </div>
              <h3 className="text-base font-bold text-[#000E23] mb-2">
                Create Your Project Brief
              </h3>
              <p className="text-xs text-[#44474D] leading-relaxed">
                Specify resolution, aspect ratios, model preferences, commercial-use scope, and budget targets with our guided scoper.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#175CB5] font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Commercial Guidelines
              </span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-[#000E23] text-white font-bold text-xs flex items-center justify-center">
                  04
                </span>
                <ShieldCheck className="w-5 h-5 text-[#175CB5]" />
              </div>
              <h3 className="text-base font-bold text-[#000E23] mb-2">
                Match and Collaborate
              </h3>
              <p className="text-xs text-[#44474D] leading-relaxed">
                Review simulated AI matches, track staged milestone reviews, and collaborate in interactive asset workspaces.
              </p>
            </div>
            <div className="mt-4 pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1 text-[11px] text-[#175CB5] font-bold">
                <CheckCircle className="w-3.5 h-3.5" /> Milestone Demo Tracking
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* Final Call-to-Action for Brands */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="relative overflow-hidden rounded-2xl bg-[#000E23] text-white p-8 sm:p-12 shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#14243A] text-[#D4E3FF] text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#6AA0FD]" />
              <span className="uppercase tracking-wider">Transform Creative Pipeline</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to scale your next campaign with generative AI talent?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 mt-2 mb-6 max-w-xl leading-relaxed">
              Discover vetted AI directors and digital artists. Prototype projects faster with transparent pipelines and creator-provided commercial terms.
            </p>

            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => navigate('brief')}
                className="bg-[#175CB5] text-white hover:bg-[#004590] px-6 py-3 rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Post a Creative Brief</span>
              </button>

              <button
                onClick={() => navigate('for-brands')}
                className="bg-white text-slate-900 hover:bg-slate-100 px-6 py-3 rounded-lg text-xs font-bold shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#175CB5]" />
                <span>Explore Platform Guidelines</span>
              </button>
            </div>

            <div className="flex items-center gap-6 mt-6 flex-wrap text-slate-400 text-xs">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#6AA0FD]" /> Prototype demonstration
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#6AA0FD]" /> Creator-declared toolchains
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-[#6AA0FD]" /> Milestone review workflow
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
