import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  ChevronDown, 
  ChevronUp, 
  Compass, 
  ExternalLink,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { CollegeRecommendation } from '../../types/recommendation';
import { ScoreMeter } from '../common/ScoreMeter';
import { storage } from '../../utils/storage';

interface CollegeDetailModalProps {
  recommendation: CollegeRecommendation | null;
  onClose: () => void;
  onCompareUpdated?: () => void;
}

export const CollegeDetailModal: React.FC<CollegeDetailModalProps> = ({
  recommendation,
  onClose,
  onCompareUpdated
}) => {
  const [showFormulaDetails, setShowFormulaDetails] = useState(false);
  const [compareMessage, setCompareMessage] = useState<string | null>(null);

  if (!recommendation) return null;

  const { college, fitBreakdown, overallFitScore, tier, tierLabel, tierColor, whyThisCollege, competitivenessWarning } = recommendation;

  const comparisonList = storage.getComparisonList();
  const isCompared = comparisonList.some(item => item.recommendation.id === recommendation.id);

  const handleToggleCompare = () => {
    if (isCompared) {
      storage.removeFromComparison(recommendation.id);
      setCompareMessage('Removed from comparison list.');
    } else {
      const res = storage.addToComparison(recommendation);
      setCompareMessage(res.message);
    }
    if (onCompareUpdated) onCompareUpdated();
    setTimeout(() => setCompareMessage(null), 3000);
  };

  const getTierBadgeClass = () => {
    if (tier === 'BEST_FIT') return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
    if (tier === 'POSSIBLE_FIT') return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
    return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="relative w-full max-w-3xl my-8 bg-[#0b1329] border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header Header */}
        <div className="relative p-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Code: {college.collegeCode}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {college.collegeType}
            </span>
            <span className={`text-xs font-bold px-3 py-0.5 rounded-full border ${getTierBadgeClass()}`}>
              {tierLabel}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-white pr-8">
            {college.collegeName}
          </h2>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {college.city} ({college.district})
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              {college.branchName} ({college.branchCode})
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              Rating: {college.campusRating} / 5.0
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Compare alert message if triggered */}
          {compareMessage && (
            <div className="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl text-indigo-200 text-xs flex items-center justify-between animate-fadeIn">
              <span>{compareMessage}</span>
              <span className="text-slate-400 text-[10px] ml-2 font-mono">Compare updated</span>
            </div>
          )}

          {/* Core Score Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <ScoreMeter 
                score={overallFitScore} 
                size="lg" 
                color={tierColor} 
                label="Overall Fit" 
              />
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-bold text-white">CAREER COMPASS Fit Score</h3>
                </div>
                <p className="text-xs text-slate-300 mt-1 max-w-sm">
                  Personalized synthesis evaluating academic cutoff feasibility, career interest synergy, and travel feasibility.
                </p>
                <div className="mt-2 text-xs font-semibold text-indigo-300">
                  Formula: (Academic × 40%) + (Career × 35%) + (Location × 25%)
                </div>
              </div>
            </div>

            <button
              onClick={handleToggleCompare}
              className={`w-full md:w-auto px-5 py-2.5 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition-all shadow-lg ${
                isCompared
                  ? 'bg-rose-900/30 text-rose-300 border border-rose-500/40 hover:bg-rose-900/50'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20'
              }`}
            >
              <Scale className="w-4 h-4" />
              {isCompared ? 'Remove from Compare' : 'Add to Compare (Max 3)'}
            </button>
          </div>

          {/* Academic Competitiveness Warning if relevant */}
          {competitivenessWarning && (
            <div className="p-3.5 bg-amber-950/30 border border-amber-500/40 rounded-xl flex items-start gap-3 text-xs text-amber-200">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <span>{competitivenessWarning}</span>
            </div>
          )}

          {/* 3 Fit Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Academic Fit */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Academic Fit (40%)</span>
                <span className="text-base font-bold text-indigo-400">{fitBreakdown.academicFitScore}%</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between text-slate-400">
                  <span>Your Cutoff Index:</span>
                  <span className="font-semibold text-white">{fitBreakdown.studentCutoff} / 200</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Sample Cutoff:</span>
                  <span className="font-semibold text-white">{fitBreakdown.collegeCutoff} / 200</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Cutoff Differential:</span>
                  <span className={`font-semibold ${fitBreakdown.academicDelta >= 0 ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {fitBreakdown.academicDelta >= 0 ? `+${fitBreakdown.academicDelta}` : fitBreakdown.academicDelta}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                {fitBreakdown.academicNotes}
              </p>
            </div>

            {/* Career Fit */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Career Fit (35%)</span>
                <span className="text-base font-bold text-indigo-400">{fitBreakdown.careerFitScore}%</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between text-slate-400">
                  <span>Primary Domain:</span>
                  <span className="font-semibold text-white truncate max-w-[120px]">{fitBreakdown.primaryMatchedCareer}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Matched Interests:</span>
                  <span className="font-semibold text-emerald-400">
                    {fitBreakdown.matchedInterestTags.length > 0 ? `${fitBreakdown.matchedInterestTags.length} tags` : 'Aligned'}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                {fitBreakdown.careerNotes}
              </p>
            </div>

            {/* Location Fit */}
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location Fit (25%)</span>
                <span className="text-base font-bold text-indigo-400">{fitBreakdown.locationFitScore}%</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between text-slate-400">
                  <span>Approx Distance:</span>
                  <span className="font-semibold text-white">~{fitBreakdown.distanceKm} km</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Proximity Tier:</span>
                  <span className="font-semibold text-white truncate max-w-[120px]">{fitBreakdown.locationStatus}</span>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-slate-400 leading-relaxed border-t border-slate-800/80 pt-2">
                {fitBreakdown.locationNotes}
              </p>
            </div>
          </div>

          {/* "Why this college?" Section */}
          <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Why this college matches your profile
            </h4>
            <div className="space-y-2">
              {whyThisCollege.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                  <span className="leading-relaxed">{reason}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Highlights */}
          <div className="p-5 bg-slate-900/50 border border-slate-800 rounded-xl">
            <h4 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              Branch & Placement Profile
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Total Seats</div>
                <div className="text-base font-bold text-white mt-0.5">{college.totalSeats}</div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Average Package</div>
                <div className="text-base font-bold text-emerald-400 mt-0.5">₹{college.averagePackageLpa} LPA</div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Highest CTC</div>
                <div className="text-base font-bold text-indigo-300 mt-0.5">₹{college.highestPackageLpa} LPA</div>
              </div>
              <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800">
                <div className="text-slate-400 text-[11px]">Accreditation</div>
                <div className="text-base font-bold text-white mt-0.5">{college.nbaAccredited ? 'NBA Accredited' : 'Approved'}</div>
              </div>
            </div>
          </div>

          {/* Explainability Accordion: How is this calculated? */}
          <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/30">
            <button
              onClick={() => setShowFormulaDetails(!showFormulaDetails)}
              className="w-full p-4 flex items-center justify-between text-left text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <span className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-400" />
                How is this calculated? (Mathematical Formula Breakdown)
              </span>
              {showFormulaDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showFormulaDetails && (
              <div className="p-4 border-t border-slate-800 text-xs text-slate-300 space-y-2 bg-slate-950/60">
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-indigo-300 text-[11px]">
                  Overall Fit Score = (Academic Fit × 0.40) + (Career Fit × 0.35) + (Location Fit × 0.25)
                </div>
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-emerald-300 text-[11px]">
                  Computation = ({fitBreakdown.academicFitScore} × 0.40) + ({fitBreakdown.careerFitScore} × 0.35) + ({fitBreakdown.locationFitScore} × 0.25) = {overallFitScore}%
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Unlike conventional cutoff tools that filter solely on past cutoffs, CAREER COMPASS balances your cognitive career assessment and geographical feasibility alongside academic suitability.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            College Code: <span className="font-mono text-slate-400">{college.collegeCode}</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
