import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import taskService from '@/api/taskService';

const statusConfig = {
  Open: { label: 'Open', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'ri-door-open-line' },
  Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'ri-time-line' },
  InProgress: { label: 'In Progress', color: 'text-sky-600', bg: 'bg-sky-50', icon: 'ri-loader-3-line' },
  Completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'ri-check-double-line' },
  Cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50', icon: 'ri-close-circle-line' },
  UnderReview: { label: 'Under Review', color: 'text-purple-600', bg: 'bg-purple-50', icon: 'ri-eye-line' },
};

const tabs = [
  { key: 'All', label: 'All Tasks' },
  { key: 'Open', label: 'Open' },
  { key: 'InProgress', label: 'In Progress' },
  { key: 'UnderReview', label: 'Under Review' },
  { key: 'Completed', label: 'Completed' },
  { key: 'Cancelled', label: 'Cancelled' },
];

export default function MyTasksPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const data = await taskService.getMyTasks({ pageSize: 100 });
        setAllTasks(data?.items || data || []);
      } catch {
        setAllTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const filtered = allTasks.filter((t) => {
    const matchesTab = activeTab === 'All' || t.status === activeTab;
    const matchesSearch = !search || t.title?.toLowerCase().includes(search.toLowerCase()) || t.category?.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });
  const countByStatus = (status) =>
    status === 'All' ? allTasks.length : allTasks.filter((t) => t.status === status).length;
  return (
    <SeekerLayout
      title="My Tasks"
      subtitle={`${mockTasks.length} tasks total`}
      action={{ label: 'Post New Task', href: '/dashboard/seeker/tasks/new', icon: 'ri-add-line' }}
    >
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4">
          <div className="w-5 h-5 flex items-center justify-center text-gray-400 shrink-0">
            <i className="ri-search-line text-base"></i>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tasks by title or category..."
            className="flex-1 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => {
            const count = countByStatus(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#e94560] text-white'
                    : 'text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-50'
                }`}
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <i className="ri-task-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-1">No tasks found</h3>
            <p className="text-sm text-gray-400 mb-4">
              {search ? 'Try a different search term.' : 'Post your first task to get started.'}
            </p>
            <Link
              to="/dashboard/seeker/tasks/new"
              className="px-4 py-2 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
            >
              Post a Task
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((task) => {
              const cfg = statusConfig[task.status];
              const pendingOffers = task.offers.filter((o) => o.status === 'Pending').length;
              return (
                <div key={task.id} className="bg-white rounded-xl border border-gray-100 hover:border-[#e94560]/20 transition-all group">
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Link
                            to={`/dashboard/seeker/tasks/${task.id}`}
                            className="text-sm font-bold text-[#1a1a2e] hover:text-[#e94560] transition-colors"
                          >
                            {task.title}
                          </Link>
                          {pendingOffers > 0 && (
                            <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full font-semibold whitespace-nowrap animate-pulse">
                              {pendingOffers} new offer{pendingOffers > 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <i className="ri-price-tag-3-line"></i>
                            {task.category}
                          </span>
                          {task.budget && (
                            <span className="flex items-center gap-1">
                              <i className="ri-money-dollar-circle-line"></i>
                              Budget: ${task.budget}
                            </span>
                          )}
                          {task.deadline && (
                            <span className="flex items-center gap-1">
                              <i className="ri-calendar-line"></i>
                              Due: {task.deadline}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line"></i>
                            Posted: {task.createdAt}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${cfg.bg} ${cfg.color}`}>
                          <i className={`${cfg.icon} mr-1`}></i>
                          {cfg.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <div className="w-4 h-4 flex items-center justify-center">
                            <i className="ri-user-line text-xs"></i>
                          </div>
                          <span>{task.offers.length} offer{task.offers.length !== 1 ? 's' : ''}</span>
                        </div>
                        {task.assignedHelper && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <img src={task.assignedHelper.avatar} alt={task.assignedHelper.name} className="w-4 h-4 rounded-full object-cover object-top" />
                            <span>Assigned to <span className="font-medium text-[#1a1a2e]">{task.assignedHelper.name}</span></span>
                          </div>
                        )}
                        {task.attachments.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-400">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-attachment-2 text-xs"></i>
                            </div>
                            {task.attachments.length} file{task.attachments.length > 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/dashboard/seeker/tasks/${task.id}`}
                          className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                        >
                          View Details
                        </Link>
                        {task.status === 'Open' && task.offers.length > 0 && (
                          <Link
                            to={`/dashboard/seeker/tasks/${task.id}`}
                            className="text-xs font-bold px-3 py-1.5 bg-[#e94560] text-white rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
                          >
                            Review Offers
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SeekerLayout>
  );
}