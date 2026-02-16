
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Question, Answer, Resource, KarmaReward } from '../types';
import { MOCK_USERS, MOCK_QUESTIONS, MOCK_RESOURCES } from '../constants';

interface AppContextType {
  user: User | null;
  questions: Question[];
  resources: Resource[];
  answers: Answer[];
  login: (email: string) => void;
  logout: () => void;
  addQuestion: (q: Partial<Question>) => void;
  addResource: (r: Partial<Resource>) => void;
  addAnswer: (a: Partial<Answer>) => void;
  vote: (targetId: string, type: 'question' | 'resource' | 'answer', value: 1 | -1) => void;
  updateKarma: (amount: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [questions, setQuestions] = useState<Question[]>(MOCK_QUESTIONS);
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [answers, setAnswers] = useState<Answer[]>([]);
  // In a real app, track votes to prevent multiple votes by same user
  const [votedItems, setVotedItems] = useState<Set<string>>(new Set());

  // Simulation of persistent auth
  useEffect(() => {
    const savedUser = localStorage.getItem('studyhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string) => {
    if (!email.endsWith('.edu')) {
      alert("Only campus emails (.edu) are allowed.");
      return;
    }
    
    const isDemo = email === 'demo@university.edu';
    const newUser: User = {
      ...(isDemo ? MOCK_USERS[0] : {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        karma: 0,
        contributions: 0,
        role: 'user',
        joinedAt: new Date().toISOString()
      }),
      email,
      avatar: isDemo ? MOCK_USERS[0].avatar : `https://picsum.photos/seed/${email}/200`,
    };
    
    setUser(newUser);
    localStorage.setItem('studyhub_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studyhub_user');
  };

  const updateKarma = useCallback((amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, karma: prev.karma + amount };
      localStorage.setItem('studyhub_user', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addQuestion = (q: Partial<Question>) => {
    if (!user) return;
    const newQ: Question = {
      id: Math.random().toString(36).substr(2, 9),
      title: q.title || '',
      content: q.content || '',
      course: q.course || '',
      tags: q.tags || [],
      userId: user.id,
      userName: q.anonymous ? 'Anonymous' : user.name,
      userAvatar: q.anonymous ? 'https://picsum.photos/seed/anon/200' : user.avatar,
      anonymous: !!q.anonymous,
      votes: 0,
      answerCount: 0,
      resolved: false,
      urgent: !!q.urgent,
      createdAt: new Date().toISOString(),
    };
    setQuestions(prev => [newQ, ...prev]);
    updateKarma(KarmaReward.ASK_QUESTION);
  };

  const addResource = (r: Partial<Resource>) => {
    if (!user) return;
    const newR: Resource = {
      id: Math.random().toString(36).substr(2, 9),
      title: r.title || '',
      description: r.description || '',
      course: r.course || '',
      tags: r.tags || [],
      link: r.link || '',
      userId: user.id,
      userName: user.name,
      votes: 0,
      downloads: 0,
      createdAt: new Date().toISOString(),
    };
    setResources(prev => [newR, ...prev]);
    updateKarma(KarmaReward.SHARE_RESOURCE);
  };

  const addAnswer = (a: Partial<Answer>) => {
    if (!user) return;
    const newA: Answer = {
      id: Math.random().toString(36).substr(2, 9),
      questionId: a.questionId || '',
      content: a.content || '',
      userId: user.id,
      userName: a.anonymous ? 'Anonymous' : user.name,
      userAvatar: a.anonymous ? 'https://picsum.photos/seed/anon/200' : user.avatar,
      anonymous: !!a.anonymous,
      votes: 0,
      isBest: false,
      createdAt: new Date().toISOString(),
    };
    setAnswers(prev => [newA, ...prev]);
    setQuestions(prev => prev.map(q => q.id === a.questionId ? { ...q, answerCount: q.answerCount + 1 } : q));
    updateKarma(KarmaReward.ANSWER_QUESTION);
  };

  const vote = (targetId: string, type: 'question' | 'resource' | 'answer', value: 1 | -1) => {
    // Basic anti-spam for the demo session
    if (votedItems.has(targetId)) return;
    
    setVotedItems(prev => new Set(prev).add(targetId));

    if (type === 'question') {
      setQuestions(prev => prev.map(q => q.id === targetId ? { ...q, votes: q.votes + value } : q));
    } else if (type === 'resource') {
      setResources(prev => prev.map(r => r.id === targetId ? { ...r, votes: r.votes + value } : r));
    } else if (type === 'answer') {
      setAnswers(prev => prev.map(ans => ans.id === targetId ? { ...ans, votes: ans.votes + value } : ans));
    }

    if (value === 1) {
      updateKarma(KarmaReward.RECEIVE_UPVOTE);
    }
  };

  return (
    <AppContext.Provider value={{ user, questions, resources, answers, login, logout, addQuestion, addResource, addAnswer, vote, updateKarma }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
