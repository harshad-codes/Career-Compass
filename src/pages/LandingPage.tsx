import React from 'react';
import { 
  Compass, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  MapPin, 
  BookOpen, 
  Brain, 
  Target, 
  Layers, 
  CheckCircle2, 
  ShieldAlert,
  Search
} from 'lucide-react';
import { ActivePage } from '../components/layout/Navbar';

interface LandingPageProps {
  onNavigate: (page: ActivePage) => void;
  onLoadDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onLoadDemo }) => {
  return (
    <div className="space-y-16 py-8 sm:py-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 md:py-20 text-center">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-indigo-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/4 right-1/4 w-[350px] h-[250px] bg-violet-600/15 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Personalized Geographical College Matching System</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
            CAREER <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300">COMPASS</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl sm:text-2xl font-bold text-slate-200">
            "Find the Right Career. Choose the Right College."
          </p>

          {/* Supporting Text */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Personalized career and college guidance for 12th standard students in Tamil Nadu based on your interests, academic profile, and location.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onNavigate('profile')}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-xl shadow-indigo-600/30 flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onLoadDemo}
              className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-amber-300 border border-amber-500/40 hover:border-amber-400 shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5 transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Try Demo Mode</span>
            </button>

            <button
              onClick={() => onNavigate('explorer')}
              className="px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-slate-900/70 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-600 flex items-center gap-2 transition-all"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span>Explore Colleges</span>
            </button>
          </div>
        </div>
      </section>

      {/* Visual Step-by-Step Flow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="p-6 sm:p-8 bg-slate-900/70 border border-slate-800 rounded-3xl backdrop-blur-md shadow-2xl">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">The Student Journey</span>
            <h2 className="text-lg sm:text-xl font-bold text-white mt-1">How CAREER COMPASS Guides You</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 relative">
            {[
              { step: '1', title: 'PROFILE', desc: '12th Marks & City Preference', icon: GraduationCap },
              { step: '2', title: 'ASSESSMENT', desc: '10-Question Aptitude & Traits', icon: Brain },
              { step: '3', title: 'CAREER MATCH', desc: 'Ranked Career Fields', icon: Target },
              { step: '4', title: 'COLLEGE MATCH', desc: '40/35/25 Fit Formulation', icon: Layers },
              { step: '5', title: 'LOCATION', desc: 'Interactive Tamil Nadu Map', icon: MapPin },
            ].map((st, i) => {
              const Icon = st.icon;
              return (
                <div key={st.step} className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col items-center text-center relative group hover:border-indigo-500/40 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-xs mb-2.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400">STEP {st.step}</span>
                  <h4 className="text-xs font-bold text-white tracking-wide mt-0.5">{st.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why CAREER COMPASS? 3 Fit Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Multi-Dimensional Evaluation</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Why CAREER COMPASS?</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl mx-auto">
            Traditional tools only check if your marks meet cutoffs. CAREER COMPASS balances all three foundational pillars for long-term collegiate success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Academic Fit */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center mb-4 text-indigo-400">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 bg-indigo-500/20 text-indigo-300 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
              Weight: 40%
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Academic Fit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find colleges and branches that match your academic performance. Compares your 12th PCM marks against prototype historical cutoffs without unrealistic admission promises.
            </p>
          </div>

          {/* Card 2: Career Fit */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center mb-4 text-violet-400">
              <Brain className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 bg-violet-500/20 text-violet-300 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
              Weight: 35%
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Career Fit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Discover careers and branches aligned with your interests and assessment. Connects your cognitive strengths directly to specialized engineering fields like CSE, AI&DS, ECE, or Mechanical.
            </p>
          </div>

          {/* Card 3: Location Fit */}
          <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl hover:border-indigo-500/40 transition-all hover:-translate-y-1 shadow-xl">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4 text-cyan-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="inline-block px-2.5 py-0.5 bg-cyan-500/20 text-cyan-300 rounded-md text-[10px] font-bold uppercase tracking-wider mb-2">
              Weight: 25%
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Location Fit</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find suitable colleges within your preferred geographical area. Uses native Tamil Nadu coordinate mapping to evaluate realistic daily travel and hostel distances without external paid APIs.
            </p>
          </div>
        </div>
      </section>

      {/* Highlighted Smart Matching Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-[#0c142b] border border-indigo-500/40 rounded-3xl shadow-2xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 relative z-10 text-center sm:text-left">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Our Core Philosophical Principle
            </span>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Our Smart Matching System
            </h2>

            <blockquote className="text-base sm:text-lg text-slate-200 font-medium italic border-l-2 border-indigo-500 pl-4 py-1">
              "CAREER COMPASS combines academic suitability, career compatibility, and location preference to identify colleges that fit you — not just colleges you may qualify for."
            </blockquote>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Qualifying for an engineering college does not guarantee it aligns with your natural career interests or daily lifestyle. By combining cutoffs, aptitude, and travel metrics into one explainable formula, students make informed, long-term educational decisions.
            </p>

            <div className="pt-3 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => onNavigate('profile')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
              >
                <span>Build Your Profile Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onLoadDemo}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold transition-colors"
              >
                Inspect Sample Student (Harsh - 97.5%)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
