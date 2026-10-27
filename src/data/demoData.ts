import { StudentProfile } from '../types/student';
import { AssessmentAnswers } from '../types/assessment';

export const DEMO_STUDENT_PROFILE: StudentProfile = {
  name: 'Harsh',
  email: 'harsh.demo@student.edu.in',
  percentage: 97.5,
  mathMark: 98,
  physicsMark: 95,
  chemistryMark: 96,
  preferredBranches: [
    'Computer Science and Engineering',
    'Artificial Intelligence and Data Science',
    'Information Technology'
  ],
  preferredLocation: 'Chennai',
  maxDistance: 50,
  interests: [
    'Programming',
    'Artificial Intelligence',
    'Problem Solving'
  ],
  isDemo: true
};

export const DEMO_ASSESSMENT_ANSWERS: AssessmentAnswers = {
  1: '1a', // Building an automated web application or personal portfolio tool
  2: '2a', // Break it down into modular step-by-step algorithms
  3: ['3a', '3b'], // Pure math + CS & scripts
  4: '4a', // Lead Software Architect
  5: '5a', // Love coding and finding bugs
  6: '6a', // Generative AI & Autonomous Agents
  7: '7a', // Fast-paced tech company building high-scale cloud platforms
  8: ['8a', '8b'], // Database schemas/optimization + neural networks
  9: '9a', // Jump straight into code and iterate
  10: '10a' // Building ubiquitous software tools used by millions
};
