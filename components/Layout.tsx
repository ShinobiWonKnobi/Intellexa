
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onSearch: (term: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, onSearch }) => {
  const { user, logout } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 cursor-pointer shrink-0" onClick={() => onTabChange('dashboard')}>
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-base sm:text-xl shadow-lg shadow-blue-100">S</div>
            <span className="text-base sm:text-xl font-extrabold font-poppins text-slate-900 hidden xs:block">StudyHub</span>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search resources..."
                className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-2 px-10 focus:bg-white focus:border-blue-500 transition-all text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          <nav className="flex items-center gap-1 sm:gap-4">
            <button 
              onClick={() => onTabChange('dashboard')} 
              className={`p-2 sm:p-2.5 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="Home"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </button>
            <button 
              onClick={() => onTabChange('leaderboard')} 
              className={`p-2 sm:p-2.5 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-amber-50 text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
              title="Leaderboard"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1 sm:mx-2"></div>

            <div className="relative group">
              <div className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-colors">
                <img src={user?.avatar} alt="Profile" className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover ring-2 ring-white shadow-sm" />
                <div className="hidden lg:flex flex-col text-left leading-none">
                  <span className="text-xs font-bold text-slate-800">{user?.name}</span>
                  <span className="text-[10px] font-bold text-blue-500 mt-0.5">{user?.karma} pts</span>
                </div>
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-2 z-50 overflow-hidden">
                <button onClick={() => onTabChange('profile')} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50">Profile</button>
                <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 border-t border-slate-50">Logout</button>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar Only */}
        <div className="px-4 pb-3 sm:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 border-none rounded-xl py-2 px-10 text-xs focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3.5 top-2.5 w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 sm:py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">S</div>
            <span className="text-sm font-bold text-slate-900 uppercase tracking-widest">StudyHub</span>
          </div>
          <div className="flex gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600">Privacy</a>
            <a href="#" className="hover:text-blue-600">Terms</a>
            <a href="#" className="hover:text-blue-600">Support</a>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">&copy; 2025 StudyHub</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
