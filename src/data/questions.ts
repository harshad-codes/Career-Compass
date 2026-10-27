import { AssessmentQuestion, CareerCategoryInfo } from '../types/assessment';

export const CAREER_CATEGORIES: Record<string, CareerCategoryInfo> = {
  software: {
    id: 'software',
    title: 'Software Engineering',
    icon: 'Code2',
    description: 'Architecting digital systems, scalable cloud apps, web architectures, and algorithms that power modern software.',
    keySkills: ['Programming', 'Data Structures', 'Algorithmic Thinking', 'Software Architecture'],
    associatedBranches: ['CSE', 'IT'],
    rationaleFactors: [
      'Strong programming affinity',
      'High problem-solving aptitude',
      'Logical and algorithmic thought process',
      'Interest in building functional digital tools'
    ]
  },
  ai_data: {
    id: 'ai_data',
    title: 'Artificial Intelligence & Data Science',
    icon: 'BrainCircuit',
    description: 'Developing machine learning models, neural networks, predictive analytics, and automated decision engines.',
    keySkills: ['Machine Learning', 'Statistical Modeling', 'Python', 'Mathematical Analysis'],
    associatedBranches: ['AIDS', 'CSE'],
    rationaleFactors: [
      'High mathematics & statistics capability',
      'Analytical pattern discovery',
      'Curiosity about autonomous and cognitive systems',
      'Strong data-driven problem solving'
    ]
  },
  electronics: {
    id: 'electronics',
    title: 'Electronics & Embedded Systems',
    icon: 'Cpu',
    description: 'Engineering microprocessors, IoT hardware, wireless communication networks, and smart electronic circuits.',
    keySkills: ['Circuit Design', 'Embedded C', 'IoT Architecture', 'Signal Processing'],
    associatedBranches: ['ECE', 'EEE'],
    rationaleFactors: [
      'Fascination with silicon and physical hardware',
      'Interest in robotics and sensors',
      'Understanding signal and electrical dynamics',
      'Strong physics fundamentals'
    ]
  },
  mechanical: {
    id: 'mechanical',
    title: 'Mechanical & Automation Engineering',
    icon: 'Cog',
    description: 'Designing thermal engines, aerodynamic structures, electric vehicle powertrains, and precision robotics.',
    keySkills: ['CAD Modeling', 'Thermodynamics', 'Kinematics', 'Robotic Automation'],
    associatedBranches: ['MECH'],
    rationaleFactors: [
      'Spatial and physical mechanics interest',
      'Hands-on machine fabrication drive',
      'Curiosity about EV design and robotics',
      'Application of classical physics'
    ]
  },
  civil: {
    id: 'civil',
    title: 'Civil & Sustainable Infrastructure',
    icon: 'Building2',
    description: 'Planning smart urban transport, sustainable green buildings, structural mega-projects, and environmental systems.',
    keySkills: ['Structural Analysis', 'Urban Planning', 'Surveying', 'Green Materials'],
    associatedBranches: ['CIVIL'],
    rationaleFactors: [
      'Interest in large-scale tangible infrastructure',
      'Environmental and urban sustainability passion',
      'Structural design and geometry focus',
      'Public impact and community engineering'
    ]
  },
  design: {
    id: 'design',
    title: 'UI/UX & Product Design',
    icon: 'Palette',
    description: 'Crafting user-centric experiences, visual interaction design, human-computer interfaces, and product aesthetics.',
    keySkills: ['User Experience (UX)', 'Visual Aesthetics', 'Prototyping', 'Human Empathy'],
    associatedBranches: ['CSE', 'IT', 'AIDS'],
    rationaleFactors: [
      'Creative aesthetic perception',
      'Empathy for user pain points',
      'Attention to visual layout and micro-interactions',
      'Blending art with technology'
    ]
  },
  research: {
    id: 'research',
    title: 'Research & Emerging Tech',
    icon: 'Microscope',
    description: 'Investigating deep science, quantum computing, novel materials, cryptography, and academic breakthroughs.',
    keySkills: ['Scientific Rigor', 'Hypothesis Testing', 'Mathematics', 'Literature Analysis'],
    associatedBranches: ['AIDS', 'CSE', 'ECE'],
    rationaleFactors: [
      'Deep intellectual curiosity for first principles',
      'Enjoyment of research papers and proofs',
      'Tenacity in tackling unsolved puzzles',
      'Strong theoretical foundation'
    ]
  },
  business: {
    id: 'business',
    title: 'Tech Management & Product Leadership',
    icon: 'Briefcase',
    description: 'Leading technology strategy, agile product management, startup ventures, and cross-functional engineering teams.',
    keySkills: ['Product Strategy', 'Team Leadership', 'Market Analysis', 'Technical Communication'],
    associatedBranches: ['IT', 'CSE'],
    rationaleFactors: [
      'Strategic market thinking',
      'Communication and cross-functional leadership',
      'Focus on business ROI and user value',
      'Enterprise problem formulation'
    ]
  }
};

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "Which type of weekend project would excite you the most?",
    subtitle: "Select the option that speaks closest to your natural curiosity",
    type: 'single',
    options: [
      {
        id: '1a',
        text: "Building an automated web application or personal portfolio tool with code",
        traitPoints: { software: 10, ai_data: 6, design: 5 }
      },
      {
        id: '1b',
        text: "Training a machine learning model to recognize faces or predict trends",
        traitPoints: { ai_data: 10, software: 6, research: 8 }
      },
      {
        id: '1c',
        text: "Assembling an Arduino smart sensor or soldering a custom circuit board",
        traitPoints: { electronics: 10, mechanical: 4, software: 4 }
      },
      {
        id: '1d',
        text: "Modifying a drone, bicycle suspension, or 3D printing a mechanical gadget",
        traitPoints: { mechanical: 10, design: 5, electronics: 4 }
      }
    ]
  },
  {
    id: 2,
    question: "When faced with a difficult, unsolved problem, what is your first instinct?",
    subtitle: "Understanding your foundational cognitive style",
    type: 'single',
    options: [
      {
        id: '2a',
        text: "Break it down into modular step-by-step algorithms and flowcharts",
        traitPoints: { software: 9, ai_data: 8, business: 4 }
      },
      {
        id: '2b',
        text: "Collect datasets and analyze numbers to identify underlying statistical patterns",
        traitPoints: { ai_data: 10, research: 9, business: 5 }
      },
      {
        id: '2c',
        text: "Inspect physical components, measure voltages, or test mechanical limits",
        traitPoints: { electronics: 8, mechanical: 9, civil: 7 }
      },
      {
        id: '2d',
        text: "Sketch visual mockups or brainstorm alternative user journeys",
        traitPoints: { design: 10, software: 4, business: 6 }
      }
    ]
  },
  {
    id: 3,
    question: "Which topics in school or independent study did you find most rewarding?",
    subtitle: "Choose up to 2 areas that sparked your genuine interest",
    type: 'multi',
    options: [
      {
        id: '3a',
        text: "Calculus, probability, and pure mathematical logic",
        traitPoints: { ai_data: 8, research: 9, software: 7 }
      },
      {
        id: '3b',
        text: "Computer science, logic gates, and writing scripts",
        traitPoints: { software: 10, electronics: 5, ai_data: 7 }
      },
      {
        id: '3c',
        text: "Electricity, magnetism, semiconductors, and electronic waves",
        traitPoints: { electronics: 10, research: 6 }
      },
      {
        id: '3d',
        text: "Newtonian mechanics, thermodynamics, and energy systems",
        traitPoints: { mechanical: 10, civil: 6 }
      },
      {
        id: '3e',
        text: "Geometry, architecture, and environmental geography",
        traitPoints: { civil: 10, design: 7 }
      }
    ]
  },
  {
    id: 4,
    question: "Imagine you are launching an early-stage tech startup. What role fits you best?",
    subtitle: "Your contribution in an agile collaborative team",
    type: 'single',
    options: [
      {
        id: '4a',
        text: "Lead Software Architect — writing backend services and core code",
        traitPoints: { software: 10, ai_data: 6 }
      },
      {
        id: '4b',
        text: "Chief AI Scientist — researching proprietary algorithms and intelligent models",
        traitPoints: { ai_data: 10, research: 9 }
      },
      {
        id: '4c',
        text: "Hardware Lead — engineering smart physical devices and firmware",
        traitPoints: { electronics: 10, mechanical: 6 }
      },
      {
        id: '4d',
        text: "Product & Growth Officer — defining feature roadmaps and customer pitch",
        traitPoints: { business: 10, design: 6, software: 4 }
      }
    ]
  },
  {
    id: 5,
    question: "How do you feel about writing lines of code on a screen?",
    subtitle: "Software & programming appetite",
    type: 'single',
    options: [
      {
        id: '5a',
        text: "I love it! Finding bugs and seeing code execute gives me an adrenaline rush",
        traitPoints: { software: 10, ai_data: 8 }
      },
      {
        id: '5b',
        text: "I like code when it serves a direct analytical goal, like data analysis or simulations",
        traitPoints: { ai_data: 9, research: 8, software: 6 }
      },
      {
        id: '5c',
        text: "I prefer code when it interacts directly with physical microchips, motors, or LEDs",
        traitPoints: { electronics: 10, mechanical: 7, software: 5 }
      },
      {
        id: '5d',
        text: "I prefer visual tools, physical prototypes, or architectural sketches over raw coding",
        traitPoints: { design: 8, mechanical: 7, civil: 9 }
      }
    ]
  },
  {
    id: 6,
    question: "Which global technological development excites you most for the next decade?",
    subtitle: "Futuristic interest and technological vision",
    type: 'single',
    options: [
      {
        id: '6a',
        text: "Generative AI, Large Language Models, and Autonomous Agents",
        traitPoints: { ai_data: 10, software: 8, research: 7 }
      },
      {
        id: '6b',
        text: "Quantum chips, high-speed 6G connectivity, and wearable neural sensors",
        traitPoints: { electronics: 10, research: 8, ai_data: 5 }
      },
      {
        id: '6c',
        text: "Electric vehicles, hypersonic transport, and humanoid robotics",
        traitPoints: { mechanical: 10, electronics: 6, design: 4 }
      },
      {
        id: '6d',
        text: "Smart mega-cities, hyperloops, and net-zero carbon infrastructure",
        traitPoints: { civil: 10, business: 5, mechanical: 4 }
      }
    ]
  },
  {
    id: 7,
    question: "What kind of work environment do you envision thriving in after graduation?",
    subtitle: "Work culture and daily dynamic",
    type: 'single',
    options: [
      {
        id: '7a',
        text: "A fast-paced tech company building high-scale cloud platforms",
        traitPoints: { software: 10, business: 6 }
      },
      {
        id: '7b',
        text: "An advanced R&D laboratory tackling deep scientific breakthroughs",
        traitPoints: { research: 10, ai_data: 8, electronics: 6 }
      },
      {
        id: '7c',
        text: "A high-tech fabrication lab or automated manufacturing facility",
        traitPoints: { mechanical: 9, electronics: 8 }
      },
      {
        id: '7d',
        text: "A creative studio focusing on intuitive user experience and product aesthetics",
        traitPoints: { design: 10, software: 5 }
      }
    ]
  },
  {
    id: 8,
    question: "Which of the following problem-solving activities do you enjoy? (Select all that apply)",
    subtitle: "Hands-on engineering preferences",
    type: 'multi',
    options: [
      {
        id: '8a',
        text: "Designing efficient database schemas or optimization algorithms",
        traitPoints: { software: 9, ai_data: 7 }
      },
      {
        id: '8b',
        text: "Training neural networks or deriving insights from messy raw data",
        traitPoints: { ai_data: 10, research: 7 }
      },
      {
        id: '8c',
        text: "Troubleshooting electrical schematics and breadboards with an oscilloscope",
        traitPoints: { electronics: 10 }
      },
      {
        id: '8d',
        text: "3D CAD modeling, stress-testing parts, and hydrodynamic simulations",
        traitPoints: { mechanical: 9, civil: 5 }
      },
      {
        id: '8e',
        text: "Calculating load-bearing columns and seismic structural resilience",
        traitPoints: { civil: 10 }
      }
    ]
  },
  {
    id: 9,
    question: "How do you approach learning something completely new and unfamiliar?",
    subtitle: "Learning style & intellectual persistence",
    type: 'single',
    options: [
      {
        id: '9a',
        text: "Jump straight into code, build a minimum prototype, and iterate on errors",
        traitPoints: { software: 9, design: 6, business: 5 }
      },
      {
        id: '9b',
        text: "Study the underlying mathematical theory and scientific principles first",
        traitPoints: { research: 10, ai_data: 8, electronics: 6 }
      },
      {
        id: '9c',
        text: "Dismantle an existing object or machine to understand how its parts interact",
        traitPoints: { mechanical: 9, electronics: 8 }
      },
      {
        id: '9d',
        text: "Understand who uses it, why it matters in the market, and how it solves real human needs",
        traitPoints: { business: 9, design: 8 }
      }
    ]
  },
  {
    id: 10,
    question: "Ultimately, what impact do you want your engineering degree to deliver?",
    subtitle: "Your personal North Star definition of success",
    type: 'single',
    options: [
      {
        id: '10a',
        text: "Building ubiquitous software tools used by millions across the globe",
        traitPoints: { software: 10, ai_data: 7 }
      },
      {
        id: '10b',
        text: "Pioneering intelligent algorithms that solve critical medical or climate challenges",
        traitPoints: { ai_data: 10, research: 9 }
      },
      {
        id: '10c',
        text: "Engineering cutting-edge hardware, semiconductors, and next-gen computers",
        traitPoints: { electronics: 10, mechanical: 5 }
      },
      {
        id: '10d',
        text: "Constructing physical infrastructure or clean energy systems that last for centuries",
        traitPoints: { civil: 10, mechanical: 7 }
      }
    ]
  }
];
