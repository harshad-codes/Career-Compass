export type CareerCategoryId = 
  | 'software'
  | 'ai_data'
  | 'electronics'
  | 'mechanical'
  | 'civil'
  | 'design'
  | 'research'
  | 'business';

export interface CareerCategoryInfo {
  id: CareerCategoryId;
  title: string;
  icon: string;
  description: string;
  keySkills: string[];
  associatedBranches: string[]; // e.g. ['CSE', 'IT']
  rationaleFactors: string[];
}

export interface AssessmentOption {
  id: string;
  text: string;
  // Weight contribution to various career categories (0 to 10 scale)
  traitPoints: Partial<Record<CareerCategoryId, number>>;
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  subtitle?: string;
  type: 'single' | 'multi';
  options: AssessmentOption[];
}

export interface AssessmentAnswers {
  [questionId: number]: string | string[]; // option id or array of option ids
}

export interface CareerMatchScore {
  categoryId: CareerCategoryId;
  title: string;
  score: number; // 0 to 100 percentage
  rank: number; // 1, 2, 3...
  reasons: string[];
  recommendedBranches: string[];
}

export interface CareerAssessmentResult {
  scores: CareerMatchScore[];
  topCareer: CareerMatchScore;
  recommendedBranches: string[];
  completedAt: string;
}
