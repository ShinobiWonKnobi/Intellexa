
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { QuestionCard, ResourceCard } from '../components/Cards';
import { POPULAR_COURSES } from '../constants';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Dashboard: React.FC<{ onSelectQuestion: (id: string) => void; searchQuery: string }> = ({ onSelectQuestion, searchQuery }) => {
  const { questions, resources, user } = useApp();
  const [activeTab, setActiveTab] = useState<'questions' | 'resources' | 'my'>('questions');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const statsData = [
    { name: 'Questions', val: 124, color: '#3B82F6' },
    { name: 'Answers', val: 89, color: '#10B981' },
    { name: 'Materials', val: 45, color: '#8B5CF6' }
  ];

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
    const combined = [
      ...questions.filter(q => q.userId === user?.id).map(q => ({ ...q, itemType: 'question' as const })),
      ...resources.filter(r => r.userId === user?.id).map(r => ({ ...r, itemType: 'resource' as const }))
    ];
    return combined.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [questions, resources, user]);

  return (
    <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Sidebar - Course Filter */}
      <aside className="space-y-6 order-2 lg:order-1">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Filter by Course</h3>
          <div className="flex flex-col gap-1 max-h-[300px] lg:max-h-none overflow-y-auto pr-1 custom-scrollbar">
            <button 
              onClick={() => setSelectedCourse(null)}
              className={`text-left text-sm py-2 px-3 rounded-xl transition-all ${!selectedCourse ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}
            >
              All Courses
            </button>
            {POPULAR_COURSES.map(course => (
              <button 
                key={course}
                onClick={() => setSelectedCourse(course)}
                className={`text-left text-sm py-2 px-3 rounded-xl transition-all ${selectedCourse === course ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-50 text-slate-600'}`}
              >
                {course}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Section - Hidden on mobile to keep content primary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hidden lg:block">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Weekly Stats</h3>
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
      </aside>

      {/* Main Area */}
      <div className="lg:col-span-3 space-y-6 order-1 lg:order-2">
        {searchQuery && (
          <div className="bg-blue-600 p-4 rounded-2xl flex items-center justify-between shadow-lg shadow-blue-100">
            <p className="text-sm text-white font-medium">Search: "<span className="font-bold">{searchQuery}</span>"</p>
            <button onClick={() => setSelectedCourse(null)} className="text-white/80 hover:text-white">
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
              myContributions.map(item => (
                item.itemType === 'question' 
                ? <QuestionCard key={item.id} question={item as any} onClick={() => onSelectQuestion(item.id)} />
                : <ResourceCard key={item.id} resource={item as any} />
              ))
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
