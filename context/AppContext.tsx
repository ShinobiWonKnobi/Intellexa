
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Question, Answer, Resource, KarmaReward, UserRedemption, RedemptionItem } from '../types';
import { MOCK_USERS, MOCK_QUESTIONS, MOCK_RESOURCES } from '../constants';

interface AppContextType {
  user: User | null;
  questions: Question[];
  resources: Resource[];
  answers: Answer[];
  login: (email: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addQuestion: (q: Partial<Question>) => void;
  addResource: (r: Partial<Resource>) => void;
  addAnswer: (a: Partial<Answer>) => void;
  vote: (targetId: string, type: 'question' | 'resource' | 'answer', value: 1 | -1) => void;
  resolveQuestion: (id: string) => void;
  markBestAnswer: (questionId: string, answerId: string) => void;
  verifyAnswer: (answerId: string) => void;
  flagAnswer: (answerId: string) => void;
  updateKarma: (amount: number) => void;
  votedItems: Set<string>;
  redemptions: UserRedemption[];
  redeemItem: (item: RedemptionItem) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('intellexa_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem('intellexa_questions');
    return saved ? JSON.parse(saved) : MOCK_QUESTIONS;
  });
  const [resources, setResources] = useState<Resource[]>(() => {
    const saved = localStorage.getItem('intellexa_resources');
    return saved ? JSON.parse(saved) : MOCK_RESOURCES;
  });
  const [answers, setAnswers] = useState<Answer[]>(() => {
    const saved = localStorage.getItem('intellexa_answers');
    return saved ? JSON.parse(saved) : [];
  });
  const [votedItems, setVotedItems] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('intellexa_voted_items');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [redemptions, setRedemptions] = useState<UserRedemption[]>(() => {
    const saved = localStorage.getItem('intellexa_redemptions');
    return saved ? JSON.parse(saved) : [];
  });

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('intellexa_questions', JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem('intellexa_resources', JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem('intellexa_answers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('intellexa_voted_items', JSON.stringify(Array.from(votedItems)));
  }, [votedItems]);

  useEffect(() => {
    localStorage.setItem('intellexa_redemptions', JSON.stringify(redemptions));
  }, [redemptions]);

  const login = (email: string) => {
    if (!email.endsWith('.edu')) {
      console.error("Only campus emails (.edu) are allowed.");
      return;
    }
    
    const isDemoUser = email === 'demo@university.edu';
    const isDemoTA = email === 'ta@university.edu';
    const isDemoAdmin = email === 'admin@university.edu';

    let newUser: User;

    if (isDemoUser) {
      newUser = MOCK_USERS[0];
    } else if (isDemoTA) {
      newUser = MOCK_USERS[1];
    } else if (isDemoAdmin) {
      newUser = MOCK_USERS[2];
    } else {
      newUser = {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        avatar: `https://picsum.photos/seed/${email}/200`,
        karma: 0,
        contributions: 0,
        role: 'user',
        joinedAt: new Date().toISOString()
      };
    }
    
    setUser(newUser);
    localStorage.setItem('intellexa_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('intellexa_user');
  };

  const updateUser = (updates: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...updates };
      localStorage.setItem('intellexa_user', JSON.stringify(updated));
      
      // Propagate name/avatar changes to existing contributions
      if (updates.name || updates.avatar) {
        setQuestions(qs => qs.map(q => q.userId === updated.id && !q.anonymous ? { 
          ...q, 
          userName: updates.name || q.userName,
          userAvatar: updates.avatar || q.userAvatar 
        } : q));
        setResources(rs => rs.map(r => r.userId === updated.id ? { 
          ...r, 
          userName: updates.name || r.userName 
        } : r));
        setAnswers(ans => ans.map(a => a.userId === updated.id && !a.anonymous ? { 
          ...a, 
          userName: updates.name || a.userName,
          userAvatar: updates.avatar || a.userAvatar 
        } : a));
      }
      
      return updated;
    });
  };

  const updateKarma = useCallback((amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, karma: prev.karma + amount };
      localStorage.setItem('intellexa_user', JSON.stringify(updated));
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
      isVerified: false,
      isFlagged: false,
      createdAt: new Date().toISOString(),
    };
    setAnswers(prev => [newA, ...prev]);
    setQuestions(prev => prev.map(q => q.id === a.questionId ? { ...q, answerCount: q.answerCount + 1 } : q));
    updateKarma(KarmaReward.ANSWER_QUESTION);
  };

  const vote = (targetId: string, type: 'question' | 'resource' | 'answer', value: 1 | -1) => {
    if (!user) return;
    
    // Basic anti-spam for the demo session
    if (votedItems.has(targetId)) return;
    
    let authorId = '';
    if (type === 'question') {
      const q = questions.find(q => q.id === targetId);
      if (q) authorId = q.userId;
    } else if (type === 'resource') {
      const r = resources.find(r => r.id === targetId);
      if (r) authorId = r.userId;
    } else if (type === 'answer') {
      const a = answers.find(a => a.id === targetId);
      if (a) authorId = a.userId;
    }

    // Prevent self-voting
    if (authorId === user.id) {
      console.warn("You cannot vote on your own contributions.");
      return;
    }
    
    setVotedItems(prev => new Set(prev).add(targetId));

    if (type === 'question') {
      setQuestions(prev => prev.map(q => q.id === targetId ? { ...q, votes: q.votes + value } : q));
    } else if (type === 'resource') {
      setResources(prev => prev.map(r => r.id === targetId ? { ...r, votes: r.votes + value } : r));
    } else if (type === 'answer') {
      setAnswers(prev => prev.map(ans => ans.id === targetId ? { ...ans, votes: ans.votes + value } : ans));
    }

    // In a real app, karma is awarded to the author when OTHERS upvote.
    // For this local demo, we simulate this by awarding karma if the current user 
    // were to receive an upvote from someone else.
  };

  const resolveQuestion = (id: string) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, resolved: true } : q));
  };

  const markBestAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => prev.map(a => {
      if (a.questionId === questionId) {
        return { ...a, isBest: a.id === answerId };
      }
      return a;
    }));
    
    // Award karma to the answerer
    const bestAnswer = answers.find(a => a.id === answerId);
    if (bestAnswer && bestAnswer.userId === user?.id) {
      updateKarma(KarmaReward.BEST_ANSWER);
    }
    
    // Also resolve the question
    resolveQuestion(questionId);
  };

  const verifyAnswer = (answerId: string) => {
    if (user?.role !== 'TA' && user?.role !== 'admin') return;
    setAnswers(prev => prev.map(a => a.id === answerId ? { ...a, isVerified: !a.isVerified, isFlagged: false } : a));
  };

  const flagAnswer = (answerId: string) => {
    if (user?.role !== 'TA' && user?.role !== 'admin') return;
    setAnswers(prev => prev.map(a => a.id === answerId ? { ...a, isFlagged: !a.isFlagged, isVerified: false } : a));
  };

  const redeemItem = (item: RedemptionItem) => {
    if (!user || user.karma < item.cost) return false;

    const newRedemption: UserRedemption = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      itemId: item.id,
      redeemedAt: new Date().toISOString()
    };

    setRedemptions(prev => [newRedemption, ...prev]);
    updateKarma(-item.cost);
    return true;
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      questions, 
      resources, 
      answers, 
      login, 
      logout, 
      updateUser,
      addQuestion, 
      addResource, 
      addAnswer, 
      vote, 
      resolveQuestion,
      markBestAnswer,
      verifyAnswer,
      flagAnswer,
      updateKarma,
      votedItems,
      redemptions,
      redeemItem
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};
