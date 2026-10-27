import React, { useState, useEffect } from 'react';
import { Navbar, ActivePage } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './pages/LandingPage';
import { ProfilePage } from './pages/ProfilePage';
import { AssessmentPage } from './pages/AssessmentPage';
import { CareerResultsPage } from './pages/CareerResultsPage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { CollegeMapPage } from './pages/CollegeMapPage';
import { CollegeExplorerPage } from './pages/CollegeExplorerPage';
import { ComparePage } from './pages/ComparePage';
import { DashboardPage } from './pages/DashboardPage';
import { storage } from './utils/storage';
import { Sparkles, RotateCcw } from 'lucide-react';

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleNavigate = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadDemo = () => {
    storage.loadDemoMode();
    showToast('Demo Mode Loaded! Sample profile (Harsh - 97.5%) & assessment initialized.');
    handleNavigate('recommendations');
  };

  const handleResetDemo = () => {
    storage.resetAll();
    showToast('Demo reset. All local demonstration data cleared.');
    handleNavigate('home');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#050816] text-slate-100 font-sans selection:bg-indigo-600 selection:text-white">
      {/* Persistent Notification Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3.5 bg-indigo-950/90 border border-indigo-500/50 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs text-indigo-200 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-amber-300 flex-shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onLoadDemo={handleLoadDemo}
        onResetDemo={handleResetDemo}
      />

      {/* Main Page Content Body */}
      <main className="flex-1">
        {activePage === 'home' && (
          <LandingPage
            onNavigate={handleNavigate}
            onLoadDemo={handleLoadDemo}
          />
        )}

        {activePage === 'profile' && (
          <ProfilePage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'assessment' && (
          <AssessmentPage
            onNavigate={handleNavigate}
            onAssessmentCompleted={() => handleNavigate('careers')}
          />
        )}

        {activePage === 'careers' && (
          <CareerResultsPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'recommendations' && (
          <RecommendationsPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'map' && (
          <CollegeMapPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'explorer' && (
          <CollegeExplorerPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'compare' && (
          <ComparePage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'dashboard' && (
          <DashboardPage
            onNavigate={handleNavigate}
            onLoadDemo={handleLoadDemo}
            onResetDemo={handleResetDemo}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
