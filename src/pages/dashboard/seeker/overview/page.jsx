import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import taskService from '@/api/taskService';
import walletService from '@/api/walletService';
import { useAuth } from '@/context/AuthContext';

const statusConfig = {
  Open: { label: 'Open', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'ri-door-open-line' },
  Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'ri-time-line' },
  InProgress: { label: 'In Progress', color: 'text-sky-600', bg: 'bg-sky-50', icon: 'ri-loader-3-line' },
  Completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'ri-check-double-line' },
  Cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50', icon: 'ri-close-circle-line' },
};

const recentActivity = [
  { icon: 'ri-user-add-line', color: 'text-sky-500 bg-sky-50', text: 'New offer received on your task', time: 'Recently' },
  { icon: 'ri-check-line', color: 'text-emerald-500 bg-emerald-50', text: 'Task completed successfully', time: 'Recently' },
  { icon: 'ri-star-line', color: 'text-amber-500 bg-amber-50', text: 'You received a new review', time: 'Recently' },
];

export default function SeekerOverviewPage() {
  const { profile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [tasksData, walletData] = await Promise.allSettled([
          taskService.getMyTasks({ pageSize: 50 }),
          walletService.getWallet(),
        ]);
        setTasks(tasksData.status === 'fulfilled' ? (tasksData.value?.items || tasksData.value || []) : []);
        setWallet(walletData.status === 'fulfilled' ? walletData.value : null);
      } catch {
        // errors handled per-promise
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openTasks = tasks.filter((t) => t.status === 'Open');
  const completedCount = tasks.filter((t) => t.status === 'Completed').length;
  const activeCount = tasks.filter((t) => t.status === 'InProgress' || t.status === 'Open').length;
  const balance = wallet?.balance ?? 0;

  const stats = [
    { label: 'Total Tasks Posted', value: tasks.length, icon: 'ri-task-line', color: 'text-sky-500', bg: 'bg-sky-50', change: 'All time' },
    { label: 'Active Tasks', value: activeCount, icon: 'ri-loader-3-line', color: 'text-amber-500', bg: 'bg-amber-50', change: 'In progress / Open' },
    { label: 'Completed Tasks', value: completedCount, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50', change: 'Successfully done' },
    { label: 'Wallet Balance', value: `${wallet?.currency || 'EGP'} ${balance.toLocaleString()}`, icon: 'ri-money-dollar-circle-line', color: 'text-[#e94560]', bg: 'bg-[#e94560]/10', change: 'Available' },
  ];
  return (
    <SeekerLayout title="Dashboard" subtitle="Welcome back, Sara!">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${s.bg}`}>
                  <i className={`${s.icon} text-lg ${s.color}`}></i>
                </div>
              </div>
              <div className="text-2xl font-black text-[#1a1a2e] mb-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
                {s.value}
              </div>
              <div className="text-xs font-medium text-gray-500 mb-1">{s.label}</div>
              <div className="text-xs text-gray-400">{s.change}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-[#1a1a2e]">Recent Tasks</h3>
              <Link to="/dashboard/seeker/tasks" className="text-xs text-[#e94560] font-medium hover:underline whitespace-nowrap">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-50">
              {mockTasks.slice(0, 5).map((task) => {
                const cfg = statusConfig[task.status];
                return (
                  <Link
                    key={task.id}
                    to={`/dashboard/seeker/tasks/${task.id}`}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-[#fafafa] transition-colors group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#1a1a2e] truncate group-hover:text-[#e94560] transition-colors">
                        {task.title}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-400">{task.category}</span>
                        {task.budget && (
                          <span className="text-xs text-gray-400">${task.budget}</span>
                        )}
                        <span className="text-xs text-gray-400">{task.offers.length} offer{task.offers.length !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                      {cfg.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/dashboard/seeker/tasks/new"
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#e94560] text-white hover:bg-[#c73652] transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/20">
                    <i className="ri-add-line text-base"></i>
                  </div>
                  <span className="text-sm font-semibold">Post a New Task</span>
                </Link>
                <Link
                  to="/helpers"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#e94560]/30 hover:bg-[#fafafa] transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                    <i className="ri-search-2-line text-gray-600 text-base"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Browse Helpers</span>
                </Link>
                <Link
                  to="/dashboard/seeker/wallet"
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-[#e94560]/30 hover:bg-[#fafafa] transition-colors group"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
                    <i className="ri-wallet-3-line text-gray-600 text-base"></i>
                  </div>
                  <span className="text-sm font-medium text-gray-700">Add Funds</span>
                </Link>
              </div>
            </div>
            {openTasks.some((t) => t.offers.length > 0) && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-100 shrink-0">
                    <i className="ri-notification-3-line text-amber-600 text-base"></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-amber-800 mb-0.5">New Offers Waiting!</div>
                    <div className="text-xs text-amber-700 mb-2">
                      You have {openTasks.reduce((acc, t) => acc + t.offers.filter(o => o.status === 'Pending').length, 0)} pending offers to review.
                    </div>
                    <Link to="/dashboard/seeker/tasks" className="text-xs font-bold text-amber-700 hover:underline whitespace-nowrap">
                      Review offers →
                    </Link>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-[#1a1a2e] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/60 text-xs font-medium">Wallet Balance</span>
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-wallet-3-line text-white/40 text-sm"></i>
                </div>
              </div>
              <div className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>$1,240</div>
              <div className="text-white/40 text-xs mb-4">Available balance</div>
              <Link
                to="/dashboard/seeker/wallet"
                className="block text-center py-2 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
              >
                Add Funds
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-[#1a1a2e]">Recent Activity</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex items-start gap-4 px-5 py-3.5">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg shrink-0 ${item.color}`}>
                  <i className={`${item.icon} text-sm`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700">{item.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
}