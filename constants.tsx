
import { Question, Resource, User } from './types';

export const COLORS = {
  primary: '#4A6FA5',
  secondary: '#166088',
  urgent: '#FF6B6B',
  success: '#28A745'
};

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex Rivera',
    email: 'arivera@university.edu',
    avatar: 'https://picsum.photos/seed/u1/200',
    karma: 1250,
    contributions: 45,
    role: 'user',
    joinedAt: '2023-09-12'
  },
  {
    id: 'u2',
    name: 'Sarah Chen',
    email: 'schen@university.edu',
    avatar: 'https://picsum.photos/seed/u2/200',
    karma: 2100,
    contributions: 89,
    role: 'TA',
    joinedAt: '2023-01-05'
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
    userName: 'Alex Rivera',
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
    userName: 'Jordan Lee',
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
    userName: 'Sarah Chen',
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
