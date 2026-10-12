import React from 'react';
import { useShortlist } from '../context/ShortlistContext';
import { CheckCircle2, BookmarkX, Info } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast } = useShortlist();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up pointer-events-none">
      <div className="bg-[#000E23] text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700/60 flex items-center gap-3 max-w-md">
        {toast.type === 'remove' ? (
          <BookmarkX className="w-5 h-5 text-rose-400 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-[#6AA0FD] shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        )}
        <span className="text-xs font-medium leading-relaxed">{toast.message}</span>
      </div>
    </div>
  );
};
