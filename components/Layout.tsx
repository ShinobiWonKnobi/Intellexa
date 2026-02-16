
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
          <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => onTabChange('dashboard')}>
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-blue-100">S</div>
            <span className="text-lg sm:text-xl font-extrabold font-poppins text-slate-900 hidden xs:block">StudyHub</span>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-lg hidden sm:block">
            <div className="relative group">
              <input
                type="text"
                placeholder="Find answers or resources..."
                className="w-full bg-slate-100 border-2 border-transparent rounded-2xl py-2.5 px-12 focus:bg-white focus:border-blue-500 focus:ring-0 transition-all text-sm outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-3 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </form>

          <nav className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-1 sm:gap-2 mr-2">
              <button 
                onClick={() => onTabChange('dashboard')} 
                className={`p-2 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                title="Dashboard"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </button>
              <button 
                onClick={() => onTabChange('leaderboard')} 
                className={`p-2 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-amber-50 text-amber-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                title="Leaderboard"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </button>
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2">
              <div className="hidden md:flex flex-col items-end leading-tight">
                <span className="text-sm font-bold text-slate-900">{user?.name}</span>
                <span className="text-[10px] font-black text-green-600 bg-green-50 px-1.5 rounded uppercase tracking-tighter">★ {user?.karma} Karma</span>
              </div>
              <div className="relative group">
                <img src={user?.avatar} alt="Profile" className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ring-2 ring-slate-100 cursor-pointer object-cover shadow-sm transition-transform hover:scale-105" />
                <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all py-3 px-2">
                  <div className="px-3 pb-3 mb-2 border-b border-slate-100 md:hidden">
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-[10px] font-bold text-green-600">{user?.karma} Karma Points</p>
                  </div>
                  <button onClick={() => onTabChange('profile')} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium hover:bg-slate-50 text-slate-700 transition-colors">
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    View Profile
                  </button>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Mobile Search Bar */}
        <div className="px-4 pb-3 sm:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full bg-slate-100 border-none rounded-xl py-2 px-10 focus:bg-white focus:ring-2 focus:ring-blue-500 transition-all text-sm outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </form>
        </div>
      </header>

      <main className="flex-1 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
              <span className="text-xl font-bold font-poppins text-slate-900">StudyHub</span>
            </div>
            <p className="text-sm text-slate-500 text-center md:text-left max-w-sm">Collaborative learning platform for the next generation of scholars.</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Safety</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center mt-10 pt-10 border-t border-slate-100">
           <span className="text-xs text-slate-400">&copy; 2025 StudyHub Inc. Built for Students.</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
