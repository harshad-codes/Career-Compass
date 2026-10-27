import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, 
  GraduationCap, 
  Award, 
  MapPin, 
  Scale, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  BookOpen,
  Compass,
  FileText,
  Map,
  Layers
} from 'lucide-react';
import { storage } from '../utils/storage';
import { COLLEGE_BRANCH_RECORDS } from '../data/colleges';
import { getBestFitColleges } from '../utils/recommendationEngine';
import { CollegeRecommendation } from '../types/recommendation';
import { ScoreMeter } from '../components/common/ScoreMeter';
import { PrototypeNotice } from '../components/common/PrototypeNotice';
import { ActivePage } from '../components/layout/Navbar';

interface DashboardPageProps {
  onNavigate: (page: ActivePage) => void;
  onLoadDemo: () => void;
  onResetDemo: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  onNavigate,
  onLoadDemo,
  onResetDemo
}) => {
  const [profile, setProfile] = useState(storage.getProfile());
  const [careerResults, setCareerResults] = useState(storage.getCareerResults());
  const [comparisonCount, setComparisonCount] = useState(storage.getComparisonList().length);

  useEffect(() => {
    const handleStorage = () => {
      setProfile(storage.getProfile());
      setCareerResults(storage.getCareerResults());
      setComparisonCount(storage.getComparisonList().length);
    };
    window.addEventListener('storage-update', handleStorage);
    return () => window.removeEventListener('storage-update', handleStorage);
  }, []);

  // Compute profile completion percentage
  const profileCompletion = useMemo(() => {
    if (!profile) return 0;
    let count = 0;
    if (profile.name) count++;
    if (profile.email) count++;
    if (profile.percentage > 0) count++;
    if (profile.mathMark > 0) count++;
    if (profile.physicsMark > 0) count++;
    if (profile.chemistryMark > 0) count++;
    if (profile.preferredBranches?.length > 0) count++;
    if (profile.interests?.length > 0) count++;
    return Math.round((count / 8) * 100);
  }, [profile]);

  // Recommendations
  const recommendations: CollegeRecommendation[] = useMemo(() => {
    if (!profile) return [];
    return getBestFitColleges(COLLEGE_BRANCH_RECORDS, profile, careerResults);
  }, [profile, careerResults]);

  const topThree = recommendations.slice(0, 3);
  const bestFit = recommendations[0];

  if (!profile) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">Welcome to CAREER COMPASS</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Create your profile to calculate customized engineering recommendations, or launch Demo Mode to explore with sample student data.
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
            onClick={onLoadDemo}
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-950/70 via-slate-900 to-[#0c142d] border border-indigo-500/30 rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
              Student Control Center
            </span>
            {profile.isDemo && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Demonstration Profile
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome, {profile.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            12th Aggregate: <span className="font-bold text-white">{profile.percentage}%</span> • Preferred City: <span className="font-bold text-white">{profile.preferredLocation}</span> • Distance Limit: <span className="font-bold text-white">{profile.maxDistance === 9999 ? 'Anywhere' : `${profile.maxDistance} km`}</span>
          </p>
        </div>

        {/* Status Indicators */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Profile Completion */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl text-center min-w-[110px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Profile</div>
            <div className="text-lg font-black text-indigo-400 mt-0.5">{profileCompletion}%</div>
            <div className="text-[10px] text-emerald-400 flex items-center justify-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3 h-3" />
              <span>Complete</span>
            </div>
          </div>

          {/* Assessment Status */}
          <div className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl text-center min-w-[120px]">
            <div className="text-[10px] uppercase font-bold text-slate-400">Assessment</div>
            <div className="text-lg font-black text-indigo-400 mt-0.5">
              {careerResults ? '10 / 10' : 'Pending'}
            </div>
            <div className="text-[10px] text-indigo-300 mt-0.5">
              {careerResults ? 'Scored ✓' : '10 Questions'}
            </div>
          </div>
        </div>
      </div>

      <PrototypeNotice compact />

      {/* Highlights Cards: Top Career, Top Branch, Overall Benchmark */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Top Career */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Top Career</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base font-bold text-white leading-tight">
            {careerResults?.topCareer?.title || 'Software Engineering'}
          </div>
          <div className="text-xs text-emerald-400 font-semibold">
            {careerResults?.topCareer?.score ? `${careerResults.topCareer.score}% Trait Match` : 'Calculated after assessment'}
          </div>
        </div>

        {/* Top Branch */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Top Branch</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-base font-bold text-white leading-tight">
            Computer Science & Engg
          </div>
          <div className="text-xs text-indigo-300">
            Preferred & Assessment Aligned
          </div>
        </div>

        {/* Student Cutoff */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">TNEA Cutoff Index</span>
            <GraduationCap className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-base font-bold text-white leading-tight">
            {profile.mathMark ? (Number(profile.mathMark) + Number(profile.physicsMark)/2 + Number(profile.chemistryMark)/2).toFixed(2) : '—'} / 200
          </div>
          <div className="text-xs text-slate-400">
            M: {profile.mathMark} | P: {profile.physicsMark} | C: {profile.chemistryMark}
          </div>
        </div>

        {/* Comparison List */}
        <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Compared</span>
            <Scale className="w-4 h-4 text-violet-400" />
          </div>
          <div className="text-base font-bold text-white leading-tight">
            {comparisonCount} of 3 Colleges
          </div>
          <button
            onClick={() => onNavigate('compare')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View Comparison</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Fit Score Benchmarks if Best Fit exists */}
      {bestFit && (
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-indigo-400" />
              <h2 className="text-base font-bold text-white">Your CAREER COMPASS Benchmark Scores</h2>
            </div>
            <span className="text-xs text-indigo-400 font-mono">Weighted: 40% / 35% / 25%</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase">Academic Fit</div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{bestFit.fitBreakdown.academicFitScore}%</div>
              <div className="text-[11px] text-slate-400 mt-1">Weight: 40%</div>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase">Career Fit</div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{bestFit.fitBreakdown.careerFitScore}%</div>
              <div className="text-[11px] text-slate-400 mt-1">Weight: 35%</div>
            </div>

            <div className="p-4 bg-slate-950/70 rounded-2xl border border-slate-800 text-center">
              <div className="text-xs font-semibold text-slate-400 uppercase">Location Fit</div>
              <div className="text-2xl font-black text-indigo-400 mt-1">{bestFit.fitBreakdown.locationFitScore}%</div>
              <div className="text-[11px] text-slate-400 mt-1">Weight: 25%</div>
            </div>
          </div>
        </div>
      )}

      {/* Top 3 Best-Fit Colleges Summary */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">Top 3 Recommended Colleges</h2>
          </div>
          <button
            onClick={() => onNavigate('recommendations')}
            className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
          >
            <span>View All ({recommendations.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topThree.map((rec, index) => (
            <div
              key={rec.id}
              className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-3 hover:border-indigo-500/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                    Rank #{index + 1}
                  </span>
                  <span className="text-xs font-black text-emerald-400">{rec.overallFitScore}% Fit</span>
                </div>

                <h3 className="text-sm font-bold text-white leading-snug">{rec.college.collegeName}</h3>

                <div className="text-xs text-slate-400 space-y-1">
                  <div>• Branch: <span className="text-white font-medium">{rec.college.branchName}</span></div>
                  <div>• City: <span className="text-white">{rec.college.city} (~{rec.fitBreakdown.distanceKm} km)</span></div>
                  <div>• Sample Cutoff: <span className="text-white font-semibold">{rec.college.sampleCutoff}</span></div>
                </div>
              </div>

              <button
                onClick={() => onNavigate('recommendations')}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold transition-colors mt-2"
              >
                Inspect Fit Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions Panel */}
      <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-3xl space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <button
            onClick={() => onNavigate('assessment')}
            className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 text-center transition-colors"
          >
            <FileText className="w-5 h-5 text-indigo-400" />
            <span>Retake Assessment</span>
          </button>

          <button
            onClick={() => onNavigate('profile')}
            className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 text-center transition-colors"
          >
            <User className="w-5 h-5 text-indigo-400" />
            <span>Update Profile</span>
          </button>

          <button
            onClick={() => onNavigate('recommendations')}
            className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 text-center transition-colors"
          >
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>Best-Fit Colleges</span>
          </button>

          <button
            onClick={() => onNavigate('map')}
            className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 text-center transition-colors"
          >
            <Map className="w-5 h-5 text-indigo-400" />
            <span>Open College Map</span>
          </button>

          <button
            onClick={() => onNavigate('compare')}
            className="p-3 bg-slate-950/70 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-medium text-slate-200 flex flex-col items-center gap-2 text-center transition-colors"
          >
            <Scale className="w-5 h-5 text-indigo-400" />
            <span>Compare Colleges</span>
          </button>
        </div>
      </div>
    </div>
  );
};
