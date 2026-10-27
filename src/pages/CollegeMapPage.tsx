import React, { useState, useMemo, useEffect } from 'react';
import { 
  Map as MapIcon, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Info 
} from 'lucide-react';
import { storage } from '../utils/storage';
import { COLLEGE_BRANCH_RECORDS } from '../data/colleges';
import { getBestFitColleges } from '../utils/recommendationEngine';
import { CollegeRecommendation } from '../types/recommendation';
import { TamilNaduMap } from '../components/map/TamilNaduMap';
import { CollegeDetailModal } from '../components/modal/CollegeDetailModal';
import { PrototypeNotice } from '../components/common/PrototypeNotice';
import { ActivePage } from '../components/layout/Navbar';

interface CollegeMapPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CollegeMapPage: React.FC<CollegeMapPageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState(storage.getProfile());
  const [careerResults, setCareerResults] = useState(storage.getCareerResults());
  const [selectedRec, setSelectedRec] = useState<CollegeRecommendation | null>(null);

  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(storage.getProfile());
      setCareerResults(storage.getCareerResults());
    };
    window.addEventListener('storage-update', handleStorageUpdate);
    return () => window.removeEventListener('storage-update', handleStorageUpdate);
  }, []);

  const recommendations = useMemo(() => {
    if (!profile) return [];
    return getBestFitColleges(COLLEGE_BRANCH_RECORDS, profile, careerResults);
  }, [profile, careerResults]);

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <MapIcon className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Interactive Map Requires Student Profile</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          The geographical map plots colleges according to your personalized travel radius and fit scores (🟢 Best, 🟡 Possible, 🔴 Low).
        </p>
        <div className="pt-3 flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>Complete Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => storage.loadDemoMode()}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Try Demo Mode</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-6 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Geographical Visualization
            </span>
            {profile.isDemo && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Harsh (Chennai • 50km)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Tamil Nadu College Map</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visual spatial matching across Tamil Nadu. Green markers represent your top institutional fits.
          </p>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
        >
          View Recommendations List
        </button>
      </div>

      <PrototypeNotice compact />

      {/* SVG Interactive Map */}
      <TamilNaduMap
        recommendations={recommendations}
        onSelectRecommendation={rec => setSelectedRec(rec)}
      />

      {/* Detail Modal */}
      {selectedRec && (
        <CollegeDetailModal
          recommendation={selectedRec}
          onClose={() => setSelectedRec(null)}
        />
      )}
    </div>
  );
};
