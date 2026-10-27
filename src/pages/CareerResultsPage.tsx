import React from 'react';
import { 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  BrainCircuit, 
  Code2, 
  Cpu, 
  Cog, 
  Building2, 
  Palette, 
  Microscope, 
  Briefcase, 
  FileQuestion,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { storage } from '../utils/storage';
import { ActivePage } from '../components/layout/Navbar';

interface CareerResultsPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CareerResultsPage: React.FC<CareerResultsPageProps> = ({ onNavigate }) => {
  const results = storage.getCareerResults();
  const profile = storage.getProfile();

  if (!results || !results.scores || results.scores.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center space-y-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white">No Assessment Completed Yet</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
          Complete the 10-question career assessment to calculate your cognitive career profile and identify matched engineering branches.
        </p>
        <div className="pt-2">
          <button
            onClick={() => onNavigate('assessment')}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors inline-flex items-center gap-2"
          >
            <span>Start Career Assessment</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  const topMatches = results.scores.slice(0, 3);
  const topCareer = results.topCareer || topMatches[0];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { icon: '🥇', label: 'Top Match', color: 'text-amber-300 bg-amber-500/10 border-amber-500/30' };
    if (rank === 2) return { icon: '🥈', label: 'Strong Match', color: 'text-slate-300 bg-slate-500/10 border-slate-500/30' };
    if (rank === 3) return { icon: '🥉', label: 'Potential Match', color: 'text-amber-600 bg-amber-700/10 border-amber-700/30' };
    return { icon: `#${rank}`, label: 'Match', color: 'text-slate-400 bg-slate-800 border-slate-700' };
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Assessment Complete • Deterministic Trait Profile</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Your Career Profile</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Synthesized from your 10 aptitude questions and {profile?.interests.length || 0} expressed interest areas.
          </p>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all flex-shrink-0"
        >
          <span>Find My Best-Fit Colleges</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Top 3 Ranked Careers */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ranked Career Compatibility</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMatches.map((career) => {
            const badge = getRankBadge(career.rank);
            return (
              <div
                key={career.categoryId}
                className={`p-5 rounded-2xl border transition-all ${
                  career.rank === 1
                    ? 'bg-gradient-to-b from-indigo-950/60 to-slate-900 border-indigo-500/40 shadow-xl'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{badge.icon}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                    {career.score}% Match
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2 leading-snug">{career.title}</h3>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800 mb-3">
                  <div
                    className={`h-full rounded-full ${
                      career.rank === 1 ? 'bg-indigo-500' : career.rank === 2 ? 'bg-violet-500' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${career.score}%` }}
                  />
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <div className="text-[11px] text-slate-500 font-semibold uppercase">Recommended Branches:</div>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {career.recommendedBranches.map(b => (
                      <span key={b} className="px-2 py-0.5 rounded bg-slate-800 text-indigo-300 font-mono text-[10px] border border-slate-700">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep-Dive: Why Top Career? */}
      <div className="p-6 sm:p-8 bg-slate-900/80 border border-slate-800 rounded-3xl space-y-6 shadow-2xl">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 bg-indigo-600/20 text-indigo-400 rounded-xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">Deep-Dive Justification</span>
            <h3 className="text-lg sm:text-xl font-bold text-white">Why {topCareer.title}?</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topCareer.reasons.map((reason, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-start gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-slate-300 leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>

        {/* Academic Marks Context if Profile exists */}
        {profile && (
          <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl text-xs text-indigo-200/90 leading-relaxed">
            <span className="font-semibold text-indigo-300 mr-1">Academic Synergy:</span>
            Your Mathematics score of <span className="font-bold text-white">{profile.mathMark}</span> and overall 12th percentage of <span className="font-bold text-white">{profile.percentage}%</span> reinforce high mathematical rigor required in computational and algorithmic engineering careers.
          </div>
        )}
      </div>

      {/* Recommended Branches Card */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <h3 className="text-base font-bold text-white">Recommended Engineering Branches</h3>
        </div>
        <p className="text-xs text-slate-400">
          Based on your career match in {topCareer.title}, target these specialized undergraduate disciplines during counseling:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {results.recommendedBranches.map((b) => (
            <div key={b} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono text-sm font-bold text-indigo-400">{b}</span>
                <div className="text-xs text-slate-300 mt-0.5">
                  {b === 'CSE' ? 'Computer Science & Engg' :
                   b === 'IT' ? 'Information Technology' :
                   b === 'AIDS' ? 'AI & Data Science' :
                   b === 'ECE' ? 'Electronics & Comm Engg' :
                   b === 'MECH' ? 'Mechanical Engineering' : 'Core Engineering'}
                </div>
              </div>
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-6 bg-gradient-to-r from-indigo-950/50 via-slate-900 to-indigo-950/50 border border-indigo-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to explore matched Tamil Nadu colleges?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            We will calculate your 40% Academic + 35% Career + 25% Location fit scores across all institutions.
          </p>
        </div>

        <button
          onClick={() => onNavigate('recommendations')}
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
        >
          <span>Find My Best-Fit Colleges</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
