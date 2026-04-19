
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GraduationCap, Home, TrendingUp, Search, LogOut, User as UserIcon, Gift, Trophy } from 'lucide-react';

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
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl sm:text-2xl font-extrabold font-poppins text-slate-900 hidden sm:block">Intellexa</span>
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
            <div className="hidden sm:flex items-center gap-1 sm:gap-4">
              <button 
                onClick={() => onTabChange('dashboard')} 
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                title="Home"
              >
                <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={() => onTabChange('leaderboard')} 
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${activeTab === 'leaderboard' ? 'bg-amber-50 text-amber-600' : 'text-slate-400 hover:text-slate-600'}`}
                title="Leaderboard"
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button 
                onClick={() => onTabChange('redemption')} 
                className={`p-2 sm:p-2.5 rounded-xl transition-all ${activeTab === 'redemption' ? 'bg-purple-50 text-purple-600' : 'text-slate-400 hover:text-slate-600'}`}
                title="Redemption Portal"
              >
                <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="h-6 w-px bg-slate-200 mx-1 sm:mx-2"></div>
            </div>

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

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6 sm:py-8 mb-20 sm:mb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex items-center justify-between z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => onTabChange('dashboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Home</span>
        </button>
        <button 
          onClick={() => onTabChange('leaderboard')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'leaderboard' ? 'text-amber-600' : 'text-slate-400'}`}
        >
          <Trophy className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Ranks</span>
        </button>
        <button 
          onClick={() => onTabChange('redemption')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'redemption' ? 'text-purple-600' : 'text-slate-400'}`}
        >
          <Gift className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Store</span>
        </button>
        <button 
          onClick={() => onTabChange('profile')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'profile' ? 'text-slate-900' : 'text-slate-400'}`}
        >
          <UserIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Profile</span>
        </button>
      </div>

      <footer className="bg-white border-t border-slate-200 py-12 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-base font-bold text-slate-900 uppercase tracking-widest">Intellexa</span>
          </div>
          <div className="flex gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">&copy; 2026 Intellexa</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
