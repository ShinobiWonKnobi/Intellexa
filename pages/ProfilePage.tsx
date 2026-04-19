
import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Gift, ArrowRight, Clock, Trophy } from 'lucide-react';
import { REDEMPTION_ITEMS, MOCK_USERS } from '../constants';

const ProfilePage: React.FC = () => {
  const { user, updateUser, redemptions } = useApp();
  const userRedemptions = redemptions.filter(r => r.userId === user?.id);
  
  const userRank = useMemo(() => {
    if (!user) return 0;
    const allUsers = [...MOCK_USERS];
    if (!allUsers.find(u => u.id === user.id)) allUsers.push(user);
    else allUsers.forEach((u, i) => { if (u.id === user.id) allUsers[i] = user; });
    const sorted = allUsers.sort((a, b) => b.karma - a.karma);
    return sorted.findIndex(u => u.id === user.id) + 1;
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newAvatar, setNewAvatar] = useState(user?.avatar || '');

  const avatarOptions = [
    `https://picsum.photos/seed/${user?.email}/200`,
    `https://picsum.photos/seed/student1/200`,
    `https://picsum.photos/seed/student2/200`,
    `https://picsum.photos/seed/student3/200`,
    `https://picsum.photos/seed/student4/200`,
    `https://picsum.photos/seed/student5/200`,
  ];

  const handleSave = () => {
    updateUser({ name: newName, avatar: newAvatar });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-4 right-8 text-white/60 text-[10px] font-black uppercase tracking-[0.2em] hidden sm:block">Intellexa Member</div>
        </div>
        <div className="px-4 sm:px-8 pb-8">
          <div className="relative -mt-12 sm:-mt-16 mb-6 flex justify-between items-end">
            <div className="relative group">
              <img src={isEditing ? newAvatar : user?.avatar} className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl border-4 border-white shadow-lg bg-white object-cover" alt="" />
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
              )}
            </div>
            {isEditing ? (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setIsEditing(false);
                    setNewName(user?.name || '');
                    setNewAvatar(user?.avatar || '');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2 rounded-xl text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md transition-all"
                >
                  Save Changes
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsEditing(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-md transition-all"
              >
                Edit Profile
              </button>
            )}
          </div>
          
          <div className="space-y-1 mb-8">
            {isEditing ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                  <input 
                    type="text"
                    className="text-2xl font-extrabold text-slate-900 font-poppins w-full bg-slate-50 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Choose Avatar</label>
                  <div className="flex flex-wrap gap-3">
                    {avatarOptions.map((url, i) => (
                      <button 
                        key={i}
                        onClick={() => setNewAvatar(url)}
                        className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all ${newAvatar === url ? 'border-blue-600 scale-110 shadow-lg' : 'border-transparent hover:border-slate-200'}`}
                      >
                        <img src={url} className="w-full h-full object-cover" alt="" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-extrabold text-slate-900 font-poppins">{user?.name}</h1>
                  {user?.role !== 'user' && (
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider ${user?.role === 'admin' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                      {user?.role}
                    </span>
                  )}
                </div>
                <p className="text-slate-500 font-medium">{user?.email}</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center group hover:border-blue-200 transition-colors">
              <div className="flex flex-col items-start sm:items-center">
                <span className="text-2xl sm:text-3xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">{user?.karma}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Karma Points</span>
              </div>
              <div className="sm:hidden w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <Gift className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center group hover:border-indigo-200 transition-colors">
              <div className="flex flex-col items-start sm:items-center">
                <span className="text-2xl sm:text-3xl font-black text-indigo-600 mb-1 group-hover:scale-110 transition-transform">{user?.contributions}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Contributions</span>
              </div>
              <div className="sm:hidden w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                <Clock className="w-5 h-5" />
              </div>
            </div>
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-100 flex flex-row sm:flex-col items-center justify-between sm:justify-center text-center group hover:border-green-200 transition-colors">
              <div className="flex flex-col items-start sm:items-center">
                <span className="text-2xl sm:text-3xl font-black text-green-600 mb-1 group-hover:scale-110 transition-transform">#{userRank}</span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase">Ranking</span>
              </div>
              <div className="sm:hidden w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Trophy className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Redemption History */}
      <div className="mt-6 sm:mt-8 bg-white rounded-3xl border border-slate-200 p-5 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Redemption History</h2>
          </div>
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            {userRedemptions.length} Items Redeemed
          </div>
        </div>

        {userRedemptions.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-400 text-sm font-medium">No redemptions yet. Visit the portal to use your karma!</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {userRedemptions.map((redemption) => {
              const item = REDEMPTION_ITEMS.find(i => i.id === redemption.itemId);
              if (!item) return null;
              return (
                <div key={redemption.id} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-purple-200 transition-colors">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                      Redeemed on {new Date(redemption.redeemedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 bg-white px-2 py-1 rounded-lg border border-slate-100">
                    {item.cost} pts
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
