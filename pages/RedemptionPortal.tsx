
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { REDEMPTION_ITEMS } from '../constants';
import { RedemptionItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Shirt, 
  Users, 
  BookOpen, 
  Coffee, 
  Award, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

const iconMap: Record<string, any> = {
  Zap,
  Shirt,
  Users,
  BookOpen,
  Coffee,
  Award
};

const RedemptionPortal: React.FC = () => {
  const { user, redeemItem, redemptions } = useApp();
  const [filter, setFilter] = useState<'all' | 'perk' | 'merch' | 'academic'>('all');
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [showError, setShowError] = useState<string | null>(null);

  const filteredItems = REDEMPTION_ITEMS.filter(item => 
    filter === 'all' || item.category === filter
  );

  const handleRedeem = (item: RedemptionItem) => {
    if (redeemItem(item)) {
      setShowSuccess(item.title);
      setTimeout(() => setShowSuccess(null), 3000);
    } else {
      setShowError("Insufficient karma points!");
      setTimeout(() => setShowError(null), 3000);
    }
  };

  const userRedemptions = redemptions.filter(r => r.userId === user?.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Section */}
      <div className="bg-slate-900 rounded-[2rem] p-8 sm:p-12 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4 text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl font-extrabold font-poppins tracking-tight">
              Karma <span className="text-blue-400">Redemption</span>
            </h1>
            <p className="text-slate-400 max-w-md text-lg">
              Your contributions matter. Turn your hard-earned karma into exclusive perks, merch, and academic advantages.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[200px]">
            <span className="text-sm font-bold text-blue-400 uppercase tracking-widest block mb-1">Available Balance</span>
            <div className="text-4xl font-black font-mono">{user?.karma.toLocaleString()}</div>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Karma Points</span>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex items-center gap-3 text-emerald-700 shadow-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Successfully redeemed: {showSuccess}! Check your email for details.</span>
          </motion.div>
        )}
        {showError && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-center gap-3 text-red-700 shadow-sm"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="font-bold">{showError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Catalog */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Reward Catalog</h2>
            <div className="flex gap-2 bg-white p-1 rounded-xl border border-slate-200">
              {(['all', 'perk', 'merch', 'academic'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider ${
                    filter === cat ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const Icon = iconMap[item.icon] || Zap;
              const canAfford = (user?.karma || 0) >= item.cost;

              return (
                <motion.div
                  key={item.id}
                  layout
                  className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-blue-100 transition-all group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        item.category === 'academic' ? 'bg-amber-50 text-amber-600' :
                        item.category === 'merch' ? 'bg-purple-50 text-purple-600' :
                        'bg-blue-50 text-blue-600'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-black font-mono text-slate-900">{item.cost}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Points</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRedeem(item)}
                    disabled={!canAfford}
                    className={`mt-6 w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                      canAfford 
                        ? 'bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-slate-200' 
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Now' : 'Not Enough Karma'}
                    {canAfford && <ArrowRight className="w-4 h-4" />}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: History */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Your History</h2>
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 space-y-6">
            {userRedemptions.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-slate-400 text-sm font-medium">No redemptions yet.<br/>Start contributing to earn points!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRedemptions.map((redemption) => {
                  const item = REDEMPTION_ITEMS.find(i => i.id === redemption.itemId);
                  if (!item) return null;
                  const Icon = iconMap[item.icon] || Zap;

                  return (
                    <div key={redemption.id} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate">{item.title}</h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          {new Date(redemption.redeemedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        Active
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="pt-6 border-t border-slate-100">
              <div className="bg-blue-50 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">How to earn more?</h4>
                <ul className="text-xs text-blue-700 space-y-1.5">
                  <li className="flex items-center gap-2">• Answer questions (+10)</li>
                  <li className="flex items-center gap-2">• Share resources (+15)</li>
                  <li className="flex items-center gap-2">• Get upvoted (+1)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RedemptionPortal;
