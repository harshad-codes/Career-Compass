import { DEMO_STUDENT_PROFILE, DEMO_ASSESSMENT_ANSWERS } from './src/data/demoData.ts';
import { calculateCareerAssessmentResults } from './src/utils/assessmentEngine.ts';
import { calculateStudentCutoff, calculateAcademicFit, calculateCareerFit, calculateLocationFit, buildCollegeRecommendation, getBestFitColleges } from './src/utils/recommendationEngine.ts';
import { COLLEGE_BRANCH_RECORDS, COLLEGES_DATABASE } from './src/data/colleges.ts';
import { getDistanceToCity } from './src/utils/distance.ts';

console.log('--- CAREER COMPASS VERIFICATION SUITE ---');

// 1. Verify Demo Profile Data
console.log('1. Checking Demo Student Profile:');
console.log(`- Student Name: ${DEMO_STUDENT_PROFILE.name}`);
console.log(`- 12th Percentage: ${DEMO_STUDENT_PROFILE.percentage}%`);
console.log(`- Marks: Math=${DEMO_STUDENT_PROFILE.mathMark}, Phys=${DEMO_STUDENT_PROFILE.physicsMark}, Chem=${DEMO_STUDENT_PROFILE.chemistryMark}`);
console.log(`- Preferred Location: ${DEMO_STUDENT_PROFILE.preferredLocation}, Max Distance: ${DEMO_STUDENT_PROFILE.maxDistance}km`);

const studentCutoff = calculateStudentCutoff(DEMO_STUDENT_PROFILE);
console.log(`- Calculated TNEA Cutoff: ${studentCutoff} / 200`);
if (studentCutoff !== 193.5) {
  throw new Error(`Expected cutoff 193.5, got ${studentCutoff}`);
}
console.log('✓ Cutoff formula verified (98 + 47.5 + 48 = 193.5)');

// 2. Verify Career Assessment Calculation
console.log('\n2. Checking Career Assessment Engine:');
const careerResults = calculateCareerAssessmentResults(DEMO_ASSESSMENT_ANSWERS, DEMO_STUDENT_PROFILE.interests);
console.log(`- Top Career: ${careerResults.topCareer.title} (${careerResults.topCareer.score}%)`);
console.log(`- Recommended Branches: ${careerResults.recommendedBranches.join(', ')}`);
console.log('- Top 3 Careers:');
careerResults.scores.slice(0, 3).forEach(c => console.log(`  #${c.rank} ${c.title} (${c.score}%)`));

if (careerResults.topCareer.categoryId !== 'software') {
  throw new Error(`Expected Software Engineering top match, got ${careerResults.topCareer.title}`);
}
console.log('✓ Career scoring accurately ranks Software Engineering as #1');

// 3. Verify College Dataset Size & Diversity
console.log('\n3. Checking College Dataset:');
console.log(`- Total Unique Colleges: ${COLLEGES_DATABASE.length}`);
console.log(`- Total College-Branch Pairings: ${COLLEGE_BRANCH_RECORDS.length}`);
if (COLLEGE_BRANCH_RECORDS.length < 20) {
  throw new Error(`Expected >= 20 college-branch records, found ${COLLEGE_BRANCH_RECORDS.length}`);
}
console.log('✓ Meets requirement of at least 20 college-branch records across Tamil Nadu');

// 4. Verify 40/35/25 Formula & Explainability
console.log('\n4. Checking Recommendations & 40/35/25 Weighting:');
const recommendations = getBestFitColleges(COLLEGE_BRANCH_RECORDS, DEMO_STUDENT_PROFILE, careerResults);
console.log(`- Total Generated Recommendations: ${recommendations.length}`);

// Inspect top match
const topRec = recommendations[0];
console.log(`\nTop Match: ${topRec.college.collegeName} - ${topRec.college.branchName}`);
console.log(`- Academic Fit (40%): ${topRec.fitBreakdown.academicFitScore}%`);
console.log(`- Career Fit (35%): ${topRec.fitBreakdown.careerFitScore}%`);
console.log(`- Location Fit (25%): ${topRec.fitBreakdown.locationFitScore}%`);
console.log(`- Overall Fit Score: ${topRec.overallFitScore}% (Tier: ${topRec.tierLabel})`);
console.log(`- Formula check: (${topRec.fitBreakdown.academicFitScore}*0.40) + (${topRec.fitBreakdown.careerFitScore}*0.35) + (${topRec.fitBreakdown.locationFitScore}*0.25)`);
const expectedMath = Math.round(
  (topRec.fitBreakdown.academicFitScore * 0.40) +
  (topRec.fitBreakdown.careerFitScore * 0.35) +
  (topRec.fitBreakdown.locationFitScore * 0.25)
);
if (expectedMath !== topRec.overallFitScore) {
  throw new Error(`Math mismatch! Calculated ${expectedMath}, reported ${topRec.overallFitScore}`);
}
console.log('✓ Mathematical weighting (40/35/25) verified exactly.');

// 5. Verify Geographical Distance calculation
console.log('\n5. Checking Location Fit & Distance:');
const distRec = getDistanceToCity('Chennai', 13.0088, 80.0039); // REC Chennai
const distMadurai = getDistanceToCity('Chennai', 9.8824, 78.0818); // TCE Madurai
console.log(`- Chennai to REC Chennai: ~${distRec} km`);
console.log(`- Chennai to TCE Madurai: ~${distMadurai} km`);
if (distRec > 50 || distMadurai < 350) {
  throw new Error('Distance computation anomaly detected');
}
console.log('✓ Haversine distance correctly identifies local vs remote institutions');

// 6. Verify Tier Breakdown
const bestFitCount = recommendations.filter(r => r.tier === 'BEST_FIT').length;
const possibleFitCount = recommendations.filter(r => r.tier === 'POSSIBLE_FIT').length;
const lowFitCount = recommendations.filter(r => r.tier === 'LOW_FIT').length;
console.log(`\n6. Recommendation Tier Counts:`);
console.log(`- 🟢 Best Fit (>=85%): ${bestFitCount}`);
console.log(`- 🟡 Possible Fit (70-84%): ${possibleFitCount}`);
console.log(`- 🔴 Low Fit (<70%): ${lowFitCount}`);

if (bestFitCount === 0 || possibleFitCount === 0) {
  throw new Error('Expected both Best Fit and Possible Fit categories to be populated');
}
console.log('✓ Multiple recommendation tiers successfully distributed.');

console.log('\n====================================');
console.log('ALL TESTS PASSED WITH 100% ACCURACY!');
console.log('====================================');
