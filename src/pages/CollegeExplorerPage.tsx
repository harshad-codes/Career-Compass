import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Building2, 
  BookOpen, 
  Award, 
  Filter, 
  ChevronRight, 
  ExternalLink,
  GraduationCap
} from 'lucide-react';
import { COLLEGES_DATABASE } from '../data/colleges';
import { College, BranchRecord } from '../types/college';
import { PrototypeNotice } from '../components/common/PrototypeNotice';
import { ActivePage } from '../components/layout/Navbar';

interface CollegeExplorerPageProps {
  onNavigate: (page: ActivePage) => void;
}

export const CollegeExplorerPage: React.FC<CollegeExplorerPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);

  // Filter colleges
  const filteredColleges = useMemo(() => {
    return COLLEGES_DATABASE.filter(college => {
      // Search term
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        const matchesName = college.name.toLowerCase().includes(term);
        const matchesCode = college.code.toLowerCase().includes(term);
        const matchesCity = college.city.toLowerCase().includes(term);
        if (!matchesName && !matchesCode && !matchesCity) return false;
      }

      // Branch filter
      if (selectedBranch !== 'All') {
        const hasBranch = college.branches.some(b => b.branchCode === selectedBranch || b.branchId === selectedBranch);
        if (!hasBranch) return false;
      }

      // City filter
      if (selectedCity !== 'All' && college.city !== selectedCity) {
        return false;
      }

      // Type filter
      if (selectedType !== 'All' && college.type !== selectedType) {
        return false;
      }

      return true;
    });
  }, [searchTerm, selectedBranch, selectedCity, selectedType]);

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
            Directory Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">College Explorer</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Browse engineering institutions across Tamil Nadu without requiring a completed profile or assessment.
          </p>
        </div>

        <button
          onClick={() => onNavigate('assessment')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Take Assessment for Fit Scores</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <PrototypeNotice />

      {/* Search & Filter Controls */}
      <div className="p-5 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by college name, code (e.g. 0001), or city..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Branch</label>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Branches</option>
              <option value="CS">CSE (Computer Science)</option>
              <option value="AD">AI & DS (AI & Data Science)</option>
              <option value="IT">IT (Information Technology)</option>
              <option value="EC">ECE (Electronics & Comm)</option>
              <option value="EE">EEE (Electrical & Electronics)</option>
              <option value="ME">MECH (Mechanical)</option>
              <option value="CE">CIVIL (Civil)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">City / Region</label>
            <select
              value={selectedCity}
              onChange={e => setSelectedCity(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Tamil Nadu</option>
              <option value="Chennai">Chennai</option>
              <option value="Chengalpattu">Chengalpattu</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Salem">Salem</option>
              <option value="Tirunelveli">Tirunelveli</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Institution Type</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Institution Types</option>
              <option value="Anna University Dept">Anna University Dept</option>
              <option value="Government">Government</option>
              <option value="Government-Aided">Government-Aided</option>
              <option value="Private Autonomous">Private Autonomous</option>
            </select>
          </div>
        </div>
      </div>

      {/* College List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredColleges.length === 0 ? (
          <div className="col-span-2 p-12 text-center bg-slate-900/50 border border-slate-800 rounded-2xl">
            <Building2 className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-60" />
            <h3 className="text-base font-bold text-white">No colleges match your search criteria</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or search query.</p>
          </div>
        ) : (
          filteredColleges.map(college => (
            <div
              key={college.id}
              className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                    Code: {college.code}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-300">
                    {college.type}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{college.name}</h3>

                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{college.city} ({college.district})</span>
                </div>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {college.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Branches summary */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase">Available Engineering Branches:</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-xs">
                  {college.branches.map(b => (
                    <div key={b.branchId} className="p-2 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px]">
                      <span className="font-bold text-indigo-300">{b.branchCode}</span>
                      <div className="text-slate-400 text-[10px]">Cutoff: {b.sampleCutoff}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Established {college.establishedYear}</span>
                <button
                  onClick={() => setSelectedCollege(college)}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* General College Information Modal if clicked */}
      {selectedCollege && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#0b1329] border border-slate-800 rounded-2xl p-6 space-y-5 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-indigo-400">Code: {selectedCollege.code} • {selectedCollege.type}</span>
                <h3 className="text-xl font-bold text-white mt-1">{selectedCollege.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{selectedCollege.address}</p>
              </div>
              <button
                onClick={() => setSelectedCollege(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Branch Cutoffs & Seat Details</h4>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {selectedCollege.branches.map(b => (
                  <div key={b.branchId} className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{b.branchName} ({b.branchCode})</div>
                      <div className="text-slate-400 text-[11px]">{b.totalSeats} seats • {b.nbaAccredited ? 'NBA Accredited' : 'Approved'}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] text-slate-400">Sample Cutoff</div>
                      <div className="font-extrabold text-indigo-400 text-sm">{b.sampleCutoff} / 200</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedCollege(null)}
                className="px-5 py-2 bg-slate-800 text-white rounded-xl text-xs font-semibold hover:bg-slate-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
