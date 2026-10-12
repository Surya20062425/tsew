import React, { useState, useMemo } from 'react';
import { CREATORS } from '../data/mockData';
import { useShortlist } from '../context/ShortlistContext';
import { Avatar } from '../components/Avatar';
import { 
  Search, SlidersHorizontal, LayoutGrid, List, Heart, ArrowRight, 
  Bookmark, Check, Star, Clock, Shield, Sparkles, X, RotateCcw, AlertCircle
} from 'lucide-react';

interface ExploreCreatorsPageProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const ExploreCreatorsPage: React.FC<ExploreCreatorsPageProps> = ({ navigate }) => {
  const { isShortlisted, toggleShortlist, showToast } = useShortlist();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recommended');
  
  // Filter states
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [activeChips, setActiveChips] = useState<string[]>([]);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const specializationsList = [
    { name: 'AI Filmmaking', count: 14 },
    { name: 'AI Animation', count: 9 },
    { name: 'Generative Art & Stills', count: 18 },
    { name: 'Product Advertising', count: 14 },
    { name: '3D & Neural NeRF/Gaussian', count: 6 },
    { name: 'Brand Design & Packaging', count: 8 },
  ];

  const toolsList = [
    'Runway Gen-3', 'Runway Gen-3 Alpha', 'Sora', 'Midjourney v6', 'ComfyUI',
    'SDXL Custom', 'ControlNet', 'Luma Dream Machine', 'Kling AI 1.5', 'Unreal Engine 5'
  ];

