import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import projectService from '@/api/projectService';
import ReportModal from '@/components/ReportModal';

const projectCategories = [
  'Web Development', 'Mobile Development', 'UI/UX Design', 'Data Science', 'Marketing', 'Content', 'Other',
];

const projectStatusConfig = {
  Open: { label: 'Open', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  'In Progress': { label: 'In Progress', color: 'text-sky-600', bg: 'bg-sky-50' },
  Completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100' },
  Cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50' },
};

const milestoneStatusConfig = {
  Pending: { icon: 'ri-time-line', color: 'text-gray-400', bg: 'bg-gray-100', line: 'bg-gray-200' },
  InProgress: { icon: 'ri-loader-4-line', color: 'text-sky-500', bg: 'bg-sky-50', line: 'bg-sky-300' },
  Submitted: { icon: 'ri-upload-2-line', color: 'text-amber-500', bg: 'bg-amber-50', line: 'bg-amber-300' },
  Approved: { icon: 'ri-check-line', color: 'text-emerald-500', bg: 'bg-emerald-50', line: 'bg-emerald-400' },
  Rejected: { icon: 'ri-close-line', color: 'text-rose-500', bg: 'bg-rose-50', line: 'bg-rose-300' },
};

const budgetRanges = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under $2,000', min: 0, max: 2000 },
  { label: '$2,000 – $5,000', min: 2000, max: 5000 },
  { label: '$5,000+', min: 5000, max: Infinity },
];

