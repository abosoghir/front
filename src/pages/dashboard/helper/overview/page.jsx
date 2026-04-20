import { useState } from 'react';
import { Link } from 'react-router-dom';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { helperActiveTasks, earningsHistory, sentOffers, allBadges } from '@/mocks/helperDashboard';
const statCards = [
  { label: 'Total Earned', value: '$14,500', sub: '+$960 this month', icon: 'ri-money-dollar-circle-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { label: 'Active Tasks', value: '3', sub: '1 under review', icon: 'ri-task-line', color: 'text-sky-500', bg: 'bg-sky-50' },
  { label: 'Completed Tasks', value: '56', sub: '4.8 avg rating', icon: 'ri-check-double-line', color: 'text-violet-500', bg: 'bg-violet-50' },
  { label: 'Points Balance', value: '430 pts', sub: 'Rank #7 this month', icon: 'ri-trophy-line', color: 'text-amber-500', bg: 'bg-amber-50' },
];
const earnedBadges = allBadges.filter((b) => b.earned);
export default function HelperOverviewPage() {
  const [availabilityOn, setAvailabilityOn] = useState(true);
  const pendingOffers = sentOffers.filter((o) => o.status === 'Pending').length;
  return (
    <HelperLayout title="Helper Dashboard" subtitle="Welcome back, Layla!">
      <div className="p-6 space-y-6">
        <div className={`rounded-xl px-5 py-4 flex items-center justify-between ${availabilityOn ? 'bg-emerald-50 border border-emerald-100' : 'bg-gray-50 border border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 flex items-center justify-center rounded-full ${availabilityOn ? 'bg-emerald-100' : 'bg-gray-200'}`}>
              <i className={`ri-user-received-line text-base ${availabilityOn ? 'text-emerald-600' : 'text-gray-500'}`}></i>
            </div>
            <div>
              <p className={`text-sm font-semibold ${availabilityOn ? 'text-emerald-700' : 'text-gray-600'}`}>
                {availabilityOn ? 'You are currently available for new tasks' : 'You are currently unavailable'}
              </p>
              <p className="text-xs text-gray-400">Seekers can see your profile and send you task invitations</p>
            </div>
          </div>
          <button
            onClick={() => setAvailabilityOn(!availabilityOn)}
            className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer ${availabilityOn ? 'bg-emerald-500' : 'bg-gray-300'}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${availabilityOn ? 'left-5' : 'left-0.5'}`}></span>
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${card.bg}`}>
                  <i className={`${card.icon} text-lg ${card.color}`}></i>
                </div>
              </div>
              <div className="text-xl font-bold text-[#1a1a2e]">{card.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.label}</div>
              <div className="text-xs text-emerald-500 font-medium mt-1">{card.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#1a1a2e]">Active Tasks</h3>
              <Link to="/dashboard/helper/tasks" className="text-xs text-[#e94560] font-semibold hover:underline">View all</Link>
            </div>
            <div className="divide-y divide-gray-50">
              {helperActiveTasks.map((task) => (
                <div key={task.id} className="px-5 py-4">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${task.status === 'Active' ? 'bg-sky-50 text-sky-600' : 'bg-amber-50 text-amber-600'
                          }`}>{task.status === 'UnderReview' ? 'Under Review' : task.status}</span>
                        <span className="text-xs text-gray-400">{task.category}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1a1a2e] truncate">{task.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1.5">
                          <img src={task.seekerAvatar} alt={task.seekerName} className="w-4 h-4 rounded-full object-cover object-top" />
                          <span className="text-xs text-gray-400">{task.seekerName}</span>
                        </div>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400">Due {task.deadline}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-bold text-[#1a1a2e]">${task.agreedPrice}</div>
                      <div className="text-xs text-gray-400">agreed</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${task.status === 'UnderReview' ? 'bg-amber-400' : 'bg-[#e94560]'}`}
                        style={{ width: `${task.progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{task.progressPercent}%</span>
                    <Link to={`/dashboard/helper/tasks/${task.id}`} className="text-xs text-[#e94560] font-semibold hover:underline whitespace-nowrap">Manage</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#1a1a2e]">Sent Offers</h3>
                <Link to="/dashboard/helper/offers" className="text-xs text-[#e94560] font-semibold hover:underline">View all</Link>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 flex items-center justify-center bg-amber-50 rounded-lg">
                  <i className="ri-send-plane-line text-amber-500 text-lg"></i>
                </div>
                <div>
                  <div className="text-xl font-bold text-[#1a1a2e]">{pendingOffers}</div>
                  <div className="text-xs text-gray-400">Pending responses</div>
                </div>
              </div>
              <Link to="/dashboard/helper/browse" className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-search-2-line text-sm"></i>
                </div>
                Browse New Tasks
              </Link>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#1a1a2e]">My Badges</h3>
                <Link to="/dashboard/helper/points" className="text-xs text-[#e94560] font-semibold hover:underline">All badges</Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {earnedBadges.map((badge) => (
                  <div key={badge.id} title={badge.name} className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100 cursor-pointer hover:border-gray-200 transition-colors">
                    <i className={`${badge.icon} text-lg ${badge.color}`}></i>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
                  <span>Progress to Top Helper</span>
                  <span className="font-semibold text-[#1a1a2e]">430 / 500 pts</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-amber-400 h-2 rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Recent Earnings</h3>
              <div className="space-y-2.5">
                {earningsHistory.slice(0, 3).map((entry) => (
                  <div key={entry.id} className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1a1a2e] truncate">{entry.taskTitle}</p>
                      <p className="text-xs text-gray-400">{entry.date}</p>
                    </div>
                    <span className="text-sm font-bold text-emerald-600 whitespace-nowrap ml-2">+${entry.netAmount}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard/helper/earnings" className="block text-center text-xs text-[#e94560] font-semibold mt-3 hover:underline">View full history</Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-[#1a1a2e] mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { icon: 'ri-message-3-line', color: 'text-sky-500', bg: 'bg-sky-50', text: 'Sara Mohamed sent you a message about the Brand Identity task', time: '2 hours ago' },
              { icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50', text: 'Your deliverable was approved for the Google Ads campaign', time: '5 hours ago' },
              { icon: 'ri-star-line', color: 'text-amber-500', bg: 'bg-amber-50', text: 'You earned 30 points for a 5-star review', time: '1 day ago' },
              { icon: 'ri-send-plane-line', color: 'text-violet-500', bg: 'bg-violet-50', text: 'Your offer was sent for "Build a React E-Commerce Website"', time: '2 days ago' },
              { icon: 'ri-trophy-line', color: 'text-amber-500', bg: 'bg-amber-50', text: 'You unlocked the "Client Favorite" badge!', time: '3 days ago' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 ${item.bg}`}>
                  <i className={`${item.icon} text-sm ${item.color}`}></i>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-[#1a1a2e]">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </HelperLayout>
  );
}
