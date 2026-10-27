import { BranchId } from './student';

export type CollegeType = 'Government' | 'Anna University Dept' | 'Government-Aided' | 'Private Autonomous';

export interface BranchRecord {
  branchId: BranchId;
  branchName: string;
  branchCode: string;
  sampleCutoff: number; // sample historical cutoff (out of 200)
  totalSeats: number;
  averagePackageLpa: number;
  highestPackageLpa: number;
  nbaAccredited: boolean;
}

export interface College {
  id: string;
  name: string;
  code: string;
  district: string;
  city: string;
  address: string;
  latitude: number;
  longitude: number;
  type: CollegeType;
  establishedYear: number;
  campusRating: number; // 4.2 to 4.9
  websiteUrl: string;
  branches: BranchRecord[];
  highlights: string[];
}

export interface CollegeBranchRecord {
  collegeId: string;
  collegeName: string;
  collegeCode: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  collegeType: CollegeType;
  branchId: BranchId;
  branchName: string;
  branchCode: string;
  sampleCutoff: number;
  totalSeats: number;
  averagePackageLpa: number;
  highestPackageLpa: number;
  nbaAccredited: boolean;
  campusRating: number;
  establishedYear: number;
}
