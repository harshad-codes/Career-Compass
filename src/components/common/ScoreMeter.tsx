import React from 'react';

interface ScoreMeterProps {
  score: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showPercent?: boolean;
  color?: 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan';
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({
  score,
  label,
  size = 'md',
  showPercent = true,
  color = 'indigo'
}) => {
  const getColorClass = () => {
    if (color === 'emerald') return 'text-emerald-400 stroke-emerald-500';
    if (color === 'amber') return 'text-amber-400 stroke-amber-500';
    if (color === 'rose') return 'text-rose-400 stroke-rose-500';
    if (color === 'cyan') return 'text-cyan-400 stroke-cyan-500';
    return 'text-indigo-400 stroke-indigo-500';
  };

  const getDim = () => {
    switch (size) {
      case 'sm': return { width: 52, height: 52, stroke: 4, text: 'text-sm font-bold' };
      case 'lg': return { width: 104, height: 104, stroke: 7, text: 'text-2xl font-black' };
      default: return { width: 72, height: 72, stroke: 5, text: 'text-lg font-bold' };
    }
  };

  const { width, height, stroke, text } = getDim();
  const radius = (width - stroke * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex items-center justify-center" style={{ width, height }}>
        <svg className="transform -rotate-90" width={width} height={height}>
          {/* Background circle */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            className="stroke-slate-800"
            strokeWidth={stroke}
            fill="transparent"
          />
          {/* Animated fill circle */}
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            className={`transition-all duration-1000 ease-out ${getColorClass()}`}
            strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>
        <div className={`absolute inset-0 flex items-center justify-center ${text} text-slate-100`}>
          {score}{showPercent && <span className="text-[0.65em] font-medium text-slate-400 ml-0.5">%</span>}
        </div>
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-400 mt-1.5 text-center">{label}</span>
      )}
    </div>
  );
};
