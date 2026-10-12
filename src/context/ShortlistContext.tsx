import React, { createContext, useContext, useState, useEffect } from 'react';

interface ToastData {
  id: number;
  message: string;
  type: 'success' | 'remove' | 'info';
}

interface ShortlistContextType {
  shortlist: string[];
  isShortlisted: (creatorId: string) => boolean;
  toggleShortlist: (creatorId: string, creatorName?: string) => void;
  count: number;
  isShortlistOpen: boolean;
  setIsShortlistOpen: (open: boolean) => void;
  toast: ToastData | null;
  showToast: (message: string, type?: 'success' | 'remove' | 'info') => void;
}

const ShortlistContext = createContext<ShortlistContextType | undefined>(undefined);

export const ShortlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Pre-seed with 3 creators so badge reflects screenshot: 3 items in shortlist
  const [shortlist, setShortlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('creatorbridge_shortlist');
      if (saved) return JSON.parse(saved);
      return ['alex-morgan', 'elena-rostova', 'marcus-chen'];
    } catch {
      return ['alex-morgan', 'elena-rostova', 'marcus-chen'];
    }
  });

  const [isShortlistOpen, setIsShortlistOpen] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

  useEffect(() => {
    localStorage.setItem('creatorbridge_shortlist', JSON.stringify(shortlist));
  }, [shortlist]);

  const showToast = (message: string, type: 'success' | 'remove' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 2800);
  };

  const isShortlisted = (creatorId: string) => shortlist.includes(creatorId);

  const toggleShortlist = (creatorId: string, creatorName?: string) => {
    const displayName = creatorName || creatorId;
    if (shortlist.includes(creatorId)) {
      setShortlist((prev) => prev.filter((id) => id !== creatorId));
      showToast(`Removed ${displayName} from your active shortlist`, 'remove');
    } else {
      setShortlist((prev) => [...prev, creatorId]);
      showToast(`Added ${displayName} to your active shortlist`, 'success');
    }
  };

  return (
    <ShortlistContext.Provider value={{
      shortlist,
      isShortlisted,
      toggleShortlist,
      count: shortlist.length,
      isShortlistOpen,
      setIsShortlistOpen,
      toast,
      showToast
    }}>
      {children}
    </ShortlistContext.Provider>
  );
};

export const useShortlist = () => {
  const context = useContext(ShortlistContext);
  if (!context) throw new Error('useShortlist must be used within a ShortlistProvider');
  return context;
};
