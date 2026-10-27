import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, 
  GraduationCap, 
  MapPin, 
  Heart, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Info,
  BookOpen
} from 'lucide-react';
import { 
  StudentProfile, 
  ProfileValidationErrors, 
  AVAILABLE_BRANCHES, 
  AVAILABLE_LOCATIONS, 
  DISTANCE_OPTIONS, 
  AVAILABLE_INTERESTS 
} from '../types/student';
import { storage } from '../utils/storage';
import { ActivePage } from '../components/layout/Navbar';

interface ProfilePageProps {
  onNavigate: (page: ActivePage) => void;
  onProfileSaved?: (profile: StudentProfile) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigate, onProfileSaved }) => {
  const existingProfile = storage.getProfile();

  const [formData, setFormData] = useState<StudentProfile>({
    name: existingProfile?.name || '',
    email: existingProfile?.email || '',
    percentage: existingProfile?.percentage ?? 0,
    mathMark: existingProfile?.mathMark ?? 0,
    physicsMark: existingProfile?.physicsMark ?? 0,
    chemistryMark: existingProfile?.chemistryMark ?? 0,
    preferredBranches: existingProfile?.preferredBranches || [],
    preferredLocation: existingProfile?.preferredLocation || 'Chennai',
    maxDistance: existingProfile?.maxDistance ?? 50,
    interests: existingProfile?.interests || [],
    isDemo: existingProfile?.isDemo ?? false,
  });

  const [errors, setErrors] = useState<ProfileValidationErrors>({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if demo or external load happens
  useEffect(() => {
    const handleStorage = () => {
      const p = storage.getProfile();
      if (p) {
        setFormData(p);
      }
    };
    window.addEventListener('storage-update', handleStorage);
    return () => window.removeEventListener('storage-update', handleStorage);
  }, []);

  // Calculate Profile Completion Rate
  const completionPercentage = useMemo(() => {
    let completedFields = 0;
    const totalFields = 8;

    if (formData.name.trim()) completedFields++;
    if (formData.email.trim() && formData.email.includes('@')) completedFields++;
    if (formData.percentage > 0 && formData.percentage <= 100) completedFields++;
    if (formData.mathMark > 0 && formData.mathMark <= 100) completedFields++;
    if (formData.physicsMark > 0 && formData.physicsMark <= 100) completedFields++;
    if (formData.chemistryMark > 0 && formData.chemistryMark <= 100) completedFields++;
    if (formData.preferredBranches.length > 0) completedFields++;
    if (formData.interests.length > 0) completedFields++;

    return Math.round((completedFields / totalFields) * 100);
  }, [formData]);

  const validate = (): boolean => {
    const errs: ProfileValidationErrors = {};

    if (!formData.name.trim()) {
      errs.name = 'Please enter your full name.';
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Please enter a valid email address.';
    }

    if (formData.percentage <= 0 || formData.percentage > 100) {
      errs.percentage = 'Percentage must be between 1 and 100.';
    }

    if (formData.mathMark < 0 || formData.mathMark > 100) {
      errs.mathMark = 'Please enter a valid mark between 0 and 100.';
    }

    if (formData.physicsMark < 0 || formData.physicsMark > 100) {
      errs.physicsMark = 'Please enter a valid mark between 0 and 100.';
    }

    if (formData.chemistryMark < 0 || formData.chemistryMark > 100) {
      errs.chemistryMark = 'Please enter a valid mark between 0 and 100.';
    }

    if (formData.preferredBranches.length === 0) {
      errs.preferredBranches = 'Select at least one preferred engineering branch.';
    }

    if (formData.interests.length === 0) {
      errs.interests = 'Select at least one area of interest.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBranchToggle = (branchName: string) => {
    setFormData(prev => {
      const exists = prev.preferredBranches.includes(branchName);
      const updated = exists
        ? prev.preferredBranches.filter(b => b !== branchName)
        : [...prev.preferredBranches, branchName];
      return { ...prev, preferredBranches: updated };
    });
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => {
      const exists = prev.interests.includes(interest);
      const updated = exists
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    storage.setProfile(formData);
    if (onProfileSaved) onProfileSaved(formData);
    setSaveSuccess(true);

    setTimeout(() => {
      setSaveSuccess(false);
      // If assessment answers already exist, can go to recommendations; otherwise assessment
      const hasAssessment = storage.getAssessmentAnswers();
      if (hasAssessment) {
        onNavigate('recommendations');
      } else {
        onNavigate('assessment');
      }
    }, 900);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Student Profile</h1>
            {formData.isDemo && (
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase">
                Demonstration Data
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Provide your 12th standard marks, preferred branches, and geographical limits to power the matching engine.
          </p>
        </div>

        {/* Profile Completion Meter */}
        <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-xl flex items-center gap-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">Profile Completion</div>
            <div className="text-sm font-extrabold text-indigo-400">{completionPercentage}%</div>
          </div>
          <div className="w-10 h-10 rounded-full border-2 border-slate-700 flex items-center justify-center relative">
            <div 
              className="absolute inset-0 rounded-full border-2 border-indigo-500" 
              style={{ clipPath: `polygon(0 0, 100% 0, 100% ${completionPercentage}%, 0 ${completionPercentage}%)` }} 
            />
            <span className="text-[10px] font-bold text-white">{completionPercentage}%</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Personal Information */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <User className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Harsh"
                className={`w-full bg-slate-950 border ${errors.name ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Email Address <span className="text-rose-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. harsh@example.com"
                className={`w-full bg-slate-950 border ${errors.email ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Academic Information */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Academic Performance (12th Standard)</h2>
            </div>
            <div className="text-[11px] text-slate-400">
              TNEA Cutoff Calculated: <span className="font-bold text-indigo-300">
                {formData.mathMark > 0 ? (Number(formData.mathMark) + Number(formData.physicsMark) / 2 + Number(formData.chemistryMark) / 2).toFixed(2) : '—'} / 200
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                12th Percentage (%) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.percentage || ''}
                onChange={e => setFormData({ ...formData, percentage: parseFloat(e.target.value) || 0 })}
                placeholder="97.5"
                className={`w-full bg-slate-950 border ${errors.percentage ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.percentage && <p className="text-[11px] text-rose-400 mt-1">{errors.percentage}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Mathematics Mark (0-100) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.mathMark || ''}
                onChange={e => setFormData({ ...formData, mathMark: parseInt(e.target.value) || 0 })}
                placeholder="98"
                className={`w-full bg-slate-950 border ${errors.mathMark ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.mathMark && <p className="text-[11px] text-rose-400 mt-1">{errors.mathMark}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Physics Mark (0-100) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.physicsMark || ''}
                onChange={e => setFormData({ ...formData, physicsMark: parseInt(e.target.value) || 0 })}
                placeholder="95"
                className={`w-full bg-slate-950 border ${errors.physicsMark ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.physicsMark && <p className="text-[11px] text-rose-400 mt-1">{errors.physicsMark}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Chemistry Mark (0-100) <span className="text-rose-400">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.chemistryMark || ''}
                onChange={e => setFormData({ ...formData, chemistryMark: parseInt(e.target.value) || 0 })}
                placeholder="96"
                className={`w-full bg-slate-950 border ${errors.chemistryMark ? 'border-rose-500' : 'border-slate-800'} rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500`}
              />
              {errors.chemistryMark && <p className="text-[11px] text-rose-400 mt-1">{errors.chemistryMark}</p>}
            </div>
          </div>
        </div>

        {/* Section 3: Preferred Branches (Multi-select) */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Preferred Engineering Branches</h2>
            </div>
            <span className="text-xs text-slate-400">Select all that interest you</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AVAILABLE_BRANCHES.map(branch => {
              const isSelected = formData.preferredBranches.includes(branch.name);
              return (
                <button
                  type="button"
                  key={branch.id}
                  onClick={() => handleBranchToggle(branch.name)}
                  className={`p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-mono font-bold text-[10px] text-indigo-400">
                      {branch.code}
                    </span>
                    <span className="leading-snug">{branch.name}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>
          {errors.preferredBranches && <p className="text-[11px] text-rose-400">{errors.preferredBranches}</p>}
        </div>

        {/* Section 4: Location & Distance Preference */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <MapPin className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Geographical Preferences</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Preferred City / Region in Tamil Nadu
              </label>
              <select
                value={formData.preferredLocation}
                onChange={e => setFormData({ ...formData, preferredLocation: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {AVAILABLE_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Maximum Travel Distance
              </label>
              <select
                value={formData.maxDistance}
                onChange={e => setFormData({ ...formData, maxDistance: parseInt(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                {DISTANCE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 5: Student Interests (Multi-select) */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-indigo-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Core Personal Interests</h2>
            </div>
            <span className="text-xs text-slate-400">Select all that apply</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {AVAILABLE_INTERESTS.map(interest => {
              const isSelected = formData.interests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-indigo-600/20 border-indigo-500 text-white'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <span>{interest}</span>
                  {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </div>
          {errors.interests && <p className="text-[11px] text-rose-400">{errors.interests}</p>}
        </div>

        {/* Save & Continue Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
          <div className="text-xs text-slate-500">
            * All data is preserved client-side in localStorage. No sensitive personal data is transmitted.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2 transition-all"
            >
              <span>{saveSuccess ? 'Profile Saved ✓' : 'Save Profile & Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
