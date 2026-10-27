import { College, CollegeBranchRecord } from '../types/college';

export const COLLEGES_DATABASE: College[] = [
  {
    id: 'ceg-anna',
    name: 'College of Engineering, Guindy (Anna University)',
    code: '0001',
    district: 'Chennai',
    city: 'Chennai',
    address: 'Sardar Patel Road, Guindy, Chennai - 600025',
    latitude: 13.0102,
    longitude: 80.2356,
    type: 'Anna University Dept',
    establishedYear: 1794,
    campusRating: 4.9,
    websiteUrl: 'https://ceg.annauniv.edu',
    highlights: ['India’s oldest technical institution', 'Tier 1 tech recruiters', 'Median CTC 9.5 LPA'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 198.5,
        totalSeats: 300,
        averagePackageLpa: 12.8,
        highestPackageLpa: 44.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 197.5,
        totalSeats: 120,
        averagePackageLpa: 11.5,
        highestPackageLpa: 40.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 197.0,
        totalSeats: 180,
        averagePackageLpa: 11.2,
        highestPackageLpa: 38.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 196.5,
        totalSeats: 240,
        averagePackageLpa: 10.4,
        highestPackageLpa: 36.0,
        nbaAccredited: true
      },
      {
        branchId: 'MECH',
        branchName: 'Mechanical Engineering',
        branchCode: 'ME',
        sampleCutoff: 190.0,
        totalSeats: 180,
        averagePackageLpa: 7.8,
        highestPackageLpa: 22.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'mit-anna',
    name: 'Madras Institute of Technology (Anna University)',
    code: '0004',
    district: 'Chennai',
    city: 'Chennai',
    address: 'Chromepet, Chennai - 600044',
    latitude: 12.9485,
    longitude: 80.1408,
    type: 'Anna University Dept',
    establishedYear: 1949,
    campusRating: 4.8,
    websiteUrl: 'https://mitindia.edu',
    highlights: ['Alma mater of Dr. A.P.J. Abdul Kalam', 'Aeronautical & IT pioneer', 'Median CTC 9.0 LPA'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 197.0,
        totalSeats: 180,
        averagePackageLpa: 11.5,
        highestPackageLpa: 42.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 196.5,
        totalSeats: 60,
        averagePackageLpa: 10.8,
        highestPackageLpa: 36.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 195.5,
        totalSeats: 120,
        averagePackageLpa: 10.2,
        highestPackageLpa: 35.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 194.5,
        totalSeats: 180,
        averagePackageLpa: 9.8,
        highestPackageLpa: 32.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'ssn-chengalpattu',
    name: 'Sri Sivasubramaniya Nadar (SSN) College of Engineering',
    code: '1315',
    district: 'Chengalpattu',
    city: 'Chengalpattu',
    address: 'Rajiv Gandhi Salai (OMR), Kalavakkam - 603110',
    latitude: 12.7514,
    longitude: 80.1973,
    type: 'Private Autonomous',
    establishedYear: 1996,
    campusRating: 4.8,
    websiteUrl: 'https://www.ssn.edu.in',
    highlights: ['Generous merit scholarships', 'Active research hubs', 'Strong Silicon Valley alumni network'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 197.0,
        totalSeats: 240,
        averagePackageLpa: 11.8,
        highestPackageLpa: 45.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 196.0,
        totalSeats: 60,
        averagePackageLpa: 11.0,
        highestPackageLpa: 38.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 195.0,
        totalSeats: 180,
        averagePackageLpa: 10.5,
        highestPackageLpa: 35.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 193.5,
        totalSeats: 180,
        averagePackageLpa: 9.2,
        highestPackageLpa: 30.0,
        nbaAccredited: true
      },
      {
        branchId: 'EEE',
        branchName: 'Electrical and Electronics Engineering',
        branchCode: 'EE',
        sampleCutoff: 188.5,
        totalSeats: 120,
        averagePackageLpa: 8.0,
        highestPackageLpa: 24.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'psg-coimbatore',
    name: 'PSG College of Technology',
    code: '2006',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: 'Avinashi Road, Peelamedu, Coimbatore - 641004',
    latitude: 11.0247,
    longitude: 77.0028,
    type: 'Government-Aided',
    establishedYear: 1951,
    campusRating: 4.9,
    websiteUrl: 'https://www.psgtech.edu',
    highlights: ['Industry-integrated training', 'World-class laboratories', 'Top ranking in West TN'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 198.0,
        totalSeats: 180,
        averagePackageLpa: 12.0,
        highestPackageLpa: 42.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 196.5,
        totalSeats: 60,
        averagePackageLpa: 11.0,
        highestPackageLpa: 38.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 196.0,
        totalSeats: 120,
        averagePackageLpa: 10.5,
        highestPackageLpa: 35.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 195.0,
        totalSeats: 180,
        averagePackageLpa: 9.8,
        highestPackageLpa: 32.0,
        nbaAccredited: true
      },
      {
        branchId: 'MECH',
        branchName: 'Mechanical Engineering',
        branchCode: 'ME',
        sampleCutoff: 191.0,
        totalSeats: 180,
        averagePackageLpa: 8.5,
        highestPackageLpa: 25.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'cit-coimbatore',
    name: 'Coimbatore Institute of Technology (CIT)',
    code: '2007',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: 'Civil Aerodrome Post, Coimbatore - 641014',
    latitude: 11.0287,
    longitude: 77.0308,
    type: 'Government-Aided',
    establishedYear: 1956,
    campusRating: 4.6,
    websiteUrl: 'https://www.cit.edu.in',
    highlights: ['Affordable fees structure', 'Strong core engineering culture', 'Vibrant student clubs'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 195.5,
        totalSeats: 120,
        averagePackageLpa: 9.5,
        highestPackageLpa: 33.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 194.0,
        totalSeats: 60,
        averagePackageLpa: 9.0,
        highestPackageLpa: 30.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 193.0,
        totalSeats: 120,
        averagePackageLpa: 8.2,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'CIVIL',
        branchName: 'Civil Engineering',
        branchCode: 'CE',
        sampleCutoff: 178.0,
        totalSeats: 60,
        averagePackageLpa: 5.8,
        highestPackageLpa: 14.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'tce-madurai',
    name: 'Thiagarajar College of Engineering (TCE)',
    code: '5008',
    district: 'Madurai',
    city: 'Madurai',
    address: 'Thiruparankundram, Madurai - 625015',
    latitude: 9.8824,
    longitude: 78.0818,
    type: 'Government-Aided',
    establishedYear: 1957,
    campusRating: 4.7,
    websiteUrl: 'https://www.tce.edu',
    highlights: ['Premier institution of South Tamil Nadu', 'High NIRF ranking', 'Active innovation labs'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 196.0,
        totalSeats: 180,
        averagePackageLpa: 10.2,
        highestPackageLpa: 34.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 193.5,
        totalSeats: 120,
        averagePackageLpa: 9.2,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 192.0,
        totalSeats: 180,
        averagePackageLpa: 8.5,
        highestPackageLpa: 26.0,
        nbaAccredited: true
      },
      {
        branchId: 'MECH',
        branchName: 'Mechanical Engineering',
        branchCode: 'ME',
        sampleCutoff: 184.0,
        totalSeats: 120,
        averagePackageLpa: 6.8,
        highestPackageLpa: 18.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'gct-coimbatore',
    name: 'Government College of Technology (GCT)',
    code: '2005',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: 'Thadagam Road, Coimbatore - 641013',
    latitude: 11.0183,
    longitude: 76.9344,
    type: 'Government',
    establishedYear: 1945,
    campusRating: 4.6,
    websiteUrl: 'https://gct.ac.in',
    highlights: ['Affordable government fees', 'Strong technical alumni base', 'Excellent core placements'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 195.0,
        totalSeats: 120,
        averagePackageLpa: 9.0,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 191.5,
        totalSeats: 120,
        averagePackageLpa: 8.0,
        highestPackageLpa: 24.0,
        nbaAccredited: true
      },
      {
        branchId: 'EEE',
        branchName: 'Electrical and Electronics Engineering',
        branchCode: 'EE',
        sampleCutoff: 186.0,
        totalSeats: 90,
        averagePackageLpa: 7.2,
        highestPackageLpa: 20.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'rec-chennai',
    name: 'Rajalakshmi Engineering College (REC)',
    code: '1211',
    district: 'Chennai',
    city: 'Chennai',
    address: 'Rajalakshmi Nagar, Thandalam, Chennai - 602105',
    latitude: 13.0088,
    longitude: 80.0039,
    type: 'Private Autonomous',
    establishedYear: 1997,
    campusRating: 4.5,
    websiteUrl: 'https://www.rajalakshmi.org',
    highlights: ['High volume of tier-1 IT hires', 'Centres of Excellence in AI & Cloud', 'Near industrial corridor'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 192.0,
        totalSeats: 300,
        averagePackageLpa: 8.5,
        highestPackageLpa: 31.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 190.5,
        totalSeats: 180,
        averagePackageLpa: 8.0,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 189.0,
        totalSeats: 180,
        averagePackageLpa: 7.6,
        highestPackageLpa: 25.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 185.0,
        totalSeats: 240,
        averagePackageLpa: 7.0,
        highestPackageLpa: 22.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'kct-coimbatore',
    name: 'Kumaraguru College of Technology (KCT)',
    code: '2712',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: 'Saravanampatti, Coimbatore - 641049',
    latitude: 11.0827,
    longitude: 76.9942,
    type: 'Private Autonomous',
    establishedYear: 1984,
    campusRating: 4.6,
    websiteUrl: 'https://www.kct.ac.in',
    highlights: ['Modern 150-acre smart campus', 'Forge Innovation Accelerator', 'Strong design & sports culture'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 193.0,
        totalSeats: 240,
        averagePackageLpa: 8.8,
        highestPackageLpa: 30.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 191.0,
        totalSeats: 120,
        averagePackageLpa: 8.2,
        highestPackageLpa: 26.0,
        nbaAccredited: true
      },
      {
        branchId: 'MECH',
        branchName: 'Mechanical Engineering',
        branchCode: 'ME',
        sampleCutoff: 179.0,
        totalSeats: 120,
        averagePackageLpa: 6.2,
        highestPackageLpa: 16.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'svce-chennai',
    name: 'Sri Venkateswara College of Engineering (SVCE)',
    code: '1219',
    district: 'Chennai',
    city: 'Chennai',
    address: 'Post Bag No.1, Pennalur, Sriperumbudur - 602117',
    latitude: 12.9868,
    longitude: 79.9723,
    type: 'Private Autonomous',
    establishedYear: 1985,
    campusRating: 4.5,
    websiteUrl: 'https://www.svce.ac.in',
    highlights: ['Proximity to Sriperumbudur auto-hub', 'Established 1985', 'Strong automotive research'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 191.5,
        totalSeats: 180,
        averagePackageLpa: 8.2,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 188.0,
        totalSeats: 120,
        averagePackageLpa: 7.5,
        highestPackageLpa: 24.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 184.5,
        totalSeats: 180,
        averagePackageLpa: 7.0,
        highestPackageLpa: 20.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'stjosephs-chennai',
    name: "St. Joseph's College of Engineering",
    code: '1317',
    district: 'Chennai',
    city: 'Chennai',
    address: 'Jeppiaar Nagar, OMR, Chennai - 600119',
    latitude: 12.8700,
    longitude: 80.2185,
    type: 'Private Autonomous',
    establishedYear: 1994,
    campusRating: 4.4,
    websiteUrl: 'https://stjosephs.ac.in',
    highlights: ['Disciplined academic regimen', '100% placement track in IT', 'Located right on IT corridor'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 189.5,
        totalSeats: 240,
        averagePackageLpa: 7.8,
        highestPackageLpa: 25.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 187.0,
        totalSeats: 120,
        averagePackageLpa: 7.4,
        highestPackageLpa: 22.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 186.0,
        totalSeats: 180,
        averagePackageLpa: 7.0,
        highestPackageLpa: 20.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'gce-salem',
    name: 'Government College of Engineering, Salem',
    code: '2601',
    district: 'Salem',
    city: 'Salem',
    address: 'Bangalore Highways, Salem - 636011',
    latitude: 11.6963,
    longitude: 78.0772,
    type: 'Government',
    establishedYear: 1966,
    campusRating: 4.4,
    websiteUrl: 'https://gcesalem.edu.in',
    highlights: ['Top government institute in Salem zone', 'Very low tuition fees', 'Spacious green campus'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 191.0,
        totalSeats: 60,
        averagePackageLpa: 7.5,
        highestPackageLpa: 22.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 186.0,
        totalSeats: 60,
        averagePackageLpa: 6.8,
        highestPackageLpa: 18.0,
        nbaAccredited: true
      },
      {
        branchId: 'CIVIL',
        branchName: 'Civil Engineering',
        branchCode: 'CE',
        sampleCutoff: 172.0,
        totalSeats: 60,
        averagePackageLpa: 5.2,
        highestPackageLpa: 12.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'gce-tirunelveli',
    name: 'Government College of Engineering, Tirunelveli',
    code: '4953',
    district: 'Tirunelveli',
    city: 'Tirunelveli',
    address: 'Trivandrum Road, Palayamkottai, Tirunelveli - 627007',
    latitude: 8.7061,
    longitude: 77.7478,
    type: 'Government',
    establishedYear: 1981,
    campusRating: 4.3,
    websiteUrl: 'https://gcetly.ac.in',
    highlights: ['Southern Tamil Nadu government anchor', 'Strong academic track record', 'Hostel facilities'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 189.0,
        totalSeats: 60,
        averagePackageLpa: 7.0,
        highestPackageLpa: 20.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 183.0,
        totalSeats: 60,
        averagePackageLpa: 6.4,
        highestPackageLpa: 16.0,
        nbaAccredited: true
      },
      {
        branchId: 'MECH',
        branchName: 'Mechanical Engineering',
        branchCode: 'ME',
        sampleCutoff: 174.0,
        totalSeats: 60,
        averagePackageLpa: 5.5,
        highestPackageLpa: 14.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'skcet-coimbatore',
    name: 'Sri Krishna College of Engg & Tech (SKCET)',
    code: '2718',
    district: 'Coimbatore',
    city: 'Coimbatore',
    address: 'Kuniamuthur, Coimbatore - 641008',
    latitude: 10.9385,
    longitude: 76.9572,
    type: 'Private Autonomous',
    establishedYear: 1998,
    campusRating: 4.6,
    websiteUrl: 'https://www.skcet.ac.in',
    highlights: ['Top ranker in Smart India Hackathons', 'State-of-the-art labs', 'Active corporate tie-ups'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 193.5,
        totalSeats: 240,
        averagePackageLpa: 8.7,
        highestPackageLpa: 32.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 191.5,
        totalSeats: 120,
        averagePackageLpa: 8.2,
        highestPackageLpa: 28.0,
        nbaAccredited: true
      },
      {
        branchId: 'IT',
        branchName: 'Information Technology',
        branchCode: 'IT',
        sampleCutoff: 190.0,
        totalSeats: 180,
        averagePackageLpa: 7.9,
        highestPackageLpa: 25.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'rmk-chennai',
    name: 'RMK Engineering College',
    code: '1113',
    district: 'Chennai',
    city: 'Chennai',
    address: 'RSM Nagar, Kavaraipettai, Gummidipoondi - 601206',
    latitude: 13.3512,
    longitude: 80.1418,
    type: 'Private Autonomous',
    establishedYear: 1995,
    campusRating: 4.4,
    websiteUrl: 'https://www.rmkec.ac.in',
    highlights: ['Dedicated Centers of Excellence', 'Strong TCS/Cognizant hiring pipeline', 'High campus discipline'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 188.5,
        totalSeats: 180,
        averagePackageLpa: 7.2,
        highestPackageLpa: 24.0,
        nbaAccredited: true
      },
      {
        branchId: 'AIDS',
        branchName: 'Artificial Intelligence and Data Science',
        branchCode: 'AD',
        sampleCutoff: 186.0,
        totalSeats: 60,
        averagePackageLpa: 6.8,
        highestPackageLpa: 20.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 182.0,
        totalSeats: 180,
        averagePackageLpa: 6.2,
        highestPackageLpa: 18.0,
        nbaAccredited: true
      }
    ]
  },
  {
    id: 'mepco-virudhunagar',
    name: 'Mepco Schlenk Engineering College',
    code: '4960',
    district: 'Virudhunagar',
    city: 'Madurai',
    address: 'Mepco Nagar, Sivakasi - 626005',
    latitude: 9.4933,
    longitude: 77.8228,
    type: 'Private Autonomous',
    establishedYear: 1984,
    campusRating: 4.5,
    websiteUrl: 'https://www.mepcoeng.ac.in',
    highlights: ['High GATE and competitive exam success', 'Excellent residential campus', 'Very high research output'],
    branches: [
      {
        branchId: 'CSE',
        branchName: 'Computer Science and Engineering',
        branchCode: 'CS',
        sampleCutoff: 190.5,
        totalSeats: 180,
        averagePackageLpa: 7.5,
        highestPackageLpa: 24.0,
        nbaAccredited: true
      },
      {
        branchId: 'ECE',
        branchName: 'Electronics and Communication Engineering',
        branchCode: 'EC',
        sampleCutoff: 185.0,
        totalSeats: 180,
        averagePackageLpa: 6.8,
        highestPackageLpa: 19.0,
        nbaAccredited: true
      },
      {
        branchId: 'CIVIL',
        branchName: 'Civil Engineering',
        branchCode: 'CE',
        sampleCutoff: 171.0,
        totalSeats: 60,
        averagePackageLpa: 5.0,
        highestPackageLpa: 11.0,
        nbaAccredited: true
      }
    ]
  }
];

// Flattened collection of college + branch pairings for direct recommendation evaluation
export const COLLEGE_BRANCH_RECORDS: CollegeBranchRecord[] = COLLEGES_DATABASE.flatMap(college =>
  college.branches.map(branch => ({
    collegeId: college.id,
    collegeName: college.name,
    collegeCode: college.code,
    city: college.city,
    district: college.district,
    latitude: college.latitude,
    longitude: college.longitude,
    collegeType: college.type,
    branchId: branch.branchId,
    branchName: branch.branchName,
    branchCode: branch.branchCode,
    sampleCutoff: branch.sampleCutoff,
    totalSeats: branch.totalSeats,
    averagePackageLpa: branch.averagePackageLpa,
    highestPackageLpa: branch.highestPackageLpa,
    nbaAccredited: branch.nbaAccredited,
    campusRating: college.campusRating,
    establishedYear: college.establishedYear
  }))
);
