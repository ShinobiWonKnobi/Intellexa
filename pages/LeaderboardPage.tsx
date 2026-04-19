
import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_USERS } from '../constants';

const LeaderboardPage: React.FC = () => {
  const { user: currentUser } = useApp();

  const sortedUsers = useMemo(() => {
    // Combine mock users with current user if not already present
    let allUsers = [...MOCK_USERS];
    
    if (currentUser && !allUsers.find(u => u.id === currentUser.id)) {
      allUsers.push(currentUser);
    } else if (currentUser) {
      // Update current user in the list if they are already there
      allUsers = allUsers.map(u => u.id === currentUser.id ? currentUser : u);
    }

    return allUsers.sort((a, b) => b.karma - a.karma);
  }, [currentUser]);

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
            <div 
              key={user.id} 
              className={`p-6 grid grid-cols-12 items-center transition-colors ${user.id === currentUser?.id ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}
            >
              <div className="col-span-1 flex items-center justify-center">
                {idx === 0 ? <span className="text-2xl">🥇</span> : 
                 idx === 1 ? <span className="text-2xl">🥈</span> : 
                 idx === 2 ? <span className="text-2xl">🥉</span> : 
                 <span className="font-bold text-slate-400">#{idx + 1}</span>}
              </div>
              <div className="col-span-7 flex items-center gap-4 px-4">
                <img src={user.avatar} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{user.name}</span>
                    {user.id === currentUser?.id && (
                      <span className="text-[8px] font-black bg-blue-600 text-white px-1.5 py-0.5 rounded uppercase tracking-tighter">You</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">Member since {new Date(user.joinedAt).getFullYear()}</span>
                </div>
              </div>
              <div className="col-span-2 text-center font-medium text-slate-700">
                {user.contributions}
              </div>
              <div className="col-span-2 text-right">
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${user.id === currentUser?.id ? 'bg-blue-600 text-white' : 'bg-green-50 text-green-700'}`}>
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
