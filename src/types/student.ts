export type BranchId = 
  | 'CSE'
  | 'IT'
  | 'AIDS'
  | 'ECE'
  | 'EEE'
  | 'MECH'
  | 'CIVIL';

export interface BranchOption {
  id: BranchId;
  name: string;
  code: string;
}

export const AVAILABLE_BRANCHES: BranchOption[] = [
  { id: 'CSE', name: 'Computer Science and Engineering', code: 'CS' },
  { id: 'IT', name: 'Information Technology', code: 'IT' },
  { id: 'AIDS', name: 'Artificial Intelligence and Data Science', code: 'AD' },
  { id: 'ECE', name: 'Electronics and Communication Engineering', code: 'EC' },
  { id: 'EEE', name: 'Electrical and Electronics Engineering', code: 'EE' },
  { id: 'MECH', name: 'Mechanical Engineering', code: 'ME' },
  { id: 'CIVIL', name: 'Civil Engineering', code: 'CE' },
];

export const AVAILABLE_LOCATIONS = [
  'Chennai',
  'Chengalpattu',
  'Coimbatore',
  'Madurai',
  'Tiruchirappalli',
  'Salem',
  'Tirunelveli',
  'Vellore',
  'Anywhere in Tamil Nadu'
] as const;

export type LocationOption = typeof AVAILABLE_LOCATIONS[number];

export const DISTANCE_OPTIONS = [
  { label: 'Within 25 km', value: 25 },
  { label: 'Within 50 km', value: 50 },
  { label: 'Within 100 km', value: 100 },
  { label: 'Anywhere in Tamil Nadu', value: 9999 }
] as const;

export const AVAILABLE_INTERESTS = [
  'Programming',
  'Artificial Intelligence',
  'Web Development',
  'Data Science',
  'Electronics',
  'Design',
  'Research',
  'Business',
  'Problem Solving'
] as const;

export type InterestOption = typeof AVAILABLE_INTERESTS[number];

export interface StudentProfile {
  name: string;
  email: string;
  percentage: number;
  mathMark: number;
  physicsMark: number;
  chemistryMark: number;
  preferredBranches: string[];
  preferredLocation: string;
  maxDistance: number; // in km, 9999 for anywhere
  interests: string[];
  isDemo?: boolean;
}

export interface ProfileValidationErrors {
  name?: string;
  email?: string;
  percentage?: string;
  mathMark?: string;
  physicsMark?: string;
  chemistryMark?: string;
  preferredBranches?: string;
  preferredLocation?: string;
  interests?: string;
}
