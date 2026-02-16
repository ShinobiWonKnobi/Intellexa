
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const LandingPage: React.FC = () => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const handleDemoLogin = () => {
    setEmail('demo@university.edu');
    login('demo@university.edu');
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2 opacity-60"></div>

      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">S</div>
          <span className="text-2xl font-bold font-poppins text-blue-900">StudyHub</span>
        </div>
        <button onClick={() => setIsLoginView(!isLoginView)} className="text-sm font-semibold text-blue-600 hover:text-blue-700">
          {isLoginView ? 'Create Account' : 'Login'}
        </button>
      </header>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h1 className="text-6xl font-extrabold font-poppins text-slate-900 leading-[1.1]">
            Study together, <br />
            <span className="text-blue-600">succeed together.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
            The exclusive collaborative learning platform for your campus. Share notes, ask tough questions, and earn karma for helping your peers.
          </p>
          
          <div className="grid grid-cols-3 gap-6 pt-4">
            <div className="space-y-1">
              <span className="text-2xl font-bold text-blue-900">5k+</span>
              <p className="text-sm text-slate-500">Active Students</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-blue-900">12k+</span>
              <p className="text-sm text-slate-500">Resources Shared</p>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold text-blue-900">45k+</span>
              <p className="text-sm text-slate-500">Questions Solved</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-between">
             <div className="flex flex-col">
                <span className="text-xs font-bold text-blue-600 uppercase">Development Mode</span>
                <span className="text-sm text-blue-800">Use <code className="font-mono font-bold">demo@university.edu</code> to skip setup.</span>
             </div>
             <button 
               onClick={handleDemoLogin}
               className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors"
             >
               Demo Login
             </button>
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl shadow-2xl border border-slate-100 max-w-md mx-auto lg:mr-0">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">{isLoginView ? 'Welcome Back' : 'Get Started'}</h2>
          <p className="text-slate-500 mb-8 text-sm">Join using your campus email address.</p>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLoginView && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Campus Email</label>
              <input 
                type="email" 
                placeholder="name@university.edu"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                required
              />
            </div>
            
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all transform active:scale-[0.98]">
              {isLoginView ? 'Sign In' : 'Create Campus Account'}
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4 text-xs text-slate-400">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span>TRUSTED BY UNIVERSITIES</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
