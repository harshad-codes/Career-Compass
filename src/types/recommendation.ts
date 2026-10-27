import { CollegeBranchRecord } from './college';

export type RecommendationTier = 'BEST_FIT' | 'POSSIBLE_FIT' | 'LOW_FIT';

export interface FitCalculationBreakdown {
  // Academic (40%)
  studentCutoff: number; // Student equivalent cutoff out of 200
  collegeCutoff: number; // College branch sample cutoff
  academicDelta: number; // studentCutoff - collegeCutoff
  academicFitScore: number; // 0 - 100
  academicTier: 'High Academic Fit' | 'Medium Academic Fit' | 'Low Academic Fit';
  academicNotes: string;

  // Career (35%)
  careerFitScore: number; // 0 - 100
  primaryMatchedCareer: string;
  matchedInterestTags: string[];
  careerNotes: string;

  // Location (25%)
  locationFitScore: number; // 0 - 100
  distanceKm: number;
  locationStatus: string;
  locationNotes: string;

  // Overall
  overallFitScore: number; // 0 - 100
  formulaSummary: string;
}

export interface CollegeRecommendation {
  id: string; // unique combo of collegeId-branchId
  college: CollegeBranchRecord;
  fitBreakdown: FitCalculationBreakdown;
  overallFitScore: number;
  tier: RecommendationTier;
  tierLabel: string;
  tierColor: 'emerald' | 'amber' | 'rose';
  whyThisCollege: string[];
  competitivenessWarning?: string;
}

export interface ComparisonItem {
  recommendation: CollegeRecommendation;
  addedAt: string;
}