const sortOptions = [
  { label: 'Newest First', value: 'newest' },
  { label: 'Highest Budget', value: 'budget_desc' },
  { label: 'Lowest Budget', value: 'budget_asc' },
];

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function ProjectsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [budgetRange, setBudgetRange] = useState(0);
  const [sort, setSort] = useState('newest');
  const [expandedId, setExpandedId] = useState(null);
  const [reportTarget, setReportTarget] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const params = { pageSize: 50 };
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedStatus !== 'All') params.status = selectedStatus;
        const data = await projectService.getProjects(params);
        setProjects(data?.items || data || []);
      } catch {
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [selectedCategory, selectedStatus]);

  const filtered = projects
    .filter((p) => {
      const matchSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase()) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
      const range = budgetRanges[budgetRange];
      const matchBudget = !p.budget || (p.budget >= range.min && p.budget <= range.max);
      return matchSearch && matchBudget;
    })
    .sort((a, b) => {
      if (sort === 'budget_desc') return (b.budget || 0) - (a.budget || 0);
      if (sort === 'budget_asc') return (a.budget || 0) - (b.budget || 0);
      return new Date(b.createdAt || b.createdOn || 0).getTime() - new Date(a.createdAt || a.createdOn || 0).getTime();
    });

  const stats = {
    total: projects.length,
    open: projects.filter((p) => p.status === 'Open').length,
    inProgress: projects.filter((p) => p.status === 'In Progress' || p.status === 'InProgress').length,
    totalBudget: projects.reduce((s, p) => s + (p.budget || 0), 0),
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
            <span className="text-[#1a1a2e]">Wasla</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/helpers" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Browse Helpers</Link>
            <Link to="/tasks" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Open Tasks</Link>
            <Link to="/projects" className="text-sm font-semibold text-[#e94560]">Projects</Link>
            <Link to="/categories" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Categories</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors whitespace-nowrap">Sign In</Link>
            <Link to="/register" className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#1a1a2e] py-14">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
              <p className="text-white/60 mb-6">Multi-task projects looking for skilled teams and individuals</p>
            </div>
            <Link
              to="/register"
              className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#e94560] text-white rounded-lg text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              Post a Project
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Projects', value: stats.total, icon: 'ri-folder-line', color: 'text-sky-400' },
              { label: 'Open for Bids', value: stats.open, icon: 'ri-door-open-line', color: 'text-emerald-400' },
              { label: 'In Progress', value: stats.inProgress, icon: 'ri-loader-4-line', color: 'text-amber-400' },
              { label: 'Total Budget', value: `$${(stats.totalBudget / 1000).toFixed(1)}k`, icon: 'ri-money-dollar-circle-line', color: 'text-violet-400' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 backdrop-blur rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <i className={`${stat.icon} ${stat.color}`}></i>
                  <span className="text-xs text-white/40 uppercase tracking-wide font-semibold">{stat.label}</span>
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="relative max-w-2xl">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by title, description, or skill..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e94560]/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-100 p-5 sticky top-24 space-y-5">
            <div>
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Filters</h3>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Status</p>
              <div className="space-y-1">
                {['All', 'Open', 'In Progress', 'Completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors cursor-pointer ${selectedStatus === status ? 'bg-[#e94560]/10 text-[#e94560] font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</p>
              <div className="space-y-1">
                {['All', ...projectCategories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors cursor-pointer ${selectedCategory === cat ? 'bg-[#e94560]/10 text-[#e94560] font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Budget</p>
              <div className="space-y-1">
                {budgetRanges.map((range, i) => (
                  <button
                    key={range.label}
                    onClick={() => setBudgetRange(i)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors cursor-pointer ${budgetRange === i ? 'bg-[#e94560]/10 text-[#e94560] font-medium' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 focus:outline-none focus:border-[#e94560] cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                <i className="ri-folder-line text-2xl text-gray-400"></i>
              </div>
              <p className="text-gray-500 font-medium">No projects match your filters</p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedStatus('All'); setBudgetRange(0); }}
                className="text-sm text-[#e94560] mt-2 cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {filtered.map((project) => {
                const statusCfg = projectStatusConfig[project.status];
                const progress = project.tasksCount > 0 ? Math.round((project.tasksCompleted / project.tasksCount) * 100) : 0;
                const isExpanded = expandedId === project.id;

                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-all"
                  >
                    <div className="flex">
                      <div className="w-48 shrink-0 hidden md:block">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{project.category}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusCfg.bg} ${statusCfg.color}`}>
                                {statusCfg.label}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-1.5 leading-snug">{project.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{project.description}</p>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {project.tags.map((tag) => (
                                <span key={tag} className="text-xs px-2 py-0.5 border border-gray-200 rounded-full text-gray-500">{tag}</span>
                              ))}
                            </div>

                            <div className="flex items-center gap-5 flex-wrap">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <i className="ri-money-dollar-circle-line text-emerald-500"></i>
                                <span className="font-semibold text-emerald-600">${project.budget.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <i className="ri-calendar-line"></i>
                                <span>Due {new Date(project.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <i className="ri-list-check-2"></i>
                                <span>{project.tasksCompleted}/{project.tasksCount} tasks</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <i className="ri-team-line"></i>
                                <span>{project.applicants} applicant{project.applicants !== 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                <i className="ri-time-line"></i>
                                <span>{timeAgo(project.createdAt)}</span>
                              </div>
                            </div>

                            {project.status !== 'Open' && (
                              <div className="mt-3">
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-400">Progress</span>
                                  <span className="font-semibold text-[#1a1a2e]">{progress}%</span>
                                </div>
                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full transition-all ${progress === 100 ? 'bg-emerald-500' : 'bg-[#e94560]'}`}
                                    style={{ width: `${progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="shrink-0 flex flex-col items-end gap-2">
                            {project.status === 'Open' && (
                              <Link
                                to="/register"
                                className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap"
                              >
                                Apply Now
                              </Link>
                            )}
                            <button
                              onClick={() => setExpandedId(isExpanded ? null : project.id)}
                              className="text-xs text-gray-400 hover:text-[#e94560] transition-colors cursor-pointer flex items-center gap-1"
                            >
                              {isExpanded ? 'Less' : 'Details'}
                              <i className={isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
                            </button>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-4 mb-3">
                              <img
                                src={project.seeker.avatar}
                                alt={project.seeker.name}
                                className="w-10 h-10 rounded-full object-cover object-top"
                              />
                              <div>
                                <p className="text-sm font-semibold text-[#1a1a2e]">{project.seeker.name}</p>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                  <span className="flex items-center gap-1">
                                    <i className="ri-star-fill text-amber-400"></i> {project.seeker.rating}
                                  </span>
                                  <span>{project.seeker.tasksPosted} tasks posted</span>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{project.description}</p>

                            {project.milestones && project.milestones.length > 0 && (
                              <div className="mt-4">
                                <h4 className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wide mb-3">Milestones</h4>
                                <div className="space-y-0">
                                  {project.milestones.map((ms, idx) => {
                                    const msCfg = milestoneStatusConfig[ms.status] || milestoneStatusConfig.Pending;
                                    const isLast = idx === project.milestones.length - 1;
                                    return (
                                      <div key={ms.id} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                          <div className={`w-7 h-7 flex items-center justify-center rounded-full ${msCfg.bg} shrink-0`}>
                                            <i className={`${msCfg.icon} text-xs ${msCfg.color}`}></i>
                                          </div>
                                          {!isLast && <div className={`w-0.5 flex-1 min-h-[24px] ${msCfg.line}`}></div>}
                                        </div>
                                        <div className={`flex-1 ${isLast ? '' : 'pb-3'}`}>
                                          <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-[#1a1a2e]">{ms.title}</p>
                                            <span className="text-xs font-bold text-[#1a1a2e]">${ms.amount}</span>
                                          </div>
                                          <p className="text-xs text-gray-400 mt-0.5">{ms.description}</p>
                                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                            <span>{ms.status}</span>
                                            {ms.dueDate && <span>· Due {new Date(ms.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            <div className="flex gap-3 mt-4">
                              <Link
                                to="/register"
                                className="px-5 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap"
                              >
                                Apply to Project
                              </Link>
                              <Link
                                to="/messages"
                                className="px-5 py-2 border border-gray-200 text-gray-600 rounded-md text-sm font-medium hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                              >
                                Message Seeker
                              </Link>
                              <button
                                onClick={() => setReportTarget({ type: 'Project', id: project.id, name: project.title })}
                                className="px-3 py-2 border border-gray-200 text-gray-400 rounded-md text-sm hover:border-rose-300 hover:text-rose-500 transition-colors cursor-pointer"
                              >
                                <i className="ri-flag-line"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="bg-[#1a1a2e] py-14 mt-8">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Have a bigger project in mind?</h2>
          <p className="text-white/60 mb-6">Post a multi-task project and find the right team to bring your idea to life</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="px-6 py-3 bg-[#e94560] text-white rounded-md font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">
              Post a Project
            </Link>
            <Link to="/how-it-works" className="px-6 py-3 bg-white/10 text-white rounded-md font-semibold hover:bg-white/20 transition-colors whitespace-nowrap">
              How It Works
            </Link>
          </div>
        </div>
      </div>
      <ReportModal
        isOpen={!!reportTarget}
        onClose={() => setReportTarget(null)}
        targetType={reportTarget?.type}
        targetId={reportTarget?.id}
        targetName={reportTarget?.name}
      />
    </div>
  );
}
