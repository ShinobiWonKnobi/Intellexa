
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { POPULAR_COURSES } from '../constants';

const ShareModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { addResource } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    course: POPULAR_COURSES[0],
    tags: '',
    link: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.link.trim()) return;
    addResource({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
    });
    onClose();
    setFormData({ title: '', description: '', course: POPULAR_COURSES[0], tags: '', link: '' });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh] transition-all transform scale-100">
        <div className="p-6 sm:p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-poppins">Share Material</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Upload study resources</p>
          </div>
          <button onClick={onClose} className="p-2.5 hover:bg-white rounded-xl transition-all text-slate-400 hover:text-slate-900 shadow-sm border border-transparent hover:border-slate-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Resource Name</label>
            <input 
              type="text" 
              placeholder="e.g. 'CS401 Lecture Notes - Week 1-5'"
              className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-base font-medium"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course</label>
              <div className="relative">
                <select 
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-bold appearance-none cursor-pointer"
                  value={formData.course}
                  onChange={(e) => setFormData({...formData, course: e.target.value})}
                >
                  {POPULAR_COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <svg className="absolute right-4 top-4 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tags</label>
              <input 
                type="text" 
                placeholder="Notes, PDF, Summary..."
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Link</label>
            <div className="relative">
              <input 
                type="url" 
                placeholder="https://drive.google.com/..."
                className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm font-medium pl-12"
                required
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
              />
              <svg className="absolute left-4 top-4 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Summary/Description</label>
            <textarea 
              className="w-full h-32 px-5 py-4 rounded-2xl bg-slate-50 border-none focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-base font-medium resize-none"
              placeholder="What makes this resource helpful?"
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="flex items-center justify-end pt-6 border-t border-slate-100">
             <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-black px-12 py-4 rounded-2xl text-sm shadow-2xl shadow-indigo-100 transition-all active:scale-95">
               Share Resource (+15 Karma)
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShareModal;
