import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  User, 
  FileText, 
  Award, 
  Map, 
  Scale, 
  LayoutDashboard, 
  Search, 
  RotateCcw, 
  Sparkles, 
  Menu, 
  X 
} from 'lucide-react';
import { storage } from '../../utils/storage';

export type ActivePage = 
  | 'home'
  | 'profile'
  | 'assessment'
  | 'careers'
  | 'recommendations'
  | 'map'
  | 'explorer'
  | 'compare'
  | 'dashboard';

interface NavItem {
  id: ActivePage;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
}

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onLoadDemo: () => void;
  onResetDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onLoadDemo,
  onResetDemo,
}) => {
  const [isDemo, setIsDemo] = useState(storage.isDemoMode());
  const [compareCount, setCompareCount] = useState(storage.getComparisonList().length);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setIsDemo(storage.isDemoMode());
      setCompareCount(storage.getComparisonList().length);
    };

    window.addEventListener('storage-update', handleStorageUpdate);
    return () => window.removeEventListener('storage-update', handleStorageUpdate);
  }, []);

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'assessment', label: 'Assessment', icon: FileText },
    { id: 'careers', label: 'Careers', icon: Award },
    { id: 'recommendations', label: 'My Recommendations', icon: Sparkles },
    { id: 'map', label: 'College Map', icon: Map },
    { id: 'explorer', label: 'College Explorer', icon: Search },
    { id: 'compare', label: 'Compare', icon: Scale, badge: compareCount > 0 ? compareCount : undefined },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#070c1e]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl shadow-md shadow-indigo-600/30 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                CAREER COMPASS
                {isDemo && (
                  <span className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                    Demo
                  </span>
                )}
              </span>
              <span className="text-[10px] text-slate-400 block -mt-0.5 hidden sm:block">
                Personalized College Matching
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 relative ${
                    isActive
                      ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/40'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.2 bg-indigo-500 text-white rounded-full text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Demo Controls & Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {isDemo ? (
              <button
                onClick={onResetDemo}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
                title="Reset demonstration data"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            ) : (
              <button
                onClick={onLoadDemo}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-600/30 flex items-center gap-1.5 transition-all"
                title="Load sample Harsh student profile for presentation"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Try Demo</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 xl:hidden text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0a0f24] border-b border-slate-800 px-4 pt-2 pb-4 space-y-1 animate-fadeIn">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 bg-indigo-500 text-white rounded-full text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