  const handleToggleSpecialization = (spec: string) => {
    setSelectedSpecializations(prev => {
      const updated = prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec];
      updateChips(updated, selectedTools, selectedBudget, selectedAvailability);
      return updated;
    });
  };

  const handleToggleTool = (tool: string) => {
    setSelectedTools(prev => {
      const updated = prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool];
      updateChips(selectedSpecializations, updated, selectedBudget, selectedAvailability);
      return updated;
    });
  };

  const handleBudgetChange = (b: string) => {
    setSelectedBudget(b);
    updateChips(selectedSpecializations, selectedTools, b, selectedAvailability);
  };

  const handleAvailabilityChange = (a: string) => {
    setSelectedAvailability(a);
    updateChips(selectedSpecializations, selectedTools, selectedBudget, a);
  };

  const updateChips = (specs: string[], tools: string[], budget: string, avail: string) => {
    const chips: string[] = [];
    specs.forEach(s => chips.push(s));
    tools.forEach(t => chips.push(t));
    if (budget !== 'All') chips.push(`Budget: ${budget}`);
    if (avail !== 'All') chips.push(`Availability: ${avail}`);
    setActiveChips(chips);
  };

  const removeChip = (chip: string) => {
    if (chip.startsWith('Budget:')) {
      setSelectedBudget('All');
    } else if (chip.startsWith('Availability:')) {
      setSelectedAvailability('All');
    } else if (selectedSpecializations.includes(chip)) {
      setSelectedSpecializations(prev => prev.filter(s => s !== chip));
    } else if (selectedTools.includes(chip)) {
      setSelectedTools(prev => prev.filter(t => t !== chip));
    }
    setActiveChips(prev => prev.filter(c => c !== chip));
    showToast(`Removed filter: ${chip}`, 'remove');
  };

  const clearAllFilters = () => {
    setActiveChips([]);
    setSelectedSpecializations([]);
    setSelectedTools([]);
    setSelectedBudget('All');
    setSelectedAvailability('All');
    setSearchTerm('');
    showToast('All filters reset. Showing all available AI creators.', 'info');
  };

  // Filter and sort creators
  const filteredCreators = useMemo(() => {
    let result = [...CREATORS];

    // Search across name, specialization, tools, workflow, and project title
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.specialization.toLowerCase().includes(term) ||
        c.tools.some(t => t.toLowerCase().includes(term)) ||
        c.workflowDescription.toLowerCase().includes(term) ||
        c.featuredProjectTitle.toLowerCase().includes(term) ||
        (c.location && c.location.toLowerCase().includes(term))
      );
    }

    // Specializations
    if (selectedSpecializations.length > 0) {
      result = result.filter(c => 
        selectedSpecializations.some(s => c.specialization.toLowerCase().includes(s.toLowerCase()))
      );
    }

    // Tools
    if (selectedTools.length > 0) {
      result = result.filter(c => 
        selectedTools.some(tool => 
          c.tools.some(t => t.toLowerCase().includes(tool.toLowerCase()))
        )
      );
    }

    // Budget
    if (selectedBudget === '< $750') {
      result = result.filter(c => c.indicativeRate < 750);
    } else if (selectedBudget === '$750 – $1,200') {
      result = result.filter(c => c.indicativeRate >= 750 && c.indicativeRate <= 1200);
    } else if (selectedBudget === '$1,200+') {
      result = result.filter(c => c.indicativeRate > 1200);
    }

    // Availability
    if (selectedAvailability !== 'All') {
      result = result.filter(c => c.availability === selectedAvailability);
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.indicativeRate - b.indicativeRate);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.indicativeRate - a.indicativeRate);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // recommended
      result.sort((a, b) => (b.matchScore || b.rating * 20) - (a.matchScore || a.rating * 20));
    }

    return result;
  }, [searchTerm, selectedSpecializations, selectedTools, selectedBudget, selectedAvailability, sortBy]);

  return (
    <div className="flex flex-col w-full bg-[#F8F9FF] min-h-screen">
      {/* Decorative ambient background blur */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#D7E2FF]/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -top-20 right-1/4 w-80 h-80 bg-[#E9DDFF]/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 relative z-10">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div className="flex flex-col max-w-3xl">
              <div className="inline-flex items-center gap-1.5 text-[#175CB5] mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  Curated AI Talent Discovery
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#000E23] tracking-tight">
                Discover AI Creative Talent
              </h1>
              <p className="text-sm sm:text-base text-[#44474D] mt-1 leading-relaxed">
                Explore curated AI filmmakers, generative artists, and animators. Filter by exact model stacks, workflow transparency, and creator-provided commercial terms.
              </p>
            </div>

            {/* Quick Top Metrics Indicator */}
            <div className="flex items-center gap-4 bg-[#E5EEFF] px-4 py-2.5 rounded-xl shrink-0 shadow-xs border border-[#DCE9FF]">
              <div className="flex flex-col">
                <span className="text-[11px] text-[#44474D] font-medium">Demonstration Pool</span>
                <span className="text-xl font-bold text-[#000E23] tracking-tight">{CREATORS.length} Sample Profiles</span>
              </div>
              <div className="w-px h-8 bg-[#CBD5E1]"></div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#44474D] font-medium">Commercial Scope</span>
                <span className="text-xl font-bold text-[#175CB5] tracking-tight">Creator-Declared</span>
              </div>
            </div>
          </div>

          {/* Search & Control Master Bar */}
          <div className="bg-white rounded-xl p-4 shadow-md border border-[#E2E8F0] mb-6 flex flex-col gap-4">
            
            {/* Top Row: Search input + View toggles + Sort */}
            <div className="flex flex-col lg:flex-row items-center gap-4 justify-between">
              
              {/* Search Input */}
              <div className="relative w-full lg:max-w-xl flex items-center">
                <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by creator name, model (e.g. Sora, ComfyUI), specialization..."
                  className="w-full bg-[#EFF4FF] pl-11 pr-24 py-2.5 rounded-lg text-sm text-[#0B1C30] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#175CB5] transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-14 text-slate-400 hover:text-slate-600 p-1"
                    title="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => showToast(`Filter updated for: "${searchTerm || 'All'}"`)}
                  className="absolute right-1.5 bg-[#000E23] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold hover:bg-slate-800 transition-all cursor-pointer"
                >
                  Search
                </button>
              </div>

              {/* Controls: Mobile filter button + View mode + Sort */}
              <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                  className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters {activeChips.length > 0 ? `(${activeChips.length})` : ''}</span>
                </button>

                {/* View Mode Switch */}
                <div className="flex items-center bg-[#EFF4FF] p-1 rounded-lg border border-slate-200/60">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'grid' ? 'bg-white text-[#175CB5] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded-md transition-all cursor-pointer ${
                      viewMode === 'list' ? 'bg-white text-[#175CB5] shadow-xs font-bold' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="List View"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#EFF4FF] text-xs font-semibold text-[#0B1C30] py-2 px-3 rounded-lg border-0 focus:ring-2 focus:ring-[#175CB5] cursor-pointer"
                  >
                    <option value="recommended">Recommended (Match)</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>

              </div>
            </div>

            {/* Bottom Row: Active filter chips */}
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-[#44474D] font-medium">Active Filters:</span>
                
                {activeChips.length === 0 && !searchTerm && (
                  <span className="text-xs text-slate-400 italic">None (Showing all sample creators)</span>
                )}

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] text-xs font-semibold hover:bg-[#ABC7FF] transition-colors cursor-pointer"
                  >
                    <span>Keyword: "{searchTerm}"</span>
                    <X className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800" />
                  </button>
                )}

                {activeChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => removeChip(chip)}
                    className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D7E2FF] text-[#001B3F] text-xs font-semibold hover:bg-[#ABC7FF] transition-colors cursor-pointer"
                  >
                    <span>{chip}</span>
                    <X className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-800" />
                  </button>
                ))}

                {(activeChips.length > 0 || searchTerm) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#175CB5] hover:underline font-semibold ml-2 cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Total live tally */}
              <div className="text-xs text-[#44474D] flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-[#175CB5] animate-pulse"></span>
                <span>
                  Showing <strong className="text-[#000E23] font-bold">{filteredCreators.length}</strong> Sample Creators
                </span>
              </div>
            </div>

          </div>

          {/* Main Layout: Sidebar Left, Mosaic Grid Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT SIDEBAR FILTERS (Desktop & Mobile Drawer) */}
            <aside className={`${filterDrawerOpen ? 'flex' : 'hidden'} lg:flex lg:col-span-4 xl:col-span-3 flex-col gap-5 sticky top-20 z-20`}>
              <div className="bg-white rounded-xl p-5 shadow-md border border-[#E2E8F0] flex flex-col gap-6 max-h-[calc(100vh-7rem)] overflow-y-auto w-full">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#000E23]" />
                    <h2 className="text-base font-bold text-[#000E23]">Filter Creators</h2>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-[#175CB5] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Filter 1: Creative Specialization */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#000E23] uppercase tracking-wider">
                    Creative Specialization
                  </span>
                  <div className="flex flex-col gap-2 mt-1">
                    {specializationsList.map((spec) => (
                      <label 
                        key={spec.name}
                        className="flex items-center justify-between cursor-pointer text-slate-700 hover:text-[#175CB5] text-xs font-medium"
                      >
                        <span className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={selectedSpecializations.includes(spec.name)}
                            onChange={() => handleToggleSpecialization(spec.name)}
                            className="w-4 h-4 rounded text-[#175CB5] accent-[#175CB5] cursor-pointer"
                          />
                          <span>{spec.name}</span>
                        </span>
                        <span className="text-[11px] bg-[#E5EEFF] text-slate-600 px-2 py-0.5 rounded-full font-mono">
                          {spec.count}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 2: AI Tools & Neural Models */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-bold text-[#000E23] uppercase tracking-wider">
                    AI Tools & Models
                  </span>
                  <div className="grid grid-cols-1 gap-2 mt-1">
                    {toolsList.map((tool) => (
                      <label 
                        key={tool}
                        className="flex items-center gap-2 text-slate-700 hover:text-[#175CB5] cursor-pointer text-xs"
                      >
                        <input
                          type="checkbox"
                          checked={selectedTools.includes(tool)}
                          onChange={() => handleToggleTool(tool)}
                          className="w-4 h-4 rounded text-[#175CB5] accent-[#175CB5] cursor-pointer"
                        />
                        <span className="truncate">{tool}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 3: Project Budget */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#000E23] uppercase tracking-wider">
                      Budget Range
                    </span>
                    <span className="text-xs font-bold text-[#175CB5]">{selectedBudget}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-1 text-xs text-slate-700">
                    {['All', '< $750', '$750 – $1,200', '$1,200+'].map(b => (
                      <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-[#175CB5]">
                        <input
                          type="radio"
                          name="budget"
                          checked={selectedBudget === b}
                          onChange={() => handleBudgetChange(b)}
                          className="accent-[#175CB5] cursor-pointer"
                        />
                        <span>{b === 'All' ? 'Any Budget' : b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 4: Availability */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#000E23] uppercase tracking-wider">
                      Availability
                    </span>
                    <span className="text-xs font-bold text-[#175CB5]">{selectedAvailability}</span>
                  </div>
                  <div className="flex flex-col gap-1.5 mt-1 text-xs text-slate-700">
                    {['All', 'Available Now', 'Limited Spots'].map(a => (
                      <label key={a} className="flex items-center gap-2 cursor-pointer hover:text-[#175CB5]">
                        <input
                          type="radio"
                          name="availability"
                          checked={selectedAvailability === a}
                          onChange={() => handleAvailabilityChange(a)}
                          className="accent-[#175CB5] cursor-pointer"
                        />
                        <span>{a === 'All' ? 'Any Availability' : a}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Filter 5: Commercial Terms Notice */}
                <div className="flex flex-col gap-2 bg-[#EFF4FF] p-3.5 rounded-lg border border-[#DCE9FF]">
                  <div className="flex items-center gap-1.5 text-[#175CB5]">
                    <Shield className="w-4 h-4" />
                    <span className="text-[11px] font-bold text-[#000E23] uppercase tracking-wider">
                      Commercial Terms Notice
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug">
                    All sample profiles feature creator-provided commercial terms, documented prompt pipelines, and milestone deliverables.
                  </p>
                </div>

              </div>
            </aside>

            {/* RIGHT CREATOR ROSTER / RESULTS */}
            <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
              
              {/* Empty Search Results State */}
              {filteredCreators.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                    <AlertCircle className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">No Creators Found</h3>
                  <p className="text-sm text-slate-500 max-w-md mb-6 leading-relaxed">
                    No sample creators match your current filter combination. Try clearing your search keyword, adjusting budget limits, or clearing tool selections.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 rounded-xl bg-[#175CB5] hover:bg-[#004590] text-white text-xs font-bold transition-all shadow-sm cursor-pointer flex items-center gap-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </div>
              ) : (
                /* Cards Grid */
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
                  
                  {filteredCreators.map((creator) => {
                    const shortlisted = isShortlisted(creator.id);

                    return (
                      <article
                        key={creator.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-[#E2E8F0] group"
                      >
                        {/* Media Preview Reel */}
                        <div 
                          onClick={() => navigate('creator-profile', creator.id)}
                          className="relative w-full aspect-video overflow-hidden bg-slate-900 cursor-pointer"
                        >
                          <img
                            src={creator.featuredProjectMedia}
                            alt={creator.mediaAlt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#000E23]/80 via-transparent to-transparent pointer-events-none"></div>

                          {/* Top Badges */}
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#000E23] text-white text-[11px] font-bold shadow-xs">
                              <Star className="w-3 h-3 text-amber-400 fill-current" />
                              {creator.verifiedTier}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[#175CB5] text-[10px] font-bold shadow-xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#175CB5]"></span>
                              {creator.availability}
                            </span>
                          </div>

                          {/* Shortlist Heart Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleShortlist(creator.id, creator.name);
                            }}
                            className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white flex items-center justify-center transition-all shadow-md z-10 cursor-pointer ${
                              shortlisted ? 'text-red-500 bg-red-50' : 'text-slate-600 hover:text-red-500'
                            }`}
                            aria-label={`Save ${creator.name} to shortlist`}
                          >
                            <Heart className={`w-4 h-4 transition-transform active:scale-125 ${shortlisted ? 'fill-current' : ''}`} />
                          </button>

                          {/* Project Title Bottom */}
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
                            <div>
                              <span className="text-[10px] text-[#ABC7FF] uppercase tracking-wider block font-semibold">
                                {creator.featuredProjectTag}
                              </span>
                              <span className="text-sm font-bold truncate block">
                                {creator.featuredProjectTitle}
                              </span>
                            </div>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/20 backdrop-blur-md text-[10px] font-mono">
                              {creator.featuredProjectFormat}
                            </span>
                          </div>
                        </div>

                        {/* Creator Body */}
                        <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                          <div className="flex flex-col gap-3">
                            
                            {/* Header: Avatar, Name, Specialization */}
                            <div className="flex items-start justify-between gap-3">
                              <div 
                                onClick={() => navigate('creator-profile', creator.id)}
                                className="flex items-center gap-3 cursor-pointer group-hover:text-[#175CB5] transition-colors"
                              >
                                <Avatar
                                  src={creator.avatar}
                                  name={creator.name}
                                  alt={creator.avatarAlt || creator.name}
                                  sizeClass="w-12 h-12"
                                  className="ring-2 ring-slate-100 shadow-xs"
                                />
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-1.5">
                                    <h3 className="text-base font-bold text-[#000E23] group-hover:text-[#175CB5] transition-colors">
                                      {creator.name}
                                    </h3>
                                    <span className="px-2 py-0.2 rounded bg-slate-100 text-slate-600 text-[10px] font-semibold">
                                      Demo
                                    </span>
                                  </div>
                                  <span className="text-xs text-[#44474D] font-medium">
                                    {creator.roleDescription}
                                  </span>
                                </div>
                              </div>

                              {/* Client Rating */}
                              <div className="flex items-center gap-1 bg-[#EFF4FF] px-2 py-1 rounded-lg shrink-0">
                                <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                                <span className="text-xs font-bold text-[#000E23]">{creator.rating}</span>
                                <span className="text-[10px] text-[#44474D]">({creator.reviewCount})</span>
                              </div>
                            </div>

                            {/* Tools & Model Badges */}
                            <div className="flex flex-wrap gap-1.5 pt-1">
                              {creator.tools.slice(0, 3).map((tool, idx) => (
                                <span
                                  key={idx}
                                  className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                                    idx === 0
                                      ? 'bg-[#D7E2FF] text-[#001B3F]'
                                      : 'bg-[#EFF4FF] text-[#000E23]'
                                  }`}
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>

                            {/* Workflow Description */}
                            <p className="text-xs text-[#44474D] line-clamp-2 leading-relaxed">
                              {creator.workflowDescription}
                            </p>
                          </div>

                          {/* Footer: Pricing, Timeline, Actions */}
                          <div className="flex flex-col gap-3 pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between text-xs bg-[#EFF4FF] px-3.5 py-2 rounded-lg">
                              <div className="flex flex-col">
                                <span className="text-[10px] text-[#44474D]">Indicative Rate</span>
                                <span className="text-sm font-bold text-[#000E23] font-mono">
                                  ${creator.indicativeRate}{' '}
                                  <span className="text-[10px] text-slate-500 font-normal">/ project</span>
                                </span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-[10px] text-[#44474D]">Avg Delivery</span>
                                <span className="text-xs text-[#000E23] font-bold flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5 text-[#175CB5]" />
                                  {creator.turnaroundDays}
                                </span>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => navigate('creator-profile', creator.id)}
                                className="w-full bg-[#000E23] text-white hover:bg-slate-800 text-center py-2.5 rounded-lg text-xs font-semibold transition-all shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                              >
                                <span>View Profile</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => toggleShortlist(creator.id, creator.name)}
                                className={`w-full py-2.5 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                                  shortlisted
                                    ? 'bg-[#D7E2FF] text-[#001B3F] font-bold'
                                    : 'bg-[#EFF4FF] hover:bg-[#DCE9FF] text-[#000E23]'
                                }`}
                              >
                                {shortlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                                <span>{shortlisted ? 'Saved' : 'Shortlist'}</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </article>
                    );
                  })}

                </div>
              )}

              {/* Bottom Notice */}
              <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-xs border border-[#E2E8F0]">
                <div className="flex items-center gap-2 text-[#44474D] text-xs">
                  <Shield className="w-4 h-4 text-[#175CB5]" />
                  <span>
                    Demonstration environment • All creator profiles and portfolio reels represent prototype sample data
                  </span>
                </div>

                {/* Reset or Explore Action */}
                <button
                  onClick={() => navigate('brief')}
                  className="px-4 py-2 bg-[#175CB5] hover:bg-[#004590] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Scope a Custom Project Brief
                </button>
              </div>

            </main>

          </div>

        </div>
      </div>
    </div>
  );
};
