import React, { useState } from 'react';
import { CATEGORIES_LIST } from '../data/mockData';
import { 
  Clapperboard, Sparkles, Box, Palette, Layers, Headphones, 
  UserCheck, ShoppingBag, ArrowRight, Search, ShieldCheck 
} from 'lucide-react';

interface CategoriesPageProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const CategoriesPage: React.FC<CategoriesPageProps> = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'movie': return <Clapperboard className="w-6 h-6 text-[#175CB5]" />;
      case 'animation': return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'palette': return <Palette className="w-6 h-6 text-pink-600" />;
      case 'shopping_bag': return <ShoppingBag className="w-6 h-6 text-emerald-600" />;
      case 'view_in_ar': return <Box className="w-6 h-6 text-amber-600" />;
      case 'draw': return <Layers className="w-6 h-6 text-cyan-600" />;
      case 'headphones': return <Headphones className="w-6 h-6 text-indigo-600" />;
      case 'face': return <UserCheck className="w-6 h-6 text-rose-600" />;
      default: return <Sparkles className="w-6 h-6 text-[#175CB5]" />;
    }
  };

  const filteredCategories = CATEGORIES_LIST.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTool = !selectedTool || category.tools.some(t => t.toLowerCase().includes(selectedTool.toLowerCase()));
    return matchesSearch && matchesTool;
  });

  const popularTools = ['Runway Gen-3', 'Sora', 'Midjourney v6', 'ComfyUI', 'ElevenLabs', 'Gaussian Splat'];

  return (
    <div className="min-h-screen bg-[#F8F9FF] text-[#001B3F] pb-24">
      {/* Hero Header */}
      <div className="bg-[#000E23] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#175CB5]/30 text-[#6AA0FD] border border-[#175CB5]/50 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Creative Disciplines</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto">
            Explore Generative AI Production Domains
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto">
            From 4K photoreal commercial cinema and neural 3D Gaussian splatting to multi-lingual brand avatar fleets. Every discipline is supported by dual-signed escrow and commercial indemnity.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search creative disciplines, pipelines, or models..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#175CB5] text-sm backdrop-blur"
            />
          </div>

          {/* Tool Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-400">Filter by tool:</span>
            {popularTools.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTool(selectedTool === t ? null : t)}
                className={`px-2.5 py-1 rounded-full transition-colors cursor-pointer ${
                  selectedTool === t
                    ? 'bg-[#175CB5] text-white font-bold'
                    : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-[#175CB5]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  {getCategoryIcon(category.icon)}
                </div>

                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-extrabold text-base text-slate-900 group-hover:text-[#175CB5] transition-colors">
                    {category.name}
                  </h3>
                </div>

                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#175CB5]/10 text-[#175CB5] mb-2">
                  {category.creatorCount} Vetted Creators
                </span>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-6">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Model Stacks Verified
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {category.tools.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('explore-creators')}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 group-hover:bg-[#175CB5] text-slate-700 group-hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Browse Specialists</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Enterprise Bottom Banner */}
        <div className="mt-16 bg-[#000E23] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
          <div className="max-w-2xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#175CB5]/30 text-[#6AA0FD] border border-[#175CB5]/50 inline-flex items-center gap-1.5 mb-3">
              <ShieldCheck className="w-4 h-4" />
              Enterprise Custom Neural Workflows
            </span>
            <h2 className="text-2xl sm:text-3xl font-black">
              Need a custom fine-tuned LoRA or brand IP pipeline?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-300">
              Our Safety Labs team trains private enterprise checkpoints on your proprietary product CAD files with zero multi-tenant leakage and guaranteed trademark isolation.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => navigate('brief')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-[#175CB5] hover:bg-[#124b96] text-white shadow-md cursor-pointer transition-colors"
              >
                Scope Enterprise Custom Brief
              </button>
              <button
                onClick={() => navigate('for-brands')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/20 cursor-pointer transition-colors"
              >
                Review IP Indemnity Guarantees
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
