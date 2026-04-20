import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { mockProjects, projectStatusConfig } from '@/mocks/projects';

const milestoneStatusConfig = {
  Pending: { icon: 'ri-time-line', color: 'text-gray-400', bg: 'bg-gray-100', line: 'bg-gray-200' },
  InProgress: { icon: 'ri-loader-4-line', color: 'text-sky-500', bg: 'bg-sky-50', line: 'bg-sky-300' },
  Submitted: { icon: 'ri-upload-2-line', color: 'text-amber-500', bg: 'bg-amber-50', line: 'bg-amber-300' },
  Approved: { icon: 'ri-check-line', color: 'text-emerald-500', bg: 'bg-emerald-50', line: 'bg-emerald-400' },
  Rejected: { icon: 'ri-close-line', color: 'text-rose-500', bg: 'bg-rose-50', line: 'bg-rose-300' },
};

const tabs = [
  { key: 'All', label: 'All Projects' },
  { key: 'Open', label: 'Open' },
  { key: 'In Progress', label: 'In Progress' },
  { key: 'Completed', label: 'Completed' },
];

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function SeekerProjectsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filtered = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchesTab = activeTab === 'All' || p.status === activeTab;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const countByStatus = (status) =>
    status === 'All' ? mockProjects.length : mockProjects.filter((p) => p.status === status).length;

  const stats = useMemo(() => ({
    total: mockProjects.length,
    open: mockProjects.filter((p) => p.status === 'Open').length,
    inProgress: mockProjects.filter((p) => p.status === 'In Progress').length,
    completed: mockProjects.filter((p) => p.status === 'Completed').length,
    totalBudget: mockProjects.reduce((s, p) => s + p.budget, 0),
    totalPaid: mockProjects.reduce((s, p) => {
      return s + p.milestones.filter(m => m.status === 'Approved').reduce((sum, m) => sum + m.amount, 0);
    }, 0),
  }), []);

  return (
    <SeekerLayout
      title="My Projects"
      subtitle={`${mockProjects.length} projects total`}
      action={{ label: 'Post New Project', href: '/projects', icon: 'ri-add-line' }}
    >
      <div className="p-6 space-y-5">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: 'Total Projects', value: stats.total, icon: 'ri-folder-line', color: 'text-sky-500', bg: 'bg-sky-50' },
            { label: 'Open', value: stats.open, icon: 'ri-door-open-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'In Progress', value: stats.inProgress, icon: 'ri-loader-4-line', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Total Spent', value: `$${stats.totalPaid.toLocaleString()}`, icon: 'ri-money-dollar-circle-line', color: 'text-violet-500', bg: 'bg-violet-50' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${stat.bg}`}>
                  <i className={`${stat.icon} text-base ${stat.color}`}></i>
                </div>
              </div>
              <p className="text-xl font-bold text-[#1a1a2e]">{stat.value}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4">
          <div className="w-5 h-5 flex items-center justify-center text-gray-400 shrink-0">
            <i className="ri-search-line text-base"></i>
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, category, or tag..."
            className="flex-1 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-gray-100 rounded-xl p-1 overflow-x-auto">
          {tabs.map((tab) => {
            const count = countByStatus(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${activeTab === tab.key
                    ? 'bg-[#e94560] text-white'
                    : 'text-gray-500 hover:text-[#1a1a2e] hover:bg-gray-50'
                  }`}
              >
                {tab.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Project List */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 flex flex-col items-center justify-center py-16 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gray-100 mb-4">
              <i className="ri-folder-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-1">No projects found</h3>
            <p className="text-sm text-gray-400 mb-4">
              {search ? 'Try a different search term.' : 'Post your first project to get started.'}
            </p>
            <Link
              to="/projects"
              className="px-4 py-2 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
            >
              Post a Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((project) => {
              const statusCfg = projectStatusConfig[project.status];
              const progress = project.tasksCount > 0 ? Math.round((project.tasksCompleted / project.tasksCount) * 100) : 0;
              const isExpanded = expandedId === project.id;
              const paidMilestones = project.milestones.filter(m => m.status === 'Approved').length;
              const activeMilestone = project.milestones.find(m => m.status === 'InProgress' || m.status === 'Submitted');

              return (
                <div key={project.id} className="bg-white rounded-xl border border-gray-100 hover:border-[#e94560]/20 transition-all overflow-hidden">
                  {/* Project Header */}
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : project.id)}
                            className="text-sm font-bold text-[#1a1a2e] hover:text-[#e94560] transition-colors cursor-pointer text-left"
                          >
                            {project.title}
                          </button>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{project.category}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1 mb-2">{project.description}</p>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <i className="ri-money-dollar-circle-line text-emerald-500"></i>
                            <span className="font-semibold text-emerald-600">${project.budget.toLocaleString()}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-calendar-line"></i>
                            Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-list-check-2"></i>
                            {project.tasksCompleted}/{project.tasksCount} tasks
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-team-line"></i>
                            {project.applicants} applicant{project.applicants !== 1 ? 's' : ''}
                          </span>
                          <span className="flex items-center gap-1">
                            <i className="ri-time-line"></i>
                            {timeAgo(project.createdAt)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {activeMilestone && (
                          <span className="text-xs px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full font-semibold whitespace-nowrap animate-pulse">
                            <i className="ri-error-warning-line mr-1"></i>
                            {activeMilestone.status === 'Submitted' ? 'Review Needed' : 'In Progress'}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {project.status !== 'Open' && (
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-400">Progress</span>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-400">{paidMilestones}/{project.milestones.length} milestones paid</span>
                            <span className="font-semibold text-[#1a1a2e]">{progress}%</span>
                          </div>
                        </div>
                        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${progress === 100 ? 'bg-emerald-500' : 'bg-[#e94560]'}`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 border border-gray-200 rounded-full text-gray-500">{tag}</span>
                      ))}
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-50">
                      <div className="flex items-center gap-2">
                        <img
                          src={project.seeker.avatar}
                          alt={project.seeker.name}
                          className="w-6 h-6 rounded-full object-cover object-top"
                        />
                        <span className="text-xs text-gray-500">
                          Posted by <span className="font-medium text-[#1a1a2e]">{project.seeker.name}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : project.id)}
                          className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1"
                        >
                          <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </button>
                        <Link
                          to="/messages"
                          className="text-xs font-semibold px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                        >
                          <i className="ri-message-3-line mr-1"></i>
                          Messages
                        </Link>
                        {project.status === 'Open' && (
                          <Link
                            to={`/dashboard/seeker/tasks`}
                            className="text-xs font-bold px-3 py-1.5 bg-[#e94560] text-white rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
                          >
                            Review Applicants
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded: Milestones */}
                  {isExpanded && (
                    <div className="bg-[#fafafa] border-t border-gray-100 px-5 py-5">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Milestones Timeline */}
                        <div className="lg:col-span-2">
                          <h4 className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wide mb-4 flex items-center gap-2">
                            <i className="ri-route-line text-[#e94560]"></i>
                            Milestones
                          </h4>
                          <div className="space-y-0">
                            {project.milestones.map((ms, idx) => {
                              const msCfg = milestoneStatusConfig[ms.status] || milestoneStatusConfig.Pending;
                              const isLast = idx === project.milestones.length - 1;
                              return (
                                <div key={ms.id} className="flex gap-3">
                                  <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 flex items-center justify-center rounded-full ${msCfg.bg} shrink-0 border-2 border-white shadow-sm`}>
                                      <i className={`${msCfg.icon} text-sm ${msCfg.color}`}></i>
                                    </div>
                                    {!isLast && <div className={`w-0.5 flex-1 min-h-[24px] ${msCfg.line}`}></div>}
                                  </div>
                                  <div className={`flex-1 ${isLast ? '' : 'pb-4'}`}>
                                    <div className="flex items-center justify-between">
                                      <p className="text-sm font-semibold text-[#1a1a2e]">{ms.title}</p>
                                      <span className="text-sm font-bold text-[#1a1a2e]">${ms.amount.toLocaleString()}</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-0.5">{ms.description}</p>
                                    <div className="flex items-center gap-2 mt-1.5 text-xs">
                                      <span className={`px-2 py-0.5 rounded-full font-medium ${msCfg.bg} ${msCfg.color}`}>
                                        {ms.status}
                                      </span>
                                      {ms.dueDate && (
                                        <span className="text-gray-400">
                                          Due {new Date(ms.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                      )}
                                      {ms.completedAt && (
                                        <span className="text-emerald-500 flex items-center gap-0.5">
                                          <i className="ri-check-line"></i>
                                          Completed {new Date(ms.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                      )}
                                    </div>
                                    {ms.status === 'Submitted' && (
                                      <div className="flex gap-2 mt-2">
                                        <button className="text-xs font-bold px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors cursor-pointer">
                                          <i className="ri-check-line mr-1"></i>Approve
                                        </button>
                                        <button className="text-xs font-medium px-3 py-1 border border-rose-200 text-rose-500 rounded-md hover:bg-rose-50 transition-colors cursor-pointer">
                                          <i className="ri-close-line mr-1"></i>Request Revision
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Project Summary Sidebar */}
                        <div>
                          <h4 className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wide mb-4 flex items-center gap-2">
                            <i className="ri-bar-chart-box-line text-[#e94560]"></i>
                            Summary
                          </h4>
                          <div className="bg-white rounded-lg border border-gray-100 p-4 space-y-4">
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Total Budget</p>
                              <p className="text-lg font-bold text-[#1a1a2e]">${project.budget.toLocaleString()}</p>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Paid</p>
                                <p className="text-sm font-bold text-emerald-600">
                                  ${project.milestones.filter(m => m.status === 'Approved').reduce((s, m) => s + m.amount, 0).toLocaleString()}
                                </p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Remaining</p>
                                <p className="text-sm font-bold text-amber-600">
                                  ${(project.budget - project.milestones.filter(m => m.status === 'Approved').reduce((s, m) => s + m.amount, 0)).toLocaleString()}
                                </p>
                              </div>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Tasks</p>
                                <p className="text-sm font-bold text-[#1a1a2e]">{project.tasksCompleted}/{project.tasksCount}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Applicants</p>
                                <p className="text-sm font-bold text-[#1a1a2e]">{project.applicants}</p>
                              </div>
                            </div>
                            <div className="h-px bg-gray-100"></div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Deadline</p>
                              <p className="text-sm font-semibold text-[#1a1a2e] flex items-center gap-1.5">
                                <i className="ri-calendar-event-line text-[#e94560]"></i>
                                {new Date(project.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-400 mb-1">Created</p>
                              <p className="text-sm text-gray-600">
                                {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                          </div>

                          {/* Quick Actions */}
                          <div className="mt-4 space-y-2">
                            <Link
                              to="/messages"
                              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors"
                            >
                              <i className="ri-message-3-line"></i>
                              Contact Team
                            </Link>
                            {project.status === 'Completed' && (
                              <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-sm font-medium text-amber-600 hover:bg-amber-100 transition-colors cursor-pointer">
                                <i className="ri-star-line"></i>
                                Leave a Review
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SeekerLayout>
  );
}
