
import React from 'react';
import { MOCK_USERS } from '../constants';

const LeaderboardPage: React.FC = () => {
  const sortedUsers = [...MOCK_USERS].sort((a, b) => b.karma - a.karma);

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 font-poppins">Campus Hall of Fame</h1>
        <p className="text-slate-500">Top contributors making learning better for everyone.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-12 text-xs font-bold text-slate-500 uppercase tracking-wider">
          <div className="col-span-1">Rank</div>
          <div className="col-span-7">User</div>
          <div className="col-span-2 text-center">Contributions</div>
          <div className="col-span-2 text-right">Karma Points</div>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedUsers.map((user, idx) => (
            <div key={user.id} className="p-6 grid grid-cols-12 items-center hover:bg-slate-50 transition-colors">
              <div className="col-span-1 flex items-center justify-center">
                {idx === 0 ? <span className="text-2xl">🥇</span> : 
                 idx === 1 ? <span className="text-2xl">🥈</span> : 
                 idx === 2 ? <span className="text-2xl">🥉</span> : 
                 <span className="font-bold text-slate-400">#{idx + 1}</span>}
              </div>
              <div className="col-span-7 flex items-center gap-4 px-4">
                <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{user.name}</span>
                  <span className="text-xs text-slate-500">Member since {new Date(user.joinedAt).getFullYear()}</span>
                </div>
              </div>
              <div className="col-span-2 text-center font-medium text-slate-700">
                {user.contributions}
              </div>
              <div className="col-span-2 text-right">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                  {user.karma.toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
