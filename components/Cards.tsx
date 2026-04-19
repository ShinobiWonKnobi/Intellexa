
import React from 'react';
import { Question, Resource, Exam, StudyTip } from '../types';
import { useApp } from '../context/AppContext';

export const QuestionCard: React.FC<{ question: Question; onClick: () => void }> = ({ question, onClick }) => {
  const { vote, user, votedItems } = useApp();
  const hasVoted = votedItems.has(question.id);
  const isOwn = user?.id === question.userId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]" onClick={onClick}>
      <div className="flex gap-3 sm:gap-4">
        {/* Voting - Compact on mobile */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1" onClick={(e) => e.stopPropagation()}>
          <button 
            className={`p-1.5 sm:p-1 transition-colors ${hasVoted ? 'text-blue-600 cursor-default' : isOwn ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-blue-600'}`}
            onClick={() => !hasVoted && !isOwn && vote(question.id, 'question', 1)}
            disabled={hasVoted || isOwn}
            aria-label="Upvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
          </button>
          <span className={`font-bold text-xs sm:text-base ${hasVoted ? 'text-blue-600' : 'text-slate-700'}`}>{question.votes}</span>
          <button 
            className={`p-1.5 sm:p-1 transition-colors ${isOwn ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-red-600'}`}
            onClick={() => !hasVoted && !isOwn && vote(question.id, 'question', -1)}
            disabled={hasVoted || isOwn}
            aria-label="Downvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg uppercase tracking-wider">{question.course.split(':')[0]}</span>
            {question.urgent && <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 bg-red-600 text-white rounded-lg uppercase tracking-wider animate-pulse shadow-sm shadow-red-100">Urgent</span>}
            {question.resolved && <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-lg uppercase tracking-wider">Resolved</span>}
          </div>
          <h3 className="font-bold text-sm sm:text-lg text-slate-900 mb-1 sm:mb-2 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{question.title}</h3>
          <p className="text-slate-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4 leading-relaxed">{question.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={question.userAvatar} className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg shadow-sm" alt="" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-[10px] sm:text-xs font-bold text-slate-700">{question.userName}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">•</span>
                <span className="text-[10px] text-slate-400">{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-[10px] sm:text-xs font-bold bg-slate-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-lg">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              {question.answerCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const { vote, user, votedItems } = useApp();
  const hasVoted = votedItems.has(resource.id);
  const isOwn = user?.id === resource.userId;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-lg uppercase tracking-wider">{resource.course.split(':')[0]}</span>
          </div>
          <h3 className="font-bold text-base text-slate-900 leading-snug truncate">{resource.title}</h3>
        </div>
        <div className="flex flex-col items-center bg-slate-50 rounded-xl p-1">
           <button 
             className={`transition-colors p-1 ${hasVoted ? 'text-blue-600 cursor-default' : isOwn ? 'text-slate-200 cursor-not-allowed' : 'text-slate-400 hover:text-blue-600'}`} 
             onClick={() => !hasVoted && !isOwn && vote(resource.id, 'resource', 1)}
             disabled={hasVoted || isOwn}
           >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
           </button>
           <span className={`text-xs font-black ${hasVoted ? 'text-blue-600' : 'text-slate-600'}`}>{resource.votes}</span>
        </div>
      </div>
      <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed flex-grow">{resource.description}</p>
      
      <div className="flex flex-wrap gap-1.5 mb-5">
        {resource.tags.slice(0, 3).map(t => <span key={t} className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-lg uppercase">#{t}</span>)}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">Shared by</span>
          <span className="text-xs font-bold text-slate-700 truncate max-w-[100px]">{resource.userName}</span>
        </div>
        <a 
          href={resource.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          <span className="hidden xs:inline">Download</span> ({resource.downloads})
        </a>
      </div>
    </div>
  );
};

export const ExamCountdownCard: React.FC<{ exam: Exam }> = ({ exam }) => {
  const examDate = new Date(exam.date);
  const now = new Date();
  const diffTime = examDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-black px-2.5 py-1 bg-red-50 text-red-600 rounded-lg uppercase tracking-wider">Exam Countdown</span>
        <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          {diffDays > 0 ? `${diffDays} Days Left` : 'Exam Today!'}
        </div>
      </div>
      <h3 className="font-bold text-slate-900 mb-1 leading-tight">{exam.course}</h3>
      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
        <span>{examDate.toLocaleDateString()} • {exam.location}</span>
      </div>
      <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
        <div 
          className="bg-red-500 h-full rounded-full transition-all duration-1000" 
          style={{ width: `${Math.max(0, Math.min(100, (30 - diffDays) / 30 * 100))}%` }}
        ></div>
      </div>
    </div>
  );
};

export const StudyTipCard: React.FC<{ tip: StudyTip }> = ({ tip }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 p-5 shadow-sm relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1a1 1 0 112 0v1a1 1 0 11-2 0zM13.536 15.657a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM16 18a1 1 0 100-2 1 1 0 000 2z" /></svg>
      </div>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-black px-2.5 py-1 bg-blue-600 text-white rounded-lg uppercase tracking-wider shadow-md shadow-blue-100">Daily Tip</span>
      </div>
      <p className="text-slate-700 text-sm font-medium leading-relaxed italic mb-4">"{tip.content}"</p>
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">— {tip.author}</span>
      </div>
    </div>
  );
};
