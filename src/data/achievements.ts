// src/data/achievements.ts
/**
 * Single Unified Source of Truth for Verified Achievements & Recognition.
 * Sourced directly from official certificates, awards, hackathons, and credentials.
 */

export type AchievementCategory =
  | 'AWARD'
  | 'RECOGNITION'
  | 'HACKATHON'
  | 'COMPETITION'
  | 'CERTIFICATE'
  | 'PROGRAMME'
  | 'CLIENT / BUSINESS';

export interface Achievement {
  id: string;
  type: string;
  category: AchievementCategory;
  title: string;
  organization: string;
  issuer: string;
  date?: string;
  description: string;
  image: string; // Path in /public/achievements/
  link?: string;
  featured?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ==========================================================================
  // 1. MAJOR AWARDS & FELLOWSHIP RECOGNITIONS
  // ==========================================================================
  {
    id: 'grit-top-freelancer-award',
    type: 'award',
    category: 'AWARD',
    title: 'TOP FREELANCER: GRIT AWARD',
    organization: 'GRIT AWARDS // FREELANCE EXCELLENCE',
    issuer: 'GRIT Awards',
    date: '2025',
    description:
      'Prestigious Top Freelancer GRIT Award honoring excellence in end-to-end client delivery, technical architecture, and high-impact freelance engineering.',
    image: '/achievements/award-grit-top-freelancer.png',
    featured: true,
  },
  {
    id: 'nxtcode-25under5-milestone',
    type: 'award',
    category: 'AWARD',
    title: '25 UNDER 5: AI MILESTONE AWARD',
    organization: 'NXTWAVE CCBP 4.0 ACADEMY',
    issuer: 'NxtWave // CCBP 4.0 Academy',
    date: '08 Feb, 2025',
    description:
      'Certificate of Completion with Gold Seal for successfully achieving the 5 Day Milestone, showcasing the skills of a Modern Age Developer in the NxtCode- AI-Powered Challenge: 25 Under 5.',
    image: '/achievements/award-nxtcode-25under5-milestone.jpg',
    featured: true,
  },
  {
    id: 'brave-venture-fellowship',
    type: 'recognition',
    category: 'RECOGNITION',
    title: 'BRAVE VENTURE PITCH',
    organization: 'NIAT // INDUSTRY JURY PITCH',
    issuer: 'NxtWave of Innovation in Advanced Technologies (NIAT)',
    date: '18 Jul, 2026',
    description:
      'Certificate of Participation in BRAVE: recognized for building a real business, pitching before an industry jury with conviction, and completing the venture fellowship.',
    image: '/achievements/recognition-brave-venture.jpg',
    featured: true,
  },

