
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

  // Routing Simulation
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-40 items-end">
        {/* Share Resource FAB */}
        <div className="flex items-center gap-3 group">
          <span className="bg-indigo-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
            Share Resource
          </span>
          <button 
            onClick={() => setShowShareModal(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Share Resource"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>

        {/* Ask Question FAB */}
        <div className="flex items-center gap-3 group">
          <span className="bg-blue-900 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
            Ask Question
          </span>
          <button 
            onClick={() => setShowAskModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
            aria-label="Ask Question"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
