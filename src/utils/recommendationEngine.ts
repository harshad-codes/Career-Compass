import { StudentProfile } from '../types/student';
import { CareerAssessmentResult } from '../types/assessment';
import { CollegeBranchRecord } from '../types/college';
import { 
  CollegeRecommendation, 
  FitCalculationBreakdown, 
  RecommendationTier 
} from '../types/recommendation';
import { getDistanceToCity } from './distance';

/**
 * Calculates student's equivalent TNEA engineering cutoff score out of 200:
 * Standard TNEA Formula: Mathematics (100) + Physics/2 (50) + Chemistry/2 (50)
 */
export function calculateStudentCutoff(profile: StudentProfile): number {
  const math = Number(profile.mathMark) || 0;
  const physics = Number(profile.physicsMark) || 0;
  const chemistry = Number(profile.chemistryMark) || 0;

  const cutoff = math + (physics / 2) + (chemistry / 2);
  return Math.round(cutoff * 100) / 100;
}

/**
 * 1. ACADEMIC FIT (40% Weight)
 * Compares student cutoff against college/branch sample historical cutoff
 */
export function calculateAcademicFit(
  studentCutoff: number,
  collegeCutoff: number
): {
  score: number;
  delta: number;
  tier: 'High Academic Fit' | 'Medium Academic Fit' | 'Low Academic Fit';
  notes: string;
} {
  const delta = Math.round((studentCutoff - collegeCutoff) * 100) / 100;

  let score: number;
  let tier: 'High Academic Fit' | 'Medium Academic Fit' | 'Low Academic Fit';
  let notes: string;

  if (delta >= 2.0) {
    score = Math.min(99, Math.round(92 + Math.min(7, delta * 1.2)));
    tier = 'High Academic Fit';
    notes = `Your score (${studentCutoff}) comfortably exceeds the sample historical cutoff (${collegeCutoff}) by +${delta}.`;
  } else if (delta >= 0) {
    score = Math.round(87 + delta * 2.5);
    tier = 'High Academic Fit';
    notes = `Your score (${studentCutoff}) is well aligned with the sample historical cutoff (${collegeCutoff}).`;
  } else if (delta >= -3.0) {
    score = Math.round(76 + (delta + 3.0) * 3.5);
    tier = 'Medium Academic Fit';
    notes = `Competitive match: Your score (${studentCutoff}) is within ${Math.abs(delta)} marks of the sample cutoff (${collegeCutoff}).`;
  } else if (delta >= -7.0) {
    score = Math.round(62 + (delta + 7.0) * 3.0);
    tier = 'Medium Academic Fit';
    notes = `Reach option: Sample cutoff (${collegeCutoff}) is ${Math.abs(delta)} marks above your current score (${studentCutoff}).`;
  } else {
    score = Math.max(35, Math.round(55 + delta * 1.5));
    tier = 'Low Academic Fit';
    notes = `Significant academic gap: Sample cutoff (${collegeCutoff}) is ${Math.abs(delta)} marks higher than your score (${studentCutoff}).`;
  }

  return { score, delta, tier, notes };
}

/**
 * 2. CAREER FIT (35% Weight)
 * Evaluates career assessment score in the branch's domain, student interests, and preferred branches
 */
