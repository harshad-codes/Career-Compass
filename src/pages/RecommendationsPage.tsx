import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, 
  Filter, 
  MapPin, 
  BookOpen, 
  GraduationCap, 
  Scale, 
  Map, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { storage } from '../utils/storage';
import { COLLEGE_BRANCH_RECORDS } from '../data/colleges';
import { getBestFitColleges } from '../utils/recommendationEngine';
import { CollegeRecommendation, RecommendationTier } from '../types/recommendation';
import { CollegeDetailModal } from '../components/modal/CollegeDetailModal';
import { PrototypeNotice } from '../components/common/PrototypeNotice';
import { ActivePage } from '../components/layout/Navbar';

interface RecommendationsPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onNavigate }) => {
  const [profile, setProfile] = useState(storage.getProfile());
  const [careerResults, setCareerResults] = useState(storage.getCareerResults());
  const [comparisonList, setComparisonList] = useState(storage.getComparisonList());

  const [selectedBranch, setSelectedBranch] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [activeModalRec, setActiveModalRec] = useState<CollegeRecommendation | null>(null);

  // Global storage listener
  useEffect(() => {
    const handleStorageUpdate = () => {
      setProfile(storage.getProfile());
      setCareerResults(storage.getCareerResults());
      setComparisonList(storage.getComparisonList());
    };
    window.addEventListener('storage-update', handleStorageUpdate);
    return () => window.removeEventListener('storage-update', handleStorageUpdate);
  }, []);

  // Compute all recommendations dynamically
  const recommendations: CollegeRecommendation[] = useMemo(() => {
    if (!profile) return [];
    return getBestFitColleges(COLLEGE_BRANCH_RECORDS, profile, careerResults);
  }, [profile, careerResults]);

