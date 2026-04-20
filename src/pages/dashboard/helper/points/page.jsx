import { useState } from 'react';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { allBadges, pointsHistory, leaderboard } from '@/mocks/helperDashboard';
const tabs = [
  { key: 'badges', label: 'Badges', icon: 'ri-medal-line' },
  { key: 'history', label: 'Points History', icon: 'ri-history-line' },
  { key: 'leaderboard', label: 'Leaderboard', icon: 'ri-trophy-line' },
];
export default function PointsBadgesPage() {
  const [activeTab, setActiveTab] = useState('badges');
  const [hoveredBadge, setHoveredBadge] = useState(null);
  const totalPoints = 430;
  const nextBadgePoints = 500;
  const earnedBadges = allBadges.filter((b) => b.earned);
  const lockedBadges = allBadges.filter((b) => !b.earned);
  return (
    <HelperLayout title="Points &amp; Badges" subtitle="Track your achievements and rank on the leaderboard">
      <div className="p-6 space-y-6">
        <div className="bg-[#1a1a2e] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#e94560]/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-1">Your Points Balance</p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-white">{totalPoints}</span>
                  <span className="text-white/50 text-sm mb-1">pts</span>
                </div>
                <p className="text-white/40 text-xs mt-1">Rank #7 this month</p>
              </div>
              <div className="flex gap-3">
                {earnedBadges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl">
                    <i className={`${badge.icon} text-xl ${badge.color}`}></i>
                  </div>
                ))}
                {earnedBadges.length > 3 && (
                  <div className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-white/50 text-sm font-bold">
                    +{earnedBadges.length - 3}
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-white/50">Progress to <span className="text-amber-400 font-semibold">Top Helper</span> badge</span>
                <span className="text-white font-semibold">{totalPoints} / {nextBadgePoints} pts</span>
              </div>
              <div className="bg-white/10 rounded-full h-2">
                <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${(totalPoints / nextBadgePoints) * 100}%` }}></div>
              </div>
              <p className="text-white/30 text-xs mt-1.5">{nextBadgePoints - totalPoints} more points needed</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { icon: 'ri-check-double-line', label: 'Complete a task', pts: '+40-60 pts', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { icon: 'ri-star-line', label: '5-star review', pts: '+30 pts', color: 'text-amber-500', bg: 'bg-amber-50' },
            { icon: 'ri-flashlight-line', label: 'Early delivery', pts: '+20 pts', color: 'text-orange-500', bg: 'bg-orange-50' },
            { icon: 'ri-user-add-line', label: 'Refer a helper', pts: '+50 pts', color: 'text-violet-500', bg: 'bg-violet-50' },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
              <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${item.bg} mx-auto mb-2`}>
                <i className={`${item.icon} text-base ${item.color}`}></i>
              </div>
              <p className="text-xs text-gray-500 mb-1">{item.label}</p>
              <p className="text-sm font-bold text-emerald-600">{item.pts}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.key ? 'bg-white text-[#1a1a2e]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              <div className="w-4 h-4 flex items-center justify-center">
                <i className={`${tab.icon} text-sm`}></i>
              </div>
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Earned Badges ({earnedBadges.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {earnedBadges.map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white rounded-xl border border-gray-100 p-4 text-center cursor-pointer hover:border-gray-200 transition-all relative"
                    onMouseEnter={() => setHoveredBadge(badge.id)}
                    onMouseLeave={() => setHoveredBadge(null)}
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl mx-auto mb-2 ${badge.color.replace('text-', 'bg-').replace('-500', '-50').replace('-600', '-50')}`}>
                      <i className={`${badge.icon} text-2xl ${badge.color}`}></i>
                    </div>
                    <p className="text-xs font-bold text-[#1a1a2e]">{badge.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{badge.earnedAt}</p>
                    {hoveredBadge === badge.id && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a2e] text-white text-xs rounded-lg px-3 py-2 w-40 text-center z-10 pointer-events-none">
                        {badge.description}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a2e]"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Locked Badges ({lockedBadges.length})</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {lockedBadges.map((badge) => {
                  const progress = badge.currentPoints ? Math.min((badge.currentPoints / badge.pointsRequired) * 100, 100) : 0;
                  return (
                    <div
                      key={badge.id}
                      className="bg-white rounded-xl border border-gray-100 p-4 text-center opacity-60 cursor-pointer hover:opacity-80 transition-all relative"
                      onMouseEnter={() => setHoveredBadge(badge.id)}
                      onMouseLeave={() => setHoveredBadge(null)}
                    >
                      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-100 mx-auto mb-2 relative">
                        <i className={`${badge.icon} text-2xl text-gray-400`}></i>
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 rounded-xl">
                          <i className="ri-lock-line text-gray-400 text-sm"></i>
                        </div>
                      </div>
                      <p className="text-xs font-bold text-gray-500">{badge.name}</p>
                      <div className="mt-2 bg-gray-100 rounded-full h-1">
                        <div className="bg-[#e94560] h-1 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{badge.currentPoints || 0}/{badge.pointsRequired} pts</p>
                      {hoveredBadge === badge.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#1a1a2e] text-white text-xs rounded-lg px-3 py-2 w-40 text-center z-10 pointer-events-none">
                          {badge.description}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#1a1a2e]"></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-50">
              {pointsHistory.map((entry) => (
                <div key={entry.id} className="px-5 py-4 flex items-center gap-4">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${entry.type === 'earned' ? 'bg-emerald-50' : 'bg-rose-50'}`}>
                    <i className={`${entry.icon} text-base ${entry.type === 'earned' ? 'text-emerald-500' : 'text-rose-500'}`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1a1a2e]">{entry.description}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{entry.date}</p>
                  </div>
                  <div className={`text-sm font-bold whitespace-nowrap ${entry.type === 'earned' ? 'text-emerald-600' : 'text-rose-500'}`}>
                    {entry.type === 'earned' ? '+' : ''}{entry.points} pts
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#1a1a2e]">Monthly Leaderboard — April 2026</h3>
              <p className="text-xs text-gray-400 mt-0.5">Top helpers ranked by points earned this month</p>
            </div>
            <div className="divide-y divide-gray-50">
              {leaderboard.map((entry) => {
                const rankColors = { 1: 'text-amber-500', 2: 'text-gray-400', 3: 'text-amber-700' };
                const rankBg = { 1: 'bg-amber-50', 2: 'bg-gray-50', 3: 'bg-amber-50/50' };
                return (
                  <div
                    key={entry.rank}
                    className={`px-5 py-4 flex items-center gap-4 ${entry.isCurrentUser ? 'bg-[#e94560]/5 border-l-2 border-[#e94560]' : ''}`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-sm shrink-0 ${rankColors[entry.rank] ? rankBg[entry.rank] : 'bg-gray-50'} ${rankColors[entry.rank] || 'text-gray-500'}`}>
                      {entry.rank <= 3 ? <i className={`ri-trophy-line text-base`}></i> : entry.rank}
                    </div>
                    <img src={entry.avatar} alt={entry.name} className="w-9 h-9 rounded-full object-cover object-top shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-bold ${entry.isCurrentUser ? 'text-[#e94560]' : 'text-[#1a1a2e]'}`}>{entry.name}</p>
                        {entry.isCurrentUser && <span className="text-xs bg-[#e94560]/10 text-[#e94560] px-1.5 py-0.5 rounded-full font-semibold">You</span>}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-gray-400">{entry.badge}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">{entry.completedTasks} tasks</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className={`text-sm font-bold ${rankColors[entry.rank] || 'text-[#1a1a2e]'}`}>{entry.points} pts</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </HelperLayout>
  );
}
