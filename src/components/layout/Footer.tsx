import React from 'react';
import { Compass, ShieldCheck, Heart } from 'lucide-react';
import { PrototypeNotice } from '../common/PrototypeNotice';
import { ActivePage } from './Navbar';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#040714] border-t border-slate-800/80 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Prototype Disclaimer Banner */}
        <PrototypeNotice />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <Compass className="w-4 h-4 text-white" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">CAREER COMPASS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A Software Engineering college project prototype providing personalized career and engineering college guidance for 12th standard students in Tamil Nadu.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Academic Fit (40%) + Career Fit (35%) + Location Fit (25%) = Personalized College Fit
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li><button onClick={() => onNavigate('home')} className="hover:text-indigo-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('assessment')} className="hover:text-indigo-400 transition-colors">Career Assessment</button></li>
              <li><button onClick={() => onNavigate('recommendations')} className="hover:text-indigo-400 transition-colors">My Best-Fit Colleges</button></li>
              <li><button onClick={() => onNavigate('map')} className="hover:text-indigo-400 transition-colors">Tamil Nadu College Map</button></li>
              <li><button onClick={() => onNavigate('explorer')} className="hover:text-indigo-400 transition-colors">College Directory</button></li>
              <li><button onClick={() => onNavigate('compare')} className="hover:text-indigo-400 transition-colors">Compare Colleges</button></li>
            </ul>
          </div>

          {/* Project Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Technical Architecture</h4>
            <div className="space-y-1.5 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero External API Dependencies</span>
              </div>
              <div>• 100% Offline-First Local Data</div>
              <div>• Deterministic Scoring Algorithm</div>
              <div>• Native SVG Tamil Nadu Geometry</div>
              <div>• Client-Side Persistence</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} CAREER COMPASS. Software Engineering Project Prototype.
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered for 12th Standard Students in Tamil Nadu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
