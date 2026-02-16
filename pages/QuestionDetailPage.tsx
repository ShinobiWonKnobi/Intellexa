
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { getAISummary } from '../services/geminiService';

const QuestionDetailPage: React.FC<{ questionId: string; onBack: () => void }> = ({ questionId, onBack }) => {
  const { questions, answers, addAnswer, vote, user } = useApp();
  const [answerContent, setAnswerContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const question = questions.find(q => q.id === questionId);
  const questionAnswers = useMemo(() => answers.filter(a => a.questionId === questionId), [answers, questionId]);

  if (!question) return <div className="p-10 text-center font-bold text-slate-500">Question not found</div>;

  const handleAISummary = async () => {
    setIsAiLoading(true);
    const summary = await getAISummary(question.content);
    setAiSummary(summary || null);
    setIsAiLoading(false);
  };

  const handlePostAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerContent.trim()) return;
    addAnswer({
      questionId,
      content: answerContent,
      anonymous: isAnonymous
    });
    setAnswerContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-xs uppercase tracking-widest px-1"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
        Back to Hub
      </button>

      {/* Main Question Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-[10px] font-black px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg uppercase tracking-wider">{question.course}</span>
          {question.urgent && <span className="text-[10px] font-black px-2.5 py-1 bg-red-50 text-red-600 rounded-lg uppercase tracking-wider">Urgent</span>}
          <span className="text-[10px] font-black px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-wider">{new Date(question.createdAt).toLocaleDateString()}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-8 font-poppins leading-tight tracking-tight">{question.title}</h1>
        
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">{question.content}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {question.tags.map(tag => (
            <span key={tag} className="text-[10px] font-bold bg-slate-50 text-slate-400 border border-slate-100 px-3 py-1 rounded-full uppercase tracking-tighter hover:bg-slate-100 cursor-default transition-colors">#{tag}</span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-slate-100">
          <div className="flex items-center gap-4">
            <img src={question.userAvatar} className="w-12 h-12 rounded-2xl shadow-md border-2 border-white object-cover" alt="" />
            <div className="flex flex-col">
              <span className="text-sm font-extrabold text-slate-900">{question.userName}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Post Author</span>
            </div>
          </div>
          
          <button 
            onClick={handleAISummary}
            disabled={isAiLoading}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-slate-900 hover:bg-black text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl transition-all disabled:opacity-50 active:scale-95"
          >
            {isAiLoading ? (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
            )}
            Assistant Insight
          </button>
        </div>
      </div>

      {/* AI Block */}
      {aiSummary && (
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Background shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-4 relative z-10">
            <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center text-[10px] text-white font-black backdrop-blur-md border border-white/30">AI</div>
            <h3 className="text-sm font-black text-white uppercase tracking-widest">StudyHub Intelligence</h3>
          </div>
          <p className="text-white text-base sm:text-lg leading-relaxed font-medium relative z-10">"{aiSummary}"</p>
        </div>
      )}

      {/* Answers Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xl font-extrabold text-slate-900 font-poppins">Discussion ({questionAnswers.length})</h2>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Newest First</div>
        </div>
        
        <div className="space-y-4">
          {questionAnswers.length > 0 ? questionAnswers.map(ans => (
            <div key={ans.id} className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 flex flex-col sm:flex-row gap-6 hover:border-blue-200 transition-colors shadow-sm">
              <div className="flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-2 bg-slate-50 rounded-2xl p-2 sm:p-3 sm:min-w-[60px]">
                <button className="text-slate-400 hover:text-blue-600 p-1 transition-colors" onClick={() => vote(ans.id, 'answer', 1)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
                </button>
                <span className="text-sm font-black text-slate-700">{ans.votes}</span>
                <button className="text-slate-400 hover:text-red-600 p-1 transition-colors" onClick={() => vote(ans.id, 'answer', -1)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              <div className="flex-1">
                <p className="text-slate-600 mb-6 leading-relaxed whitespace-pre-wrap">{ans.content}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <img src={ans.userAvatar} className="w-8 h-8 rounded-xl shadow-sm border border-white" alt="" />
                    <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-900">{ans.userName}</span>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{new Date(ans.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : (
            <div className="p-10 bg-slate-50 rounded-3xl border border-dashed border-slate-200 text-center text-slate-400 text-sm font-bold">No answers yet. Share your knowledge!</div>
          )}
        </div>

        {/* Answer Form */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-6 sm:p-8 shadow-xl">
          <h3 className="text-lg font-black text-slate-900 mb-6 font-poppins">Contribute an Answer</h3>
          <form onSubmit={handlePostAnswer} className="space-y-6">
            <textarea
              className="w-full h-44 bg-slate-50 border-none rounded-2xl p-5 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none resize-none text-base transition-all placeholder:text-slate-400 font-medium"
              placeholder="Explain clearly to help your peers..."
              value={answerContent}
              onChange={(e) => setAnswerContent(e.target.value)}
              required
            />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="flex items-center gap-3 cursor-pointer select-none px-2 group">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg text-blue-600 border-slate-200 focus:ring-blue-500 transition-all cursor-pointer" 
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider group-hover:text-slate-700 transition-colors">Post Anonymously</span>
              </label>
              <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl text-sm shadow-xl shadow-blue-100 transition-all active:scale-95">
                Submit Answer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
