
import { Question, Resource, User, RedemptionItem } from './types';

export const COLORS = {
  primary: '#4A6FA5',
  secondary: '#166088',
  urgent: '#FF6B6B',
  success: '#28A745'
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Ayush Narania',
    email: 'ayush@university.edu',
    avatar: 'https://picsum.photos/seed/u1/200',
    karma: 1250,
    contributions: 45,
    role: 'user',
    joinedAt: '2023-09-12'
  },
  {
    id: 'u2',
    name: 'Kush Patel',
    email: 'kush@university.edu',
    avatar: 'https://picsum.photos/seed/u2/200',
    karma: 2100,
    contributions: 89,
    role: 'TA',
    joinedAt: '2023-01-05'
  },
  {
    id: 'u3',
    name: 'Kaustub Mundra',
    email: 'kaustub@university.edu',
    avatar: 'https://picsum.photos/seed/u3/200',
    karma: 5000,
    contributions: 150,
    role: 'admin',
    joinedAt: '2022-08-15'
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 'q1',
    title: 'Difficulty understanding backpropagation in Neural Networks',
    content: 'Can someone explain how the chain rule is applied in multi-layer perceptrons? I am stuck on the weight updates for the hidden layers.',
    course: 'CS401: Artificial Intelligence',
    tags: ['AI', 'NeuralNetworks', 'Math'],
    userId: 'u1',
    userName: 'Ayush Narania',
    userAvatar: 'https://picsum.photos/seed/u1/200',
    anonymous: false,
    votes: 12,
    answerCount: 3,
    resolved: false,
    urgent: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'q2',
    title: 'Review for Econ 101 Midterm?',
    content: 'Does anyone have a study guide for the upcoming macroeconomics midterm? Looking for key concepts in IS-LM models.',
    course: 'ECON101: Macroeconomics',
    tags: ['Midterm', 'StudyGuide'],
    userId: 'u3',
    userName: 'Kaustub Mundra',
    userAvatar: 'https://picsum.photos/seed/u3/200',
    anonymous: true,
    votes: 8,
    answerCount: 1,
    resolved: true,
    urgent: false,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
  }
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 'r1',
    title: 'Organic Chemistry II - Reaction Cheat Sheet',
    description: 'A concise summary of all nucleophilic substitution and elimination reactions covered in lecture.',
    course: 'CHEM202: Organic Chemistry',
    tags: ['Chemistry', 'CheatSheet'],
    userId: 'u2',
    userName: 'Kush Patel',
    votes: 45,
    downloads: 128,
    link: 'https://example.com/chem-notes.pdf',
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
  }
];

export const POPULAR_COURSES = [
  'CS401: Artificial Intelligence',
  'ECON101: Macroeconomics',
  'CHEM202: Organic Chemistry',
  'MATH301: Linear Algebra',
  'ENG102: Composition II'
];

export const UPCOMING_EXAMS = [
  { id: 'e1', course: 'CS401: Artificial Intelligence', date: new Date(Date.now() + 5 * 86400000).toISOString(), location: 'Hall A' },
  { id: 'e2', course: 'MATH301: Linear Algebra', date: new Date(Date.now() + 12 * 86400000).toISOString(), location: 'Room 302' },
  { id: 'e3', course: 'ECON101: Macroeconomics', date: new Date(Date.now() + 20 * 86400000).toISOString(), location: 'Auditorium' }
];

export const STUDY_TIPS = [
  { id: 't1', content: 'Use the Pomodoro technique: 25 mins study, 5 mins break.', author: 'Ayush Narania' },
  { id: 't2', content: 'Explain concepts to someone else to solidify your understanding.', author: 'Kush Patel' },
  { id: 't3', content: 'Review your notes within 24 hours of the lecture.', author: 'Kaustub Mundra' },
  { id: 't4', content: 'Active recall is more effective than passive reading.', author: 'Intellexa AI' }
];

export const REDEMPTION_ITEMS: RedemptionItem[] = [
  {
    id: 'ri1',
    title: 'Priority Q&A',
    description: 'Get your questions highlighted for faster responses from TAs.',
    cost: 100,
    icon: 'Zap',
    category: 'perk'
  },
  {
    id: 'ri2',
    title: 'Intellexa Hoodie',
    description: 'Exclusive limited edition campus learning hoodie.',
    cost: 2500,
    icon: 'Shirt',
    category: 'merch'
  },
  {
    id: 'ri3',
    title: '1-on-1 TA Session',
    description: '30-minute private session with a top-rated TA for any course.',
    cost: 1000,
    icon: 'Users',
    category: 'academic'
  },
  {
    id: 'ri4',
    title: 'Premium Study Guide',
    description: 'Access to curated study guides for all midterms and finals.',
    cost: 500,
    icon: 'BookOpen',
    category: 'academic'
  },
  {
    id: 'ri5',
    title: 'Coffee Voucher',
    description: 'Redeem for a free coffee at any campus cafe.',
    cost: 300,
    icon: 'Coffee',
    category: 'perk'
  },
  {
    id: 'ri6',
    title: 'Karma Badge',
    description: 'A special profile badge to show off your contribution status.',
    cost: 150,
    icon: 'Award',
    category: 'merch'
  }
];
