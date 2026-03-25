
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useApp();
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
        <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-4 right-8 text-white/60 text-[10px] font-black uppercase tracking-[0.2em]">Intellexa Member</div>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex justify-between items-end">
            <div className="relative group">
              <img src={isEditing ? newAvatar : user?.avatar} className="w-32 h-32 rounded-3xl border-4 border-white shadow-lg bg-white object-cover" alt="" />
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
                <h1 className="text-3xl font-extrabold text-slate-900 font-poppins">{user?.name}</h1>
                <p className="text-slate-500 font-medium">{user?.email}</p>
              </>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-blue-200 transition-colors">
              <span className="text-3xl font-black text-blue-600 mb-1 group-hover:scale-110 transition-transform">{user?.karma}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Karma Points</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-indigo-200 transition-colors">
              <span className="text-3xl font-black text-indigo-600 mb-1 group-hover:scale-110 transition-transform">{user?.contributions}</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Total Contributions</span>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col items-center justify-center text-center group hover:border-green-200 transition-colors">
              <span className="text-3xl font-black text-green-600 mb-1 group-hover:scale-110 transition-transform">Top 5%</span>
              <span className="text-xs font-bold text-slate-500 uppercase">Ranking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
