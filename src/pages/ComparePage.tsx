import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Trash2, 
  Trophy, 
  MapPin, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen,
  Briefcase
} from 'lucide-react';
import { storage } from '../utils/storage';
import { ComparisonItem, CollegeRecommendation } from '../types/recommendation';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { PrototypeNotice } from '../components/common/PrototypeNotice';
import { ActivePage } from '../components/layout/Navbar';

interface ComparePageProps {
  onNavigate: (page: ActivePage) => void;
}

export const ComparePage: React.FC<ComparePageProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<ComparisonItem[]>(storage.getComparisonList());

  useEffect(() => {
    const handleStorage = () => {
      setItems(storage.getComparisonList());
    };
    window.addEventListener('storage-update', handleStorage);
    return () => window.removeEventListener('storage-update', handleStorage);
  }, []);

  const handleRemove = (id: string) => {
    storage.removeFromComparison(id);
    setItems(storage.getComparisonList());
  };

  const handleClearAll = () => {
    storage.clearComparison();
    setItems([]);
  };

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <Scale className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Your Comparison List is Empty</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Add up to 3 colleges from your personalized recommendations or the college map to compare their academic feasibility, career alignment, and location scores side by side.
        </p>
        <div className="pt-3 flex items-center justify-center gap-3">
          <button
            onClick={() => onNavigate('recommendations')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2"
          >
            <span>Explore Recommendations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => storage.loadDemoMode()}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Load Demo Data</span>
          </button>
        </div>
      </div>
    );
  }

  // Identify highest overall fit score
  const highestScore = Math.max(...items.map(item => item.recommendation.overallFitScore));

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
            Multi-Institutional Evaluation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Compare Your Options</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Side-by-side evaluation for up to 3 colleges. Highlighted institution indicates the strongest overall fit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {items.length < 3 && (
            <button
              onClick={() => onNavigate('recommendations')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-colors"
            >
              + Add College ({items.length}/3)
            </button>
          )}

          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Comparison</span>
          </button>
        </div>
      </div>

      <PrototypeNotice compact />

      {/* Comparison Grid */}
      <div className={`grid grid-cols-1 ${items.length === 2 ? 'md:grid-cols-2' : items.length === 3 ? 'md:grid-cols-3' : 'max-w-md mx-auto'} gap-6`}>
        {items.map(({ recommendation: rec }) => {
          const isWinner = rec.overallFitScore === highestScore && items.length > 1;
          const { college, fitBreakdown, overallFitScore, tierLabel } = rec;

          return (
            <div
              key={rec.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all relative ${
                isWinner
                  ? 'bg-gradient-to-b from-indigo-950/70 via-slate-900 to-slate-900 border-indigo-500/60 shadow-2xl shadow-indigo-500/10 ring-1 ring-indigo-500/40'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Winner Badge */}
              {isWinner && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-r from-amber-500 to-indigo-600 text-white rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <Trophy className="w-3.5 h-3.5 text-amber-200" />
                  <span>Strongest Overall Match</span>
                </div>
              )}

              <div className="space-y-4">
                {/* College Title & Remove */}
                <div className="flex items-start justify-between gap-2 pt-2">
                  <div>
                    <span className="text-[11px] font-mono text-indigo-400">Code {college.collegeCode}</span>
                    <h3 className="text-base font-bold text-white leading-snug mt-0.5">{college.collegeName}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{college.city} (~{fitBreakdown.distanceKm} km)</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRemove(rec.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Remove from comparison"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Branch Info */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Target Branch</div>
                  <div className="font-bold text-white flex items-center justify-between">
                    <span>{college.branchName}</span>
                    <span className="font-mono text-indigo-400">{college.branchCode}</span>
                  </div>
                </div>

                {/* Score Meter */}
                <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800/80 flex items-center justify-around">
                  <ScoreMeter
                    score={overallFitScore}
                    size="md"
                    color={rec.tier === 'BEST_FIT' ? 'emerald' : rec.tier === 'POSSIBLE_FIT' ? 'amber' : 'rose'}
                    label="Overall Fit"
                  />
                  <div className="text-right">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      rec.tier === 'BEST_FIT' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                      rec.tier === 'POSSIBLE_FIT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                      'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}>
                      {tierLabel}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1.5 font-mono">40 / 35 / 25 Index</div>
                  </div>
                </div>

                {/* 3 Fit Pillars Comparison */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">Academic Fit (40%):</span>
                    <span className="font-bold text-indigo-300">{fitBreakdown.academicFitScore}%</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">Career Fit (35%):</span>
                    <span className="font-bold text-indigo-300">{fitBreakdown.careerFitScore}%</span>
                  </div>
                  <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">Location Fit (25%):</span>
                    <span className="font-bold text-indigo-300">{fitBreakdown.locationFitScore}%</span>
                  </div>
                </div>

                {/* Institutional Metrics */}
                <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sample Cutoff:</span>
                    <span className="font-bold text-white">{college.sampleCutoff} / 200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Average Package:</span>
                    <span className="font-bold text-emerald-400">₹{college.averagePackageLpa} LPA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Seats:</span>
                    <span className="font-bold text-white">{college.totalSeats}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Institution Type:</span>
                    <span className="font-medium text-slate-300">{college.collegeType}</span>
                  </div>
                </div>
              </div>

              {/* Justification summary */}
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 leading-snug">
                <span className="text-emerald-400 font-bold mr-1">Key Advantage:</span>
                {rec.whyThisCollege[0] || 'Strong institutional fit across multiple criteria.'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