  // ==========================================================================
  // 2. HACKATHON & COMPETITION ACHIEVEMENTS
  // ==========================================================================
  {
    id: 'sih-2026',
    type: 'hackathon',
    category: 'HACKATHON',
    title: 'SMART INDIA HACKATHON 2026',
    organization: 'NOIDA INTERNATIONAL UNIVERSITY // SIH 2026',
    issuer: 'Noida International University // Ministry of Education & SIH',
    date: '11 Sep, 2026',
    description:
      'Certificate of Participation in the SIH 2026 Internal Hackathon organized by Noida International University on 11th September 2026, demonstrating algorithmic problem-solving and rapid engineering.',
    image: '/achievements/hackathon-sih-2026.jpg',
    featured: true,
  },
  {
    id: 'openai-delhi-buildathon',
    type: 'hackathon',
    category: 'HACKATHON',
    title: 'OPENAI REGIONAL BUILDATHON',
    organization: 'OPENAI ACADEMY × NXTWAVE // DELHI',
    issuer: 'OpenAI Academy × NxtWave',
    date: '23 Nov, 2025',
    description:
      'Certificate of Participation in the 2-day OpenAI Academy x NxtWave Regional Buildathon in Delhi, developing and deploying real-world generative AI prototypes.',
    image: '/achievements/hackathon-openai-delhi.jpg',
    featured: true,
  },
  {
    id: 'myntra-weforshe-top100',
    type: 'competition',
    category: 'COMPETITION',
    title: 'TOP 100 NATIONAL TEAM',
    organization: 'MYNTRA WEFORSHE HACKERRAMP',
    issuer: 'Myntra // HackerRamp 2026',
    date: '2026',
    description:
      'Ranked among the Top 100 nationwide teams across thousands of competitive applicants, demonstrating technical capability, algorithmic problem-solving, and rapid engineering execution.',
    image: '',
    featured: true,
  },
  {
    id: 'takeover-hackathon',
    type: 'hackathon',
    category: 'HACKATHON',
    title: 'TAKEOVER HACKATHON',
    organization: 'NIAT // NXTWAVE ADVANCED TECH',
    issuer: 'NxtWave Institute of Advanced Technologies (NIAT)',
    date: '18 Jul, 2026',
    description:
      'Certificate of Participation for taking on real challenges, building under high pressure, and shipping technology solutions at the Takeover Hackathon.',
    image: '/achievements/hackathon-takeover.png',
  },
  {
    id: 'base44-hackathon',
    type: 'hackathon',
    category: 'HACKATHON',
    title: 'BASE 44 HACKATHON',
    organization: 'NIAT × BASE 44 // TEAM AI AVENGERS',
    issuer: 'NxtWave Institute of Advanced Technologies × Base 44',
    date: '28 Nov, 2025',
    description:
      'Certificate of Participation for developing and deploying a project using Base 44 as part of Team AI Avengers at the Base 44 Hackathon.',
    image: '/achievements/hackathon-base44.jpg',
  },

  // ==========================================================================
  // 3. IMPORTANT CERTIFICATES & ACCREDITATIONS
  // ==========================================================================
  {
    id: 'databricks-genai',
    type: 'certificate',
    category: 'CERTIFICATE',
    title: 'DATABRICKS ACCREDITED GENAI',
    organization: 'DATABRICKS ACADEMY',
    issuer: 'Databricks Academy',
    date: '29 Nov, 2025',
    description:
      'Official Databricks Academy Accreditation verifying mastery in Generative AI Fundamentals, LLM architectures, and AI application engineering.',
    image: '/achievements/cert-databricks-genai.jpg',
    featured: true,
  },
  {
    id: 'hackerrank-python',
    type: 'certificate',
    category: 'CERTIFICATE',
    title: 'PYTHON (BASIC) CERTIFICATION',
    organization: 'HACKERRANK // ID: 8295EC89BA12',
    issuer: 'HackerRank',
    date: '18 Feb, 2026',
    description:
      'Passed the HackerRank Skill Certification Test in Python (Basic). Officially verified credential ID: 8295EC89BA12.',
    image: '/achievements/cert-hackerrank-python.png',
    link: 'https://www.hackerrank.com/certificates/8295ec89ba12',
    featured: true,
  },

