
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { POPULAR_COURSES } from '../constants';

const AskModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addQuestion } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    course: POPULAR_COURSES[0],
    tags: '',
    anonymous: false,
    urgent: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    addQuestion({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    onClose();
    setFormData({ title: '', content: '', course: POPULAR_COURSES[0], tags: '', anonymous: false, urgent: false });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] transition-all transform scale-100">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-poppins">Ask a Question</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Start a discussion</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Question Title</label>
            <input 
              type="text" 
              placeholder="e.g. 'Struggling with IS-LM model equilibrium'"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base font-medium"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Relevant Course</label>
              <div className="relative">
                <select 
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  {POPULAR_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tags (comma separated)</label>
              <input 
                type="text" 
                placeholder="Midterm, ExamHelp..."
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-medium"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Detailed Context</label>
            <textarea 
              className="w-full h-44 px-5 py-4 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-base font-medium resize-none"
              placeholder="Describe what you're stuck on and what you've tried..."
              required
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-100">
             <div className="flex flex-wrap gap-6">
               <label className="flex items-center gap-3 cursor-pointer select-none group">
                 <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg text-blue-600 border-slate-200 focus:ring-blue-500 cursor-pointer" 
                  checked={formData.anonymous}
                  onChange={(e) => setFormData({...formData, anonymous: e.target.checked})}
                 />
                 <span className="text-xs font-bold text-slate-500 uppercase tracking-widest group-hover:text-slate-700">Anonymous</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer select-none group">
                 <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded-lg text-red-600 border-slate-200 focus:ring-red-500 cursor-pointer" 
                  checked={formData.urgent}
                  onChange={(e) => setFormData({...formData, urgent: e.target.checked})}
                 />
                 <span className="text-xs font-bold text-red-600 uppercase tracking-widest group-hover:text-red-800">Urgent Flag</span>
               </label>
             </div>
             <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-black px-10 py-4 rounded-2xl text-sm shadow-2xl shadow-blue-100 transition-all active:scale-95">
               Post Now (+5 Karma)
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskModal;
