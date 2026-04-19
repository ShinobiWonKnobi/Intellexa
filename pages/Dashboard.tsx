
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard, ResourceCard, ExamCountdownCard, StudyTipCard } from '../components/Cards';
import { POPULAR_COURSES, UPCOMING_EXAMS, STUDY_TIPS } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Question, Resource } from '../types';
import { Gift, ArrowRight } from 'lucide-react';

const Dashboard: React.FC<{ 
  onSelectQuestion: (id: string) => void; 
  searchQuery: string; 
  onClearSearch: () => void;
  onTabChange: (tab: string) => void;
}> = ({ onSelectQuestion, searchQuery, onClearSearch, onTabChange }) => {
  const { questions, resources, answers, user } = useApp();
  const [activeTab, setActiveTab] = useState<'questions' | 'resources' | 'my'>('questions');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const statsData = useMemo(() => [
    { name: 'Questions', val: questions.length, color: '#3B82F6' },
    { name: 'Answers', val: answers.length, color: '#10B981' },
    { name: 'Materials', val: resources.length, color: '#8B5CF6' }
  ], [questions.length, answers.length, resources.length]);

  const filteredQuestions = useMemo(() => {
    let qs = [...questions];
    if (searchQuery) {
      qs = qs.filter(q => 
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedCourse) {
      qs = qs.filter(q => q.course === selectedCourse);
    }
    return qs;
  }, [questions, searchQuery, selectedCourse]);

  const filteredResources = useMemo(() => {
    let rs = [...resources];
    if (searchQuery) {
      rs = rs.filter(r => 
        r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (selectedCourse) {
      rs = rs.filter(r => r.course === selectedCourse);
    }
    return rs;
  }, [resources, searchQuery, selectedCourse]);

  const myContributions = useMemo(() => {
    let combined = [
      ...questions.filter(q => q.userId === user?.id).map(q => ({ ...q, itemType: 'question' as const })),
      ...resources.filter(r => r.userId === user?.id).map(r => ({ ...r, itemType: 'resource' as const }))
    ];

    if (searchQuery) {
      combined = combined.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.itemType === 'question' && (item as Question).content.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.itemType === 'resource' && (item as Resource).description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCourse) {
      combined = combined.filter(item => item.course === selectedCourse);
    }

    return combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [questions, resources, user, searchQuery, selectedCourse]);

  const allCourses = useMemo(() => {
    const courses = new Set(POPULAR_COURSES);
    questions.forEach(q => courses.add(q.course));
    resources.forEach(r => courses.add(r.course));
    return Array.from(courses).sort();
  }, [questions, resources]);

  return (
    <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Sidebar - Course Filter */}
      <aside className="space-y-6 order-2 lg:order-1 min-w-0">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Filter by Course</h3>
          <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:pr-1 custom-scrollbar pb-2 lg:pb-0">
            <button 
              onClick={() => setSelectedCourse(null)}
              className={`text-left text-sm py-2 px-4 lg:px-3 rounded-xl transition-all whitespace-nowrap ${!selectedCourse ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600 bg-slate-50 lg:bg-transparent'}`}
            >
              All Courses
            </button>
            {allCourses.map(course => (
              <button 
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`text-left text-sm py-2 px-4 lg:px-3 rounded-xl transition-all whitespace-nowrap ${selectedCourse === course ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600 bg-slate-50 lg:bg-transparent'}`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Karma Redemption Widget */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-5 shadow-xl shadow-purple-100 text-white group cursor-pointer overflow-hidden relative" onClick={() => onTabChange('redemption')}>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                <Gift className="w-5 h-5" />
              </div>
              <div className="text-right">
                <div className="text-xl font-black font-mono leading-none">{user?.karma}</div>
                <div className="text-[8px] font-bold text-white/60 uppercase tracking-widest mt-1">Points</div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold">Redeem Rewards</h4>
              <p className="text-[10px] text-white/70 font-medium leading-relaxed">Turn your karma into exclusive campus perks & merch.</p>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest pt-1 group-hover:gap-3 transition-all">
              Browse Portal <ArrowRight className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Stats Section - Hidden on mobile to keep content primary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hidden lg:block">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Live Stats</h3>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData}>
                <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="val" radius={[4, 4, 4, 4]}>
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Exam Countdown Widget */}
        <div className="hidden lg:block space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">Upcoming Exams</h3>
          {UPCOMING_EXAMS.slice(0, 2).map(exam => (
            <ExamCountdownCard key={exam.id} exam={exam} />
          ))}
        </div>

        {/* Daily Tip Widget */}
        <div className="hidden lg:block">
          <StudyTipCard tip={STUDY_TIPS[Math.floor(Date.now() / 86400000) % STUDY_TIPS.length]} />
        </div>
      </aside>

      {/* Main Area */}
      <div className="lg:col-span-3 space-y-6 order-1 lg:order-2 min-w-0">
        {/* Mobile Widgets */}
        <div className="lg:hidden space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <StudyTipCard tip={STUDY_TIPS[Math.floor(Date.now() / 86400000) % STUDY_TIPS.length]} />
            {UPCOMING_EXAMS.length > 0 && <ExamCountdownCard exam={UPCOMING_EXAMS[0]} />}
          </div>
        </div>

        {searchQuery && (
          <div className="bg-blue-600 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-100">
            <p className="text-sm text-white font-medium">Search: "<span className="font-bold">{searchQuery}</span>"</p>
            <button onClick={onClearSearch} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        )}

        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto no-scrollbar scroll-smooth">
          <button 
            onClick={() => setActiveTab('questions')}
            className={`pb-3 text-sm font-bold px-4 transition-all relative whitespace-nowrap ${activeTab === 'questions' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Questions ({filteredQuestions.length})
            {activeTab === 'questions' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('resources')}
            className={`pb-3 text-sm font-bold px-4 transition-all relative whitespace-nowrap ${activeTab === 'resources' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            Resources ({filteredResources.length})
            {activeTab === 'resources' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('my')}
            className={`pb-3 text-sm font-bold px-4 transition-all relative whitespace-nowrap ${activeTab === 'my' ? 'text-blue-600' : 'text-slate-500 hover:text-slate-800'}`}
          >
            My Activity
            {activeTab === 'my' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
          </button>
        </div>

        <div className="grid gap-4">
          {activeTab === 'questions' && (
            filteredQuestions.length > 0 ? (
              filteredQuestions.map(q => <QuestionCard key={q.id} question={q} onClick={() => onSelectQuestion(q.id)} />)
            ) : (
              <EmptyState title="No questions found" subtitle="Try adjusting your search or course filters." />
            )
          )}
          {activeTab === 'resources' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredResources.length > 0 ? (
                filteredResources.map(r => <ResourceCard key={r.id} resource={r} />)
              ) : (
                <div className="sm:col-span-2"><EmptyState title="No resources found" subtitle="Help your campus by uploading helpful study guides!" /></div>
              )}
            </div>
          )}
          {activeTab === 'my' && (
            myContributions.length > 0 ? (
              <div className="grid gap-4">
                {myContributions.map(item => (
                  item.itemType === 'question' 
                  ? <QuestionCard key={item.id} question={item as any} onClick={() => onSelectQuestion(item.id)} />
                  : <div className="sm:max-w-none"><ResourceCard key={item.id} resource={item as any} /></div>
                ))}
              </div>
            ) : (
              <EmptyState title="No history yet" subtitle="Your questions and resources will be listed here." />
            )
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="py-16 flex flex-col items-center justify-center text-center px-6 bg-white rounded-3xl border border-slate-100 shadow-sm border-dashed">
    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    </div>
    <h3 className="text-lg font-bold text-slate-900">{title}</h3>
    <p className="text-slate-500 text-sm max-w-xs mx-auto">{subtitle}</p>
  </div>
);

export default Dashboard;