export function calculateCareerFit(
  branchRecord: CollegeBranchRecord,
  careerResults: CareerAssessmentResult | null,
  profile: StudentProfile
): {
  score: number;
  matchedCareer: string;
  matchedInterests: string[];
  notes: string;
} {
  const branchId = branchRecord.branchId;
  const interests = profile.interests || [];
  const preferredBranches = profile.preferredBranches || [];

  // Map branch to dominant career domain
  let domainKey = 'software';
  let domainTitle = 'Software Engineering';

  if (branchId === 'CSE' || branchId === 'IT') {
    domainKey = 'software';
    domainTitle = 'Software Engineering';
  } else if (branchId === 'AIDS') {
    domainKey = 'ai_data';
    domainTitle = 'Artificial Intelligence & Data Science';
  } else if (branchId === 'ECE' || branchId === 'EEE') {
    domainKey = 'electronics';
    domainTitle = 'Electronics & Embedded Systems';
  } else if (branchId === 'MECH') {
    domainKey = 'mechanical';
    domainTitle = 'Mechanical & Automation';
  } else if (branchId === 'CIVIL') {
    domainKey = 'civil';
    domainTitle = 'Civil & Infrastructure';
  }

  // 1. Base domain score from assessment
  let baseScore = 70; // fallback if assessment not yet completed
  if (careerResults && careerResults.scores) {
    const match = careerResults.scores.find(s => s.categoryId === domainKey);
    if (match) {
      baseScore = match.score;
    }
  }

  // 2. Interest tag matching
  const matchedInterests: string[] = [];
  let interestBonus = 0;

  if (branchId === 'CSE' || branchId === 'IT' || branchId === 'AIDS') {
    if (interests.includes('Programming')) { matchedInterests.push('Programming'); interestBonus += 4; }
    if (interests.includes('Artificial Intelligence')) { matchedInterests.push('Artificial Intelligence'); interestBonus += 4; }
    if (interests.includes('Problem Solving')) { matchedInterests.push('Problem Solving'); interestBonus += 3; }
    if (interests.includes('Web Development')) { matchedInterests.push('Web Development'); interestBonus += 2; }
    if (interests.includes('Data Science')) { matchedInterests.push('Data Science'); interestBonus += 3; }
  } else if (branchId === 'ECE' || branchId === 'EEE') {
    if (interests.includes('Electronics')) { matchedInterests.push('Electronics'); interestBonus += 6; }
    if (interests.includes('Problem Solving')) { matchedInterests.push('Problem Solving'); interestBonus += 3; }
    if (interests.includes('Research')) { matchedInterests.push('Research'); interestBonus += 3; }
  } else if (branchId === 'MECH') {
    if (interests.includes('Design')) { matchedInterests.push('Design'); interestBonus += 5; }
    if (interests.includes('Problem Solving')) { matchedInterests.push('Problem Solving'); interestBonus += 4; }
  } else if (branchId === 'CIVIL') {
    if (interests.includes('Design')) { matchedInterests.push('Design'); interestBonus += 5; }
    if (interests.includes('Problem Solving')) { matchedInterests.push('Problem Solving'); interestBonus += 4; }
  }

  // 3. Preferred branch bonus
  const isBranchPreferred = preferredBranches.some(b => 
    b.toLowerCase().includes(branchRecord.branchName.toLowerCase()) || 
    branchRecord.branchName.toLowerCase().includes(b.toLowerCase())
  );
  const preferenceBonus = isBranchPreferred ? 5 : 0;

  // Combine and normalize score between 40 and 99
  const totalScore = Math.min(99, Math.max(40, baseScore + interestBonus + preferenceBonus));

  const notes = matchedInterests.length > 0
    ? `Strong synergy with your interests in ${matchedInterests.join(', ')}.`
    : `Branch aligns with your career assessment profile in ${domainTitle}.`;

  return {
    score: totalScore,
    matchedCareer: domainTitle,
    matchedInterests,
    notes
  };
}

/**
 * 3. LOCATION FIT (25% Weight)
 * Calculates geographical alignment based on preferred location & max allowable distance
 */
export function calculateLocationFit(
  branchRecord: CollegeBranchRecord,
  profile: StudentProfile
): {
  score: number;
  distanceKm: number;
  status: string;
  notes: string;
} {
  const prefLocation = profile.preferredLocation || 'Anywhere in Tamil Nadu';
  const maxDistance = profile.maxDistance || 9999;

  // If anywhere in Tamil Nadu
  if (prefLocation === 'Anywhere in Tamil Nadu' || maxDistance >= 9999) {
    return {
      score: 95,
      distanceKm: 0,
      status: 'Within Preference',
      notes: 'You selected flexible statewide preferences across Tamil Nadu.'
    };
  }

  // Calculate approximate distance
  const distanceKm = getDistanceToCity(prefLocation, branchRecord.latitude, branchRecord.longitude);

  let score: number;
  let status: string;
  let notes: string;

  if (distanceKm <= 15) {
    score = 98;
    status = 'Within City Radius';
    notes = `Located in or right next to ${prefLocation} (~${distanceKm} km away).`;
  } else if (distanceKm <= maxDistance) {
    // Scaled within allowable limit (80% to 94%)
    const ratio = distanceKm / maxDistance;
    score = Math.round(94 - ratio * 14);
    status = 'Within Preferred Radius';
    notes = `~${distanceKm} km from ${prefLocation} (well within your ${maxDistance} km limit).`;
  } else {
    // Exceeds allowable limit
    const excess = distanceKm - maxDistance;
    score = Math.max(30, Math.round(75 - Math.min(45, excess / 5)));
    status = 'Exceeds Preferred Distance';
    notes = `~${distanceKm} km from ${prefLocation} (exceeds your preferred ${maxDistance} km limit by ${excess} km).`;
  }

  return { score, distanceKm, status, notes };
}

/**
 * 4. PERSONALIZED RECOMMENDATION COMPOSER
 * Formula: (Academic × 0.40) + (Career × 0.35) + (Location × 0.25)
 */