  // Filter recommendations
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(rec => {
      if (selectedBranch !== 'All' && rec.college.branchCode !== selectedBranch && rec.college.branchId !== selectedBranch) {
        return false;
      }
      if (selectedTier !== 'All') {
        if (selectedTier === 'BEST_FIT' && rec.tier !== 'BEST_FIT') return false;
        if (selectedTier === 'POSSIBLE_FIT' && rec.tier !== 'POSSIBLE_FIT') return false;
        if (selectedTier === 'LOW_FIT' && rec.tier !== 'LOW_FIT') return false;
      }
      return true;
    });
  }, [recommendations, selectedBranch, selectedTier]);

  // If no profile exists
  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Complete Your Profile First</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Complete your student profile and assessment to generate personalized college recommendations based on your marks, branch preferences, and location.
        </p>
        <div className="pt-3 flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('profile')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>Create Profile</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => storage.loadDemoMode()}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Try Demo</span>
          </button>
        </div>
      </div>
    );
  }

  const handleToggleCompare = (rec: CollegeRecommendation) => {
    const exists = comparisonList.some(item => item.recommendation.id === rec.id);
    if (exists) {
      storage.removeFromComparison(rec.id);
    } else {
      storage.addToComparison(rec);
    }
  };

  const isCollegeCompared = (recId: string) => {
    return comparisonList.some(item => item.recommendation.id === recId);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Personalized Matching Engine
            </span>
            {profile.isDemo && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Demo Student: Harsh (97.5%)
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">MY BEST-FIT COLLEGES</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Colleges matched across Academic Fit (40%), Career Fit (35%), and Location Fit (25%).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Map className="w-4 h-4 text-indigo-400" />
            <span>Open College Map</span>
          </button>

          <button
            onClick={() => onNavigate('compare')}
            className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <Scale className="w-4 h-4 text-indigo-400" />
            <span>Compare List ({comparisonList.length}/3)</span>
          </button>
        </div>
      </div>

      <PrototypeNotice />

      {/* Filter and Overview Controls */}
      <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Tiers:</span>
          {[
            { id: 'All', label: 'All Colleges' },
            { id: 'BEST_FIT', label: '🟢 Best Fit (≥85%)' },
            { id: 'POSSIBLE_FIT', label: '🟡 Possible Fit (70-84%)' },
            { id: 'LOW_FIT', label: '🔴 Low Fit (<70%)' },
          ].map(tier => (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedTier === tier.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tier.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Branch:</span>
          <select
            value={selectedBranch}
            onChange={e => setSelectedBranch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Branches</option>
            <option value="CS">CSE</option>
            <option value="AD">AI & DS</option>
            <option value="IT">IT</option>
            <option value="EC">ECE</option>
            <option value="EE">EEE</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
          </select>
        </div>
      </div>

      {/* Recommendations Card List */}
      <div className="space-y-4">
        {filteredRecommendations.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl space-y-2">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No colleges match current filters</h3>
            <p className="text-xs text-slate-400">
              Try choosing "All Colleges" or selecting a different engineering branch.
            </p>
          </div>
        ) : (
          filteredRecommendations.map((rec) => {
            const isCompared = isCollegeCompared(rec.id);
            const { college, fitBreakdown, overallFitScore, tier, tierLabel, whyThisCollege, competitivenessWarning } = rec;

            return (
              <div
                key={rec.id}
                className={`p-6 rounded-2xl border transition-all ${
                  tier === 'BEST_FIT'
                    ? 'bg-slate-900/90 border-slate-800 hover:border-emerald-500/50 shadow-lg'
                    : tier === 'POSSIBLE_FIT'
                    ? 'bg-slate-900/70 border-slate-800 hover:border-amber-500/50'
                    : 'bg-slate-900/50 border-slate-800/80 opacity-80'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left Column: College and Branch Meta */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                        Code: {college.collegeCode}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                        {college.collegeType}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        tier === 'BEST_FIT' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                        tier === 'POSSIBLE_FIT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                        'bg-rose-500/20 text-rose-300 border-rose-500/40'
                      }`}>
                        {tierLabel}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white hover:text-indigo-300 transition-colors cursor-pointer"
                        onClick={() => setActiveModalRec(rec)}>
                      {college.collegeName}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-500" />
                        {college.city} (~{fitBreakdown.distanceKm} km)
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="font-semibold text-white">{college.branchName}</span> ({college.branchCode})
                      </span>
                      <span className="text-slate-400">
                        Sample Cutoff: <span className="font-bold text-white">{college.sampleCutoff}</span>
                      </span>
                    </div>

                    {/* Competitiveness Warning if score is below cutoff */}
                    {competitivenessWarning && (
                      <p className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span>{competitivenessWarning}</span>
                      </p>
                    )}
                  </div>

                  {/* Right Column: Score Badges & Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 flex-shrink-0">
                    {/* Score Pillars pill grid */}
                    <div className="flex items-center gap-2 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-center">
                      <div className="px-2">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Academic</div>
                        <div className="text-xs font-bold text-indigo-400">{fitBreakdown.academicFitScore}%</div>
                      </div>
                      <div className="w-px h-6 bg-slate-800" />
                      <div className="px-2">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Career</div>
                        <div className="text-xs font-bold text-indigo-400">{fitBreakdown.careerFitScore}%</div>
                      </div>
                      <div className="w-px h-6 bg-slate-800" />
                      <div className="px-2">
                        <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                        <div className="text-xs font-bold text-indigo-400">{fitBreakdown.locationFitScore}%</div>
                      </div>
                    </div>

                    {/* Overall Score Badge */}
                    <div className="text-center px-4 py-2 rounded-xl bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-500/40">
                      <div className="text-[10px] uppercase font-bold text-indigo-300">Overall Fit</div>
                      <div className="text-2xl font-black text-white">{overallFitScore}%</div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => setActiveModalRec(rec)}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleToggleCompare(rec)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                          isCompared
                            ? 'bg-rose-950/30 text-rose-300 border-rose-500/40 hover:bg-rose-900/40'
                            : 'bg-slate-950 text-slate-300 border-slate-700 hover:bg-slate-800'
                        }`}
                      >
                        <Scale className="w-3.5 h-3.5" />
                        <span>{isCompared ? 'In Compare' : 'Add to Compare'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Personalized Justification Bullet */}
                {whyThisCollege.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{whyThisCollege[0]}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* College Detail Modal */}
      {activeModalRec && (
        <CollegeDetailModal
          recommendation={activeModalRec}
          onClose={() => setActiveModalRec(null)}
          onCompareUpdated={() => setComparisonList(storage.getComparisonList())}
        />
      )}
    </div>
  );
};
