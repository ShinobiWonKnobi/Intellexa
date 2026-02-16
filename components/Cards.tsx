
import React from 'react';
import { Question, Resource } from '../types';
import { useApp } from '../context/AppContext';

export const QuestionCard: React.FC<{ question: Question; onClick: () => void }> = ({ question, onClick }) => {
  const { vote } = useApp();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]" onClick={onClick}>
      <div className="flex gap-4">
        {/* Voting - Compact on mobile */}
        <div className="flex flex-col items-center gap-0.5 sm:gap-1" onClick={(e) => e.stopPropagation()}>
          <button 
            className="p-1 text-slate-400 hover:text-blue-600 transition-colors"
            onClick={() => vote(question.id, 'question', 1)}
            aria-label="Upvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
          </button>
          <span className="font-bold text-slate-700 text-sm sm:text-base">{question.votes}</span>
          <button 
            className="p-1 text-slate-400 hover:text-red-600 transition-colors"
            onClick={() => vote(question.id, 'question', -1)}
            aria-label="Downvote"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-50 text-blue-600 rounded-lg uppercase tracking-wider">{question.course.split(':')[0]}</span>
            {question.urgent && <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-600 rounded-lg uppercase tracking-wider animate-pulse">Urgent</span>}
            {question.resolved && <span className="text-[10px] font-bold px-2 py-0.5 bg-green-50 text-green-600 rounded-lg uppercase tracking-wider">Resolved</span>}
          </div>
          <h3 className="font-bold text-base sm:text-lg text-slate-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">{question.title}</h3>
          <p className="text-slate-500 text-sm line-clamp-2 mb-4 leading-relaxed">{question.content}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={question.userAvatar} className="w-6 h-6 rounded-lg shadow-sm" alt="" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                <span className="text-xs font-bold text-slate-700">{question.userName}</span>
                <span className="text-[10px] text-slate-400 hidden sm:inline">•</span>
                <span className="text-[10px] text-slate-400">{new Date(question.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold bg-slate-50 px-2 py-1 rounded-lg">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
              {question.answerCount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResourceCard: React.FC<{ resource: Resource }> = ({ resource }) => {
  const { vote } = useApp();

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
           <button className="text-slate-400 hover:text-blue-600 transition-colors p-1" onClick={() => vote(resource.id, 'resource', 1)}>
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" /></svg>
           </button>
           <span className="text-xs font-black text-slate-600">{resource.votes}</span>
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
