import { 
  AssessmentAnswers, 
  CareerAssessmentResult, 
  CareerCategoryId, 
  CareerMatchScore 
} from '../types/assessment';
import { ASSESSMENT_QUESTIONS, CAREER_CATEGORIES } from '../data/questions';

export function calculateCareerAssessmentResults(
  answers: AssessmentAnswers,
  studentInterests?: string[]
): CareerAssessmentResult {
  const categoryRawScores: Record<CareerCategoryId, number> = {
    software: 0,
    ai_data: 0,
    electronics: 0,
    mechanical: 0,
    civil: 0,
    design: 0,
    research: 0,
    business: 0
  };

  // Theoretical max points per category across the 10 questions
  const categoryMaxPossible: Record<CareerCategoryId, number> = {
    software: 65,
    ai_data: 60,
    electronics: 55,
    mechanical: 55,
    civil: 45,
    design: 40,
    research: 50,
    business: 40
  };

  // 1. Process answers
  for (const question of ASSESSMENT_QUESTIONS) {
    const answer = answers[question.id];
    if (!answer) continue;

    const selectedOptionIds = Array.isArray(answer) ? answer : [answer];

    for (const optId of selectedOptionIds) {
      const option = question.options.find(o => o.id === optId);
      if (option && option.traitPoints) {
        for (const [cat, pts] of Object.entries(option.traitPoints)) {
          if (cat in categoryRawScores && typeof pts === 'number') {
            categoryRawScores[cat as CareerCategoryId] += pts;
          }
        }
      }
    }
  }

  // 2. Bonus points based on student interests if provided
  if (studentInterests && studentInterests.length > 0) {
    if (studentInterests.includes('Programming')) categoryRawScores.software += 6;
    if (studentInterests.includes('Artificial Intelligence')) categoryRawScores.ai_data += 6;
    if (studentInterests.includes('Web Development')) categoryRawScores.software += 4;
    if (studentInterests.includes('Data Science')) categoryRawScores.ai_data += 5;
    if (studentInterests.includes('Electronics')) categoryRawScores.electronics += 7;
    if (studentInterests.includes('Design')) categoryRawScores.design += 6;
    if (studentInterests.includes('Research')) categoryRawScores.research += 6;
    if (studentInterests.includes('Business')) categoryRawScores.business += 6;
    if (studentInterests.includes('Problem Solving')) {
      categoryRawScores.software += 3;
      categoryRawScores.ai_data += 3;
    }
  }

  // 3. Compute normalized percentage scores (capped at 98% for realistic calibration)
  const categoryKeys = Object.keys(categoryRawScores) as CareerCategoryId[];
  const unsortedScores: { cat: CareerCategoryId; score: number }[] = categoryKeys.map(cat => {
    const raw = categoryRawScores[cat];
    const maxVal = categoryMaxPossible[cat];
    // Baseline scaling
    let pct = Math.round((raw / maxVal) * 100);
    // Smooth bounds
    pct = Math.min(96, Math.max(35, pct));
    return { cat, score: pct };
  });

  // Sort descending by score
  unsortedScores.sort((a, b) => b.score - a.score);

  // 4. Map into CareerMatchScore objects
  const scores: CareerMatchScore[] = unsortedScores.map((item, index) => {
    const info = CAREER_CATEGORIES[item.cat];
    return {
      categoryId: item.cat,
      title: info.title,
      score: item.score,
      rank: index + 1,
      reasons: info.rationaleFactors,
      recommendedBranches: info.associatedBranches
    };
  });

  // Top career
  const topCareer = scores[0];

  // Consolidate recommended engineering branches from top 2 career categories
  const branchSet = new Set<string>();
  scores.slice(0, 2).forEach(cat => {
    cat.recommendedBranches.forEach(b => branchSet.add(b));
  });

  return {
    scores,
    topCareer,
    recommendedBranches: Array.from(branchSet),
    completedAt: new Date().toISOString()
  };
}
