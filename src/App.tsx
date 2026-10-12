/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ShortlistProvider } from './context/ShortlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ShortlistModal } from './components/ShortlistModal';
import { ToastNotification } from './components/ToastNotification';
import { AiChatbotModal } from './components/AiChatbotModal';

// Page Views
import { HomePage } from './pages/HomePage';
import { ExploreCreatorsPage } from './pages/ExploreCreatorsPage';
import { CreatorProfilePage } from './pages/CreatorProfilePage';
import { PostBriefPage } from './pages/PostBriefPage';
import { MatchingResultsPage } from './pages/MatchingResultsPage';
import { WorkspacePage } from './pages/WorkspacePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ForBrandsPage } from './pages/ForBrandsPage';
import { CreatorBrandOpportunitiesPage } from './pages/CreatorBrandOpportunitiesPage';

function AppContent() {
  const { isAuthenticated, role } = useAuth();
  const [currentPath, setCurrentPath] = useState<string>('home');
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>('alex-morgan');

  // Sync route with URL hash on load and hashchange
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      if (!hash) {
        setCurrentPath('home');
        return;
      }

      if (hash.startsWith('creators/')) {
        const id = hash.replace('creators/', '');
        setSelectedCreatorId(id);
        setCurrentPath('creator-profile');
      } else {
        setCurrentPath(hash);
      }
      window.scrollTo(0, 0);
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: string, creatorId?: string) => {
    if (creatorId) {
      setSelectedCreatorId(creatorId);
      window.location.hash = `creators/${creatorId}`;
      setCurrentPath('creator-profile');
    } else {
      window.location.hash = path;
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentView = () => {
    // If user is not authenticated, they must go to Login first (or Register to complete the form)
    if (!isAuthenticated && currentPath !== 'register') {
      return <LoginPage navigate={navigate} />;
    }

    switch (currentPath) {
      case 'home':
        // For Creators: Show about the Brands (Funded briefs, client profiles, pitching)
        // For Brands: Show about the Creators (Vetted talent directory, reels, hiring)
        return role === 'creator'
          ? <CreatorBrandOpportunitiesPage navigate={navigate} />
          : <HomePage navigate={navigate} />;
      case 'brand-briefs':
      case 'brands-directory':
        return <CreatorBrandOpportunitiesPage navigate={navigate} />;
      case 'explore-creators':
        return <ExploreCreatorsPage navigate={navigate} />;
      case 'creator-profile':
        return <CreatorProfilePage creatorId={selectedCreatorId} navigate={navigate} />;
      case 'brief':
      case 'post-brief':
        return <PostBriefPage navigate={navigate} />;
      case 'matching-results':
        return <MatchingResultsPage navigate={navigate} />;
      case 'workspace':
        return <WorkspacePage navigate={navigate} />;
      case 'login':
        return <LoginPage navigate={navigate} />;
      case 'register':
        return <RegisterPage navigate={navigate} />;
      case 'categories':
        return <CategoriesPage navigate={navigate} />;
      case 'how-it-works':
        return <HowItWorksPage navigate={navigate} />;
      case 'for-brands':
        return <ForBrandsPage navigate={navigate} />;
      default:
        return role === 'creator'
          ? <CreatorBrandOpportunitiesPage navigate={navigate} />
          : <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FF] text-[#001B3F] font-sans antialiased selection:bg-[#D7E2FF] selection:text-[#001B3F]">
      {/* Dynamic Responsive Navigation Bar with Role-based controls & Shortlist counter */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Main Content View */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer with Enterprise Legal Certifications & Marketplace Links */}
      <Footer navigate={navigate} />

      {/* Shortlist Drawer Modal */}
      <ShortlistModal navigate={navigate} />

      {/* Floating Interactive Toast Feedback */}
      <ToastNotification />

      {/* AI Assistant Chatbot Concierge */}
      <AiChatbotModal navigate={navigate} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ShortlistProvider>
        <AppContent />
      </ShortlistProvider>
    </AuthProvider>
  );
}
