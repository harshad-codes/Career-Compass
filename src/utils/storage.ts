import { StudentProfile } from '../types/student';
import { AssessmentAnswers, CareerAssessmentResult } from '../types/assessment';
import { ComparisonItem, CollegeRecommendation } from '../types/recommendation';
import { DEMO_STUDENT_PROFILE, DEMO_ASSESSMENT_ANSWERS } from '../data/demoData';
import { calculateCareerAssessmentResults } from './assessmentEngine';

const STORAGE_KEYS = {
  PROFILE: 'career_compass_profile',
  ASSESSMENT: 'career_compass_assessment',
  RESULTS: 'career_compass_results',
  COMPARISON: 'career_compass_comparison',
  IS_DEMO: 'career_compass_is_demo',
} as const;

export const storage = {
  getProfile(): StudentProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading profile from storage', e);
      return null;
    }
  },

  setProfile(profile: StudentProfile): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
      if (profile.isDemo) {
        localStorage.setItem(STORAGE_KEYS.IS_DEMO, 'true');
      }
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error saving profile to storage', e);
    }
  },

  getAssessmentAnswers(): AssessmentAnswers | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ASSESSMENT);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading assessment answers', e);
      return null;
    }
  },

  setAssessmentAnswers(answers: AssessmentAnswers): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ASSESSMENT, JSON.stringify(answers));
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error saving assessment answers', e);
    }
  },

  getCareerResults(): CareerAssessmentResult | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error loading career results', e);
      return null;
    }
  },

  setCareerResults(results: CareerAssessmentResult): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error saving career results', e);
    }
  },

  getComparisonList(): ComparisonItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPARISON);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error loading comparison list', e);
      return [];
    }
  },

  addToComparison(recommendation: CollegeRecommendation): { success: boolean; message: string } {
    try {
      const current = this.getComparisonList();
      if (current.some(item => item.recommendation.id === recommendation.id)) {
        return { success: false, message: 'This college is already in your comparison list.' };
      }
      if (current.length >= 3) {
        return { success: false, message: 'You can compare a maximum of 3 colleges simultaneously.' };
      }
      const updated = [...current, { recommendation, addedAt: new Date().toISOString() }];
      localStorage.setItem(STORAGE_KEYS.COMPARISON, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage-update'));
      return { success: true, message: `${recommendation.college.collegeName} (${recommendation.college.branchCode}) added to comparison.` };
    } catch (e) {
      console.error('Error adding to comparison', e);
      return { success: false, message: 'Failed to update comparison list.' };
    }
  },

  removeFromComparison(recommendationId: string): void {
    try {
      const current = this.getComparisonList();
      const updated = current.filter(item => item.recommendation.id !== recommendationId);
      localStorage.setItem(STORAGE_KEYS.COMPARISON, JSON.stringify(updated));
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error removing from comparison', e);
    }
  },

  clearComparison(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.COMPARISON);
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error clearing comparison', e);
    }
  },

  isDemoMode(): boolean {
    return localStorage.getItem(STORAGE_KEYS.IS_DEMO) === 'true';
  },

  // One-click demo loader for faculty presentations
  loadDemoMode(): void {
    try {
      this.setProfile(DEMO_STUDENT_PROFILE);
      this.setAssessmentAnswers(DEMO_ASSESSMENT_ANSWERS);
      const results = calculateCareerAssessmentResults(DEMO_ASSESSMENT_ANSWERS);
      this.setCareerResults(results);
      localStorage.setItem(STORAGE_KEYS.IS_DEMO, 'true');
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error setting up demo mode', e);
    }
  },

  // One-click demo reset to restart presentation cleanly
  resetAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.ASSESSMENT);
      localStorage.removeItem(STORAGE_KEYS.RESULTS);
      localStorage.removeItem(STORAGE_KEYS.COMPARISON);
      localStorage.removeItem(STORAGE_KEYS.IS_DEMO);
      window.dispatchEvent(new Event('storage-update'));
    } catch (e) {
      console.error('Error resetting application storage', e);
    }
  }
};
