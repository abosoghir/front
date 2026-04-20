import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import taskService from '@/api/taskService';
import taskOfferService from '@/api/taskOfferService';
import { useAuth } from '@/context/AuthContext';

const taskCategories = [
  'Technical', 'Design', 'Marketing', 'Writing', 'DataEntry', 'Translation', 'Consultation', 'Other',
];

const statusConfig = {
  Open: { label: 'Open', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'ri-door-open-line' },
  Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'ri-time-line' },
  InProgress: { label: 'In Progress', color: 'text-sky-600', bg: 'bg-sky-50', icon: 'ri-loader-3-line' },
  Completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'ri-check-double-line' },
  Cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50', icon: 'ri-close-circle-line' },
};

const budgetRanges = [
  { label: 'Any Budget', min: 0, max: Infinity },
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100 – $300', min: 100, max: 300 },
  { label: '$300 – $600', min: 300, max: 600 },
  { label: '$600+', min: 600, max: Infinity },
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

export default function TasksMarketplacePage() {
  const { isAuthenticated, isHelper } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [budgetRange, setBudgetRange] = useState(0);
  const [sort, setSort] = useState('newest');
  const [showOfferModal, setShowOfferModal] = useState(null);
  const [offerSent, setOfferSent] = useState(false);
  const [offerLoading, setOfferLoading] = useState(false);
  const [offerError, setOfferError] = useState('');
  const [offerForm, setOfferForm] = useState({ price: '', days: '7', message: '' });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError('');
      try {
        const params = { pageSize: 50 };
        if (selectedCategory !== 'All') params.category = selectedCategory;
        params.status = 'Open';
        const data = await taskService.getTasks(params);
        setTasks(data?.items || data || []);
      } catch (err) {
        setError(err.message || 'Failed to load tasks');
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [selectedCategory]);

  const filtered = tasks
    .filter((t) => {
      const matchSearch = !search || t.title?.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase());
      const range = budgetRanges[budgetRange];
      const matchBudget = !t.budget || (t.budget >= range.min && t.budget <= range.max);
      return matchSearch && matchBudget;
    })
    .sort((a, b) => {
      if (sort === 'budget_desc') return (b.budget || 0) - (a.budget || 0);
      if (sort === 'budget_asc') return (a.budget || 0) - (b.budget || 0);
      return new Date(b.createdOn || b.createdAt || 0).getTime() - new Date(a.createdOn || a.createdAt || 0).getTime();
    });

  const handleSubmitOffer = async () => {
    if (!offerForm.price || !offerForm.message) return;
    setOfferLoading(true);
    setOfferError('');
    try {
      await taskOfferService.createOffer({
        taskId: showOfferModal.id,
        message: offerForm.message,
        proposedPrice: parseFloat(offerForm.price),
        proposedDurationDays: parseInt(offerForm.days),
      });
      setOfferSent(true);
      setTimeout(() => {
        setOfferSent(false);
        setShowOfferModal(null);
        setOfferForm({ price: '', days: '7', message: '' });
      }, 2500);
    } catch (err) {
      setOfferError(err.message || 'Failed to submit offer');
    } finally {
      setOfferLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-[#1a1a2e]">Wasla</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/helpers" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Browse Helpers</Link>
            <Link to="/tasks" className="text-sm font-semibold text-[#e94560]">Open Tasks</Link>
            <Link to="/categories" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Categories</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors whitespace-nowrap">Sign In</Link>
            <Link to="/register" className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#1a1a2e] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-white mb-2">Open Tasks</h1>
          <p className="text-white/60 mb-6">Browse tasks posted by seekers and submit your offer</p>
          <div className="relative max-w-2xl">
            <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg"></i>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks by title or keyword..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#e94560]/30"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        <aside className="w-56 shrink-0 hidden lg:block">
          <div className="bg-white rounded-lg border border-gray-100 p-5 sticky top-24">
            <h3 className="text-sm font-bold text-[#1a1a2e] mb-4">Filters</h3>
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Category</p>
              <div className="space-y-1">
                {['All', ...taskCategories].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors cursor-pointer ${
                      selectedCategory === cat ? 'bg-[#e94560]/10 text-[#e94560] font-medium' : 'text-gray-600 hover:bg-gray-50'
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
                    className={`w-full text-left text-sm px-2 py-1.5 rounded-md transition-colors cursor-pointer ${
                      budgetRange === i ? 'bg-[#e94560]/10 text-[#e94560] font-medium' : 'text-gray-600 hover:bg-gray-50'
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
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500">{filtered.length} task{filtered.length !== 1 ? 's' : ''} found</p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600 focus:outline-none focus:border-[#e94560] cursor-pointer"
            >
              {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-lg border border-gray-100">
              <div className="w-14 h-14 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-3">
                <i className="ri-search-line text-2xl text-gray-400"></i>
              </div>
              <p className="text-gray-500 font-medium">No tasks match your filters</p>
              <button onClick={() => { setSearch(''); setSelectedCategory('All'); setBudgetRange(0); }} className="text-sm text-[#e94560] mt-2 cursor-pointer">Clear filters</button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map((task) => (
                <div key={task.id} className="bg-white rounded-lg border border-gray-100 p-5 hover:border-gray-200 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{task.category}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusConfig[task.status].bg} ${statusConfig[task.status].color}`}>
                          {statusConfig[task.status].label}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold text-[#1a1a2e] mb-2 leading-snug">{task.title}</h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-3">{task.description}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-money-dollar-circle-line text-emerald-500"></i>
                          <span className="font-semibold text-emerald-600">{task.budget ? `$${task.budget}` : 'Negotiable'}</span>
                        </div>
                        {task.deadline && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <i className="ri-calendar-line"></i>
                            <span>Due {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-send-plane-line"></i>
                          <span>{task.offers.length} offer{task.offers.length !== 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400">
                          <i className="ri-time-line"></i>
                          <span>{timeAgo(task.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col gap-2">
                      <button
                        onClick={() => setShowOfferModal(task)}
                        className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        Submit Offer
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showOfferModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            {offerSent ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
                  <i className="ri-check-double-line text-3xl text-emerald-500"></i>
                </div>
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">Offer Submitted!</h3>
                <p className="text-gray-500 text-sm">The seeker will review your offer and get back to you.</p>
              </div>
            ) : (
              <>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#1a1a2e]">Submit an Offer</h3>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{showOfferModal.title}</p>
                  </div>
                  <button onClick={() => setShowOfferModal(null)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Your Price (USD)</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                        <input
                          type="number"
                          value={offerForm.price}
                          onChange={(e) => setOfferForm((p) => ({ ...p, price: e.target.value }))}
                          placeholder="0"
                          className="w-full border border-gray-200 rounded-md pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
                        />
                      </div>
                      {offerForm.price && (
                        <p className="text-xs text-gray-400 mt-1">
                          You earn: <span className="text-emerald-600 font-semibold">${(parseFloat(offerForm.price) * 0.95).toFixed(2)}</span> (after 5% fee)
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Delivery (Days)</label>
                      <select
                        value={offerForm.days}
                        onChange={(e) => setOfferForm((p) => ({ ...p, days: e.target.value }))}
                        className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#e94560] transition-colors cursor-pointer"
                      >
                        {['3', '5', '7', '10', '14', '21', '30'].map((d) => (
                          <option key={d} value={d}>{d} days</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Cover Message</label>
                    <textarea
                      value={offerForm.message}
                      onChange={(e) => setOfferForm((p) => ({ ...p, message: e.target.value }))}
                      rows={4}
                      maxLength={500}
                      placeholder="Explain why you're the best fit for this task..."
                      className="w-full border border-gray-200 rounded-md px-3 py-2.5 text-sm focus:outline-none focus:border-[#e94560] transition-colors resize-none"
                    />
                    <p className="text-xs text-gray-400 text-right mt-0.5">{offerForm.message.length}/500</p>
                  </div>
                  <button
                    onClick={handleSubmitOffer}
                    disabled={!offerForm.price || !offerForm.message}
                    className="w-full py-3 bg-[#e94560] text-white rounded-md font-semibold hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Offer
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