  // ==========================================================================
  // 4. PROGRAMMES, WORKSHOPS & MASTERCLASSES
  // ==========================================================================
  {
    id: 'openai-genai-mastery',
    type: 'programme',
    category: 'PROGRAMME',
    title: 'GENAI MASTERY WORKSHOP',
    organization: 'OPENAI ACADEMY × NXTWAVE',
    issuer: 'OpenAI Academy Learning Community × NxtWave',
    date: '15 Sep, 2025',
    description:
      'Certificate of Appreciation for completing the Generative AI Mastery Workshop at India\'s Biggest GenAI Buildathon as part of the OpenAI Academy learning community.',
    image: '/achievements/cert-openai-genai-mastery.jpg',
  },
  {
    id: 'google-staff-engineer-masterclass',
    type: 'programme',
    category: 'PROGRAMME',
    title: 'GOOGLE STAFF ENGINEER MASTERCLASS',
    organization: 'MRINAL AHLAWAT (STAFF ENG GOOGLE)',
    issuer: 'NxtWave CCBP 4.0 Academy',
    date: '16 Aug, 2025',
    description:
      'Attended the Masterclass by Mrinal Ahlawat, Staff Engineer at Google, on "What Google Looks for in Future Engineers" and gaining key insights on product thinking and real-world tech skills.',
    image: '/achievements/masterclass-google-staff-engineer.jpg',
  },
  {
    id: 'agentic-ai-masterclass',
    type: 'programme',
    category: 'PROGRAMME',
    title: 'LLMS & AGENTIC AI 101',
    organization: 'DRISHTI WALI (ION HEALTH)',
    issuer: 'NxtWave CCBP 4.0 Academy',
    date: '13 Sep, 2025',
    description:
      'Attended the Masterclass by Drishti Wali, Software Engineer at Ion Health, on "LLMS & Agentic AI 101: AI Tech You Must Know" covering NLP, LLMs, and agentic workflows.',
    image: '/achievements/masterclass-agentic-ai-101.jpg',
  },
  {
    id: 'udaan-data-science-masterclass',
    type: 'programme',
    category: 'PROGRAMME',
    title: 'EXCITING AI JOBS MASTERCLASS',
    organization: 'PRANJAL SINGH (STAFF DATA SCIENTIST UDAAN)',
    issuer: 'NxtWave CCBP 4.0 Academy',
    date: '20 Feb, 2025',
    description:
      'Attended the Masterclass by Pranjal Singh, Staff Data Scientist at Udaan, on "Skills You Can\'t Ignore to get Exciting AI Jobs".',
    image: '/achievements/masterclass-udaan-ai-jobs.jpg',
  },
  {
    id: 'nxtcode-25under5-participation',
    type: 'programme',
    category: 'PROGRAMME',
    title: 'NXTCODE AI CHALLENGE',
    organization: 'NXTWAVE CCBP 4.0 ACADEMY',
    issuer: 'NxtWave CCBP 4.0 Academy',
    date: '08 Feb, 2025',
    description:
      'Certificate of Participation in the NxtCode- AI-Powered Challenge: 25 Under 5 conducted exclusively for CCBP 4.0 Academy students.',
    image: '/achievements/cert-nxtcode-25under5-participation.jpg',
  },

  // ==========================================================================
  // 5. CLIENT & COMMERCIAL PRODUCTION CONTRACTS
  // ==========================================================================
  {
    id: 'commercial-atf-projects',
    type: 'contract',
    category: 'CLIENT / BUSINESS',
    title: 'COMMERCIAL SYSTEM CONTRACT',
    organization: 'ATF PROJECTS // ₹1,00,000 DELIVERY VALUE',
    issuer: 'ATF Projects',
    date: '2025',
    description:
      'Production client delivery for ATF Projects: enterprise commercial workflow system architecture and deployment.',
    image: '',
  },
  {
    id: 'conversion-baba-pg',
    type: 'contract',
    category: 'CLIENT / BUSINESS',
    title: 'CONVERSION PLATFORM',
    organization: 'BABA PG HOUSE // WHATSAPP DIRECT LEADS',
    issuer: 'BABA PG House',
    date: '2025',
    description:
      'Lead conversion platform engineering with direct WhatsApp lead routing integrations and telemetry.',
    image: '',
  },
  {
    id: 'ecommerce-bull-clothing',
    type: 'contract',
    category: 'CLIENT / BUSINESS',
    title: 'E-COMMERCE UI ARCHITECTURE',
    organization: 'BULL CLOTHING // DIGITAL STORE EXPERIENCE',
    issuer: 'Bull Clothing',
    date: '2025',
    description:
      'Brand digital architecture and headless storefront experience for Bull Clothing.',
    image: '',
  },
];
