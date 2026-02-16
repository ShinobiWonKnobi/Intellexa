
import React from 'react';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <img src={user?.avatar} className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white" alt="" />
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md transition-all">
              Edit Profile
            </button>
          </div>
          
          <div className="space-y-1 mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 font-poppins">{user?.name}</h1>
            <p className="text-slate-500 font-medium">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-blue-600 mb-1">{user?.karma}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Karma Points</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-indigo-600 mb-1">{user?.contributions}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Total Contributions</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-green-600 mb-1">Top 5%</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Ranking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
