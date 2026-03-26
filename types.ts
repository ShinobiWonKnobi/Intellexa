
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  karma: number;
  contributions: number;
  role: 'user' | 'TA' | 'admin';
  joinedAt: string;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  course: string;
  tags: string[];
  userId: string;
  userName: string;
  userAvatar: string;
  anonymous: boolean;
  votes: number;
  answerCount: number;
  resolved: boolean;
  urgent: boolean;
  createdAt: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  userId: string;
  userName: string;
  userAvatar: string;
  anonymous: boolean;
  votes: number;
  isBest: boolean;
  isVerified: boolean;
  isFlagged: boolean;
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  course: string;
  tags: string[];
  link: string;
  userId: string;
  userName: string;
  votes: number;
  downloads: number;
  createdAt: string;
}

export interface Vote {
  userId: string;
  targetId: string;
  value: 1 | -1;
}

export interface Exam {
  id: string;
  course: string;
  date: string;
  location: string;
}

export interface StudyTip {
  id: string;
  content: string;
  author: string;
}

export interface RedemptionItem {
  id: string;
  title: string;
  description: string;
  cost: number;
  icon: string;
  category: 'perk' | 'merch' | 'academic';
}

export interface UserRedemption {
  id: string;
  userId: string;
  itemId: string;
  redeemedAt: string;
}

export enum KarmaReward {
  ASK_QUESTION = 5,
  ANSWER_QUESTION = 10,
  SHARE_RESOURCE = 15,
  BEST_ANSWER = 20,
  RECEIVE_UPVOTE = 1
}
