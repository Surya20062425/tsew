import React from 'react';
import { useShortlist } from '../context/ShortlistContext';
import { CREATORS } from '../data/mockData';
import { X, Trash2, ArrowRight, Star, Clock, DollarSign } from 'lucide-react';
import { Avatar } from './Avatar';

interface ShortlistModalProps {
  navigate: (path: string, creatorId?: string) => void;
}

export const ShortlistModal: React.FC<ShortlistModalProps> = ({ navigate }) => {
  const { shortlist, isShortlistOpen, setIsShortlistOpen, toggleShortlist } = useShortlist();

  if (!isShortlistOpen) return null;

  const shortlistedCreators = CREATORS.filter((c) => shortlist.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between animate-slide-left border-l border-slate-200"
        role="dialog"
        aria-label="Active Shortlist"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8F9FF]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Active Talent Shortlist</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#175CB5] text-white text-xs font-bold">
                {shortlistedCreators.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review saved creator profiles or invite them to a project brief.
            </p>
          </div>
          <button
            onClick={() => setIsShortlistOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {shortlistedCreators.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <p className="text-sm font-medium text-slate-600">Your shortlist is currently empty</p>
              <p className="text-xs text-slate-400 mt-1">
                Click the bookmark or shortlist button on any creator profile to save them here.
              </p>
              <button
                onClick={() => { setIsShortlistOpen(false); navigate('explore-creators'); }}
                className="mt-4 px-4 py-2 bg-[#175CB5] text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Discover Creators
              </button>
            </div>
          ) : (
            shortlistedCreators.map((creator) => (
              <div 
                key={creator.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-[#6AA0FD] transition-all flex flex-col gap-3 shadow-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={creator.avatar}
                      name={creator.name}
                      alt={creator.avatarAlt || creator.name}
                      sizeClass="w-12 h-12"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-slate-900">{creator.name}</h4>
                        <span className="text-[10px] font-semibold bg-[#E9DDFF] text-[#23005C] px-1.5 py-0.5 rounded">
                          {creator.verifiedTier}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500">{creator.roleDescription}</p>
                      
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600 font-medium">
                        <span className="flex items-center text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-current mr-0.5" />
                          {creator.rating}
                        </span>
                        <span>•</span>
                        <span className="flex items-center text-slate-700">
                          <DollarSign className="w-3 h-3 text-slate-400" />
                          ${creator.indicativeRate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center text-slate-500">
                          <Clock className="w-3 h-3 mr-0.5" />
                          {creator.turnaroundDays}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleShortlist(creator.id, creator.name)}
                    className="text-slate-400 hover:text-red-500 p-1 rounded-md transition-colors cursor-pointer"
                    title="Remove from shortlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setIsShortlistOpen(false);
                      navigate('creator-profile', creator.id);
                    }}
                    className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setIsShortlistOpen(false);
                      navigate('matching-results');
                    }}
                    className="flex-1 py-1.5 px-3 bg-[#175CB5] hover:bg-[#004590] text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Match with Brief
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer actions */}
        {shortlistedCreators.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-[#F8F9FF] space-y-2">
            <button
              onClick={() => {
                setIsShortlistOpen(false);
                navigate('brief');
              }}
              className="w-full py-2.5 bg-[#175CB5] hover:bg-[#004590] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Post Brief to Shortlist ({shortlistedCreators.length})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[11px] text-center text-slate-500">
              Milestone-based collaboration simulation • Sample creator profiles
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
