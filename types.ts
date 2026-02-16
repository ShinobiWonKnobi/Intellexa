
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

export enum KarmaReward {
  ASK_QUESTION = 5,
  ANSWER_QUESTION = 10,
  SHARE_RESOURCE = 15,
  BEST_ANSWER = 20,
  RECEIVE_UPVOTE = 1
}
