
import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import QuestionDetailPage from './pages/QuestionDetailPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import AskModal from './components/AskModal';
import ShareModal from './components/ShareModal';

const AppContent: React.FC = () => {
  const { user } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [showAskModal, setShowAskModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  if (!user) {
    return <LandingPage />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedQuestionId(null);
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setActiveTab('dashboard');
    setSelectedQuestionId(null);
  };

  const renderContent = () => {
    if (selectedQuestionId) {
      return <QuestionDetailPage questionId={selectedQuestionId} onBack={() => setSelectedQuestionId(null)} />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onSelectQuestion={setSelectedQuestionId} searchQuery={searchQuery} />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <Dashboard onSelectQuestion={setSelectedQuestionId} searchQuery={searchQuery} />;
    }
  };

  return (
    <Layout activeTab={activeTab} onTabChange={handleTabChange} onSearch={handleSearch}>
      {renderContent()}

      {/* Floating Action Buttons - Improved Mobile Layout */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40 items-end">
        {/* Share Resource FAB */}
        <div className="flex items-center gap-3 group">
          <span className="bg-indigo-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block uppercase tracking-wider">
            Share Resource
          </span>
          <button 
            onClick={() => setShowShareModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-white/20"
            title="Share Resource"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
        </div>

        {/* Ask Question FAB */}
        <div className="flex items-center gap-3 group">
          <span className="bg-blue-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block uppercase tracking-wider">
            Ask Question
          </span>
          <button 
            onClick={() => setShowAskModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 border-2 border-white/20"
            title="Ask Question"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>

      <AskModal isOpen={showAskModal} onClose={() => setShowAskModal(false)} />
      <ShareModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
