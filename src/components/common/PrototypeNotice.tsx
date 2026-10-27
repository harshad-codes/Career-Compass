import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface PrototypeNoticeProps {
  compact?: boolean;
}

export const PrototypeNotice: React.FC<PrototypeNoticeProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 py-1 px-3 bg-amber-950/40 border border-amber-500/30 rounded-lg text-amber-300 text-xs font-medium">
        <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0 text-amber-400" />
        <span>Sample prototype values • Not official live TNEA data</span>
      </div>
    );
  }

  return (
    <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3 my-4">
      <div className="p-1 bg-amber-500/20 rounded-md mt-0.5 flex-shrink-0">
        <Info className="w-4 h-4 text-amber-400" />
      </div>
      <div className="text-xs leading-relaxed text-amber-200/90">
        <span className="font-semibold text-amber-300 mr-1.5 uppercase tracking-wide">Prototype Data Notice:</span>
        College cutoffs, seat information, and distances shown in this software engineering prototype are sample demonstration values intended to validate the matching algorithm. They do not constitute official live TNEA admission predictions.
      </div>
    </div>
  );
};
