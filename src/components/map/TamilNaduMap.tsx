import React, { useState, useMemo } from 'react';
import { CollegeRecommendation, RecommendationTier } from '../../types/recommendation';
import { TAMIL_NADU_CITIES, projectLatLngToSvg } from '../../data/locations';
import { MapPin, Navigation, Compass, Filter, Info, Award, BookOpen } from 'lucide-react';

interface TamilNaduMapProps {
  recommendations: CollegeRecommendation[];
  onSelectRecommendation: (rec: CollegeRecommendation) => void;
  selectedBranchFilter?: string;
  selectedTierFilter?: string;
  selectedDistanceFilter?: string;
  selectedLocationFilter?: string;
}

export const TamilNaduMap: React.FC<TamilNaduMapProps> = ({
  recommendations,
  onSelectRecommendation,
}) => {
  // Local filter states
  const [branchFilter, setBranchFilter] = useState<string>('All');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [distanceFilter, setDistanceFilter] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');

  const [hoveredRec, setHoveredRec] = useState<CollegeRecommendation | null>(null);

  // Filter recommendations based on active filters
  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(rec => {
      // Branch filter
      if (branchFilter !== 'All') {
        const branchCode = rec.college.branchCode.toUpperCase();
        const branchId = rec.college.branchId.toUpperCase();
        const filter = branchFilter.toUpperCase();
        if (filter === 'AI & DS' && branchId !== 'AIDS') return false;
        if (filter === 'CSE' && branchId !== 'CSE') return false;
        if (filter === 'IT' && branchId !== 'IT') return false;
        if (filter === 'ECE' && branchId !== 'ECE') return false;
        if (filter === 'EEE' && branchId !== 'EEE') return false;
        if (filter === 'MECHANICAL' && branchId !== 'MECH') return false;
        if (filter === 'CIVIL' && branchId !== 'CIVIL') return false;
      }

      // Tier filter
      if (tierFilter !== 'All') {
        if (tierFilter === 'Best Fit' && rec.tier !== 'BEST_FIT') return false;
        if (tierFilter === 'Possible Fit' && rec.tier !== 'POSSIBLE_FIT') return false;
        if (tierFilter === 'Low Fit' && rec.tier !== 'LOW_FIT') return false;
      }

      // Distance filter
      if (distanceFilter !== 'All') {
        const dist = rec.fitBreakdown.distanceKm;
        if (distanceFilter === 'Within 25 km' && dist > 25) return false;
        if (distanceFilter === 'Within 50 km' && dist > 50) return false;
        if (distanceFilter === 'Within 100 km' && dist > 100) return false;
      }

      // Location filter
      if (cityFilter !== 'All') {
        if (cityFilter === 'Trichy' && rec.college.city !== 'Tiruchirappalli') return false;
        else if (cityFilter !== 'Trichy' && rec.college.city !== cityFilter) return false;
      }

      return true;
    });
  }, [recommendations, branchFilter, tierFilter, distanceFilter, cityFilter]);

  // Projected marker coordinates
  const markersWithCoords = useMemo(() => {
    return filteredRecommendations.map(rec => {
      const coords = projectLatLngToSvg(rec.college.latitude, rec.college.longitude);
      return {
        rec,
        x: coords.x,
        y: coords.y
      };
    });
  }, [filteredRecommendations]);

  const getMarkerColor = (tier: RecommendationTier) => {
    if (tier === 'BEST_FIT') return { fill: '#10b981', ring: 'rgba(16, 185, 129, 0.4)', text: 'text-emerald-400' };
    if (tier === 'POSSIBLE_FIT') return { fill: '#f59e0b', ring: 'rgba(245, 158, 11, 0.4)', text: 'text-amber-400' };
    return { fill: '#f43f5e', ring: 'rgba(244, 63, 94, 0.4)', text: 'text-rose-400' };
  };

  return (
    <div className="space-y-6">
      {/* Map Control / Filter Bar */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Map Filters</h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {filteredRecommendations.length} Colleges Displayed
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Branch Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Branch</label>
            <select
              value={branchFilter}
              onChange={e => setBranchFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Branches</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AI & DS">AI & DS</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
            </select>
          </div>

          {/* Recommendation Tier */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Recommendation</label>
            <select
              value={tierFilter}
              onChange={e => setTierFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Tiers</option>
              <option value="Best Fit">🟢 Best Fit (≥ 85%)</option>
              <option value="Possible Fit">🟡 Possible Fit (70-84%)</option>
              <option value="Low Fit">🔴 Low Fit (&lt; 70%)</option>
            </select>
          </div>

          {/* Distance Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Distance</label>
            <select
              value={distanceFilter}
              onChange={e => setDistanceFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Distances</option>
              <option value="Within 25 km">Within 25 km</option>
              <option value="Within 50 km">Within 50 km</option>
              <option value="Within 100 km">Within 100 km</option>
            </select>
          </div>

          {/* Location / City Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Location</label>
            <select
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All Tamil Nadu</option>
              <option value="Chennai">Chennai</option>
              <option value="Coimbatore">Coimbatore</option>
              <option value="Madurai">Madurai</option>
              <option value="Trichy">Trichy</option>
              <option value="Salem">Salem</option>
              <option value="Vellore">Vellore</option>
            </select>
          </div>
        </div>
      </div>

      {/* Map + Detail Side Panel Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* SVG Map Canvas */}
        <div className="lg:col-span-8 p-4 md:p-6 bg-slate-900/90 border border-slate-800 rounded-2xl relative shadow-2xl overflow-hidden min-h-[520px] flex flex-col items-center justify-center">
          {/* Map Compass Rose & Legend */}
          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
            <div className="flex items-center gap-2 p-2 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-xs text-slate-300">
              <Compass className="w-4 h-4 text-indigo-400 animate-spin-slow" />
              <span className="font-semibold text-[11px]">Tamil Nadu Geographical View</span>
            </div>

            <div className="p-2.5 bg-slate-950/80 backdrop-blur-md rounded-xl border border-slate-800 text-[11px] space-y-1.5 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
                <span className="text-slate-300">Best Fit (≥85%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50"></span>
                <span className="text-slate-300">Possible Fit (70-84%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
                <span className="text-slate-300">Low Fit (&lt;70%)</span>
              </div>
            </div>
          </div>

          {/* No matches overlay */}
          {markersWithCoords.length === 0 && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 bg-slate-950/85 backdrop-blur-sm text-center">
              <Info className="w-10 h-10 text-indigo-400 mb-3" />
              <h4 className="text-base font-bold text-white mb-1">No colleges match your current filters</h4>
              <p className="text-xs text-slate-400 max-w-sm">
                Try increasing your distance limit, clearing branch constraints, or selecting "All Tamil Nadu" to view colleges.
              </p>
              <button
                onClick={() => {
                  setBranchFilter('All');
                  setTierFilter('All');
                  setDistanceFilter('All');
                  setCityFilter('All');
                }}
                className="mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* The Local SVG Map of Tamil Nadu */}
          <div className="w-full max-w-[480px] aspect-[500/580] relative">
            <svg
              viewBox="0 0 500 580"
              className="w-full h-full filter drop-shadow-2xl select-none"
            >
              <defs>
                <linearGradient id="tnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#0f172a" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#172554" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="coastGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
                </linearGradient>

                <filter id="glow-marker" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Bay of Bengal / Indian Ocean subtle coastal water styling */}
              <path
                d="M 430,30 Q 480,150 470,290 T 430,420 Q 350,540 220,570 L 500,570 L 500,0 L 410,0 Z"
                fill="url(#coastGradient)"
                opacity="0.3"
              />

              {/* Realistic Stylized Boundary Path of Tamil Nadu */}
              <path
                d="M 425,45 
                   C 435,55 440,75 428,95 
                   C 420,115 410,140 405,170 
                   C 400,200 410,230 420,250 
                   C 428,270 415,295 385,310 
                   C 360,325 350,340 370,360 
                   C 390,380 380,410 320,430 
                   C 280,445 250,470 230,500 
                   C 210,530 195,560 170,565 
                   C 155,568 145,540 145,510 
                   C 145,480 135,450 120,420 
                   C 105,390 100,360 85,330 
                   C 70,300 65,270 80,240 
                   C 95,210 110,195 130,185 
                   C 150,175 165,150 180,130 
                   C 195,110 220,95 250,85 
                   C 280,75 320,65 350,55 
                   C 380,45 405,35 425,45 Z"
                fill="url(#tnGradient)"
                stroke="#6366f1"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />

              {/* Internal Regional Boundary Lines (Subtle) */}
              <path
                d="M 230,200 Q 280,220 330,210"
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.4"
                fill="none"
              />
              <path
                d="M 170,320 Q 250,330 330,340"
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.4"
                fill="none"
              />
              <path
                d="M 180,430 Q 240,440 280,435"
                stroke="#475569"
                strokeWidth="1"
                strokeDasharray="3 3"
                opacity="0.4"
                fill="none"
              />

              {/* Major Cities Anchors & Labels */}
              {Object.values(TAMIL_NADU_CITIES).map(city => (
                <g key={city.name} className="pointer-events-none">
                  <circle
                    cx={city.svgX}
                    cy={city.svgY}
                    r="3"
                    fill="#94a3b8"
                    opacity="0.7"
                  />
                  <text
                    x={city.svgX + 6}
                    y={city.svgY + 3}
                    fill="#94a3b8"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                    className="select-none tracking-wider"
                    opacity="0.75"
                  >
                    {city.name}
                  </text>
                </g>
              ))}

              {/* College Markers */}
              {markersWithCoords.map(({ rec, x, y }) => {
                const color = getMarkerColor(rec.tier);
                const isHovered = hoveredRec?.id === rec.id;

                return (
                  <g
                    key={rec.id}
                    className="cursor-pointer transition-transform duration-200 ease-out"
                    transform={`translate(${x}, ${y})`}
                    onClick={() => onSelectRecommendation(rec)}
                    onMouseEnter={() => setHoveredRec(rec)}
                    onMouseLeave={() => setHoveredRec(null)}
                  >
                    {/* Pulsing ring for Best Fit */}
                    {rec.tier === 'BEST_FIT' && (
                      <circle
                        r="14"
                        fill="none"
                        stroke={color.fill}
                        strokeWidth="1.5"
                        opacity="0.5"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer Glow Halo */}
                    <circle
                      r={isHovered ? 13 : 9}
                      fill={color.ring}
                      className="transition-all duration-200"
                    />

                    {/* Inner Core Circle */}
                    <circle
                      r={isHovered ? 8 : 6}
                      fill={color.fill}
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2 : 1.5}
                      className="transition-all duration-200 shadow-md"
                    />

                    {/* College Code / Branch Mini Label if hovered */}
                    {isHovered && (
                      <g transform="translate(0, -16)">
                        <rect
                          x="-45"
                          y="-16"
                          width="90"
                          height="18"
                          rx="4"
                          fill="#0f172a"
                          stroke={color.fill}
                          strokeWidth="1"
                        />
                        <text
                          x="0"
                          y="-4"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="Inter, sans-serif"
                        >
                          {rec.college.branchCode} • {rec.overallFitScore}%
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="text-[11px] text-slate-500 mt-2 text-center">
            Click any marker to open comprehensive college fit breakdown • Hover for snapshot
          </div>
        </div>

        {/* Interactive Quick Preview Card (Side Panel) */}
        <div className="lg:col-span-4 space-y-4">
          {hoveredRec ? (
            <div className="p-5 bg-slate-900 border border-indigo-500/40 rounded-2xl shadow-xl space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                  hoveredRec.tier === 'BEST_FIT' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  hoveredRec.tier === 'POSSIBLE_FIT' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  {hoveredRec.tierLabel} • {hoveredRec.overallFitScore}%
                </span>
                <span className="text-xs text-slate-400 font-mono">Code {hoveredRec.college.collegeCode}</span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white leading-snug">
                  {hoveredRec.college.collegeName}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{hoveredRec.college.city} (~{hoveredRec.fitBreakdown.distanceKm} km)</span>
                </div>
              </div>

              <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Branch:</span>
                  <span className="font-semibold text-white">{hoveredRec.college.branchName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Academic Fit:</span>
                  <span className="font-semibold text-indigo-300">{hoveredRec.fitBreakdown.academicFitScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Career Fit:</span>
                  <span className="font-semibold text-indigo-300">{hoveredRec.fitBreakdown.careerFitScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Location Fit:</span>
                  <span className="font-semibold text-indigo-300">{hoveredRec.fitBreakdown.locationFitScore}%</span>
                </div>
              </div>

              <button
                onClick={() => onSelectRecommendation(hoveredRec)}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-indigo-600/20"
              >
                View Full Fit Details
              </button>
            </div>
          ) : (
            <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-center space-y-3">
              <Navigation className="w-8 h-8 text-indigo-400 mx-auto opacity-70" />
              <h4 className="text-sm font-bold text-white">Interactive College Map</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hover over or click any colored marker on the Tamil Nadu map to inspect personalized suitability, sample cutoffs, and geographical distance.
              </p>
              <div className="p-3 bg-slate-950/40 rounded-xl text-[11px] text-slate-500 text-left space-y-1">
                <div>• 🟢 <span className="text-slate-300 font-medium">Best Fit</span>: High academic, career & location synergy (≥85%)</div>
                <div>• 🟡 <span className="text-slate-300 font-medium">Possible Fit</span>: Moderate alignment or reach cutoff (70-84%)</div>
                <div>• 🔴 <span className="text-slate-300 font-medium">Low Fit</span>: Divergent branch interest or high distance (&lt;70%)</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