export function buildCollegeRecommendation(
  record: CollegeBranchRecord,
  profile: StudentProfile,
  careerResults: CareerAssessmentResult | null
): CollegeRecommendation {
  const studentCutoff = calculateStudentCutoff(profile);
  const academic = calculateAcademicFit(studentCutoff, record.sampleCutoff);
  const career = calculateCareerFit(record, careerResults, profile);
  const location = calculateLocationFit(record, profile);

  // Core formula: 40% Academic + 35% Career + 25% Location
  const overallFitScore = Math.round(
    (academic.score * 0.40) +
    (career.score * 0.35) +
    (location.score * 0.25)
  );

  // Tier classification
  let tier: RecommendationTier;
  let tierLabel: string;
  let tierColor: 'emerald' | 'amber' | 'rose';

  if (overallFitScore >= 85) {
    tier = 'BEST_FIT';
    tierLabel = 'BEST FIT';
    tierColor = 'emerald';
  } else if (overallFitScore >= 70) {
    tier = 'POSSIBLE_FIT';
    tierLabel = 'POSSIBLE FIT';
    tierColor = 'amber';
  } else {
    tier = 'LOW_FIT';
    tierLabel = 'LOW FIT';
    tierColor = 'rose';
  }

  // Academic competitiveness warning if cutoff delta is negative
  let competitivenessWarning: string | undefined;
  if (academic.delta < 0) {
    competitivenessWarning = `Strong overall match, but academic competitiveness should be considered (Sample cutoff is ${record.sampleCutoff}, while your score is ${studentCutoff}).`;
  }

  // Generate personalized "Why this college?" bullet points
  const whyThisCollege: string[] = [];

  if (academic.delta >= 0) {
    whyThisCollege.push(`Your academic score (${studentCutoff}) is competitive with the sample historical cutoff (${record.sampleCutoff}).`);
  } else if (academic.delta >= -3) {
    whyThisCollege.push(`Your academic score (${studentCutoff}) is close to the sample cutoff (${record.sampleCutoff}), making it a strong target match.`);
  } else {
    whyThisCollege.push(`Offers an aspirational curriculum in ${record.branchName} despite a competitive sample cutoff (${record.sampleCutoff}).`);
  }

  if (career.matchedInterests.length > 0) {
    whyThisCollege.push(`Your interests in ${career.matchedInterests.join(', ')} strongly match this branch.`);
  } else {
    whyThisCollege.push(`Your career assessment profile in ${career.matchedCareer} aligns with this branch.`);
  }

  if (location.distanceKm <= (profile.maxDistance || 9999)) {
    whyThisCollege.push(`The college is within your preferred geographical range (${location.distanceKm > 0 ? `~${location.distanceKm} km from ${profile.preferredLocation}` : 'flexible statewide preference'}).`);
  } else {
    whyThisCollege.push(`Premier regional campus located in ${record.city} (~${location.distanceKm} km).`);
  }

  if (record.averagePackageLpa >= 8.0) {
    whyThisCollege.push(`High career trajectory with an average placement package of ₹${record.averagePackageLpa} LPA.`);
  }

  const breakdown: FitCalculationBreakdown = {
    studentCutoff,
    collegeCutoff: record.sampleCutoff,
    academicDelta: academic.delta,
    academicFitScore: academic.score,
    academicTier: academic.tier,
    academicNotes: academic.notes,

    careerFitScore: career.score,
    primaryMatchedCareer: career.matchedCareer,
    matchedInterestTags: career.matchedInterests,
    careerNotes: career.notes,

    locationFitScore: location.score,
    distanceKm: location.distanceKm,
    locationStatus: location.status,
    locationNotes: location.notes,

    overallFitScore,
    formulaSummary: `(${academic.score} × 0.40) + (${career.score} × 0.35) + (${location.score} × 0.25) = ${overallFitScore}%`
  };

  return {
    id: `${record.collegeId}-${record.branchId}`,
    college: record,
    fitBreakdown: breakdown,
    overallFitScore,
    tier,
    tierLabel,
    tierColor,
    whyThisCollege,
    competitivenessWarning
  };
}

/**
 * Generates sorted best-fit recommendations for all college branch records
 */
export function getBestFitColleges(
  records: CollegeBranchRecord[],
  profile: StudentProfile,
  careerResults: CareerAssessmentResult | null
): CollegeRecommendation[] {
  const recommendations = records.map(record => 
    buildCollegeRecommendation(record, profile, careerResults)
  );

  // Sort descending by Overall Fit Score
  recommendations.sort((a, b) => b.overallFitScore - a.overallFitScore);
  return recommendations;
}
