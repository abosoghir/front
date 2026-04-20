import { useState } from 'react';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { availableTasks, sentOffers } from '@/mocks/helperDashboard';
import { taskCategories } from '@/mocks/tasks';
function OfferModal({ task, onClose }) {
  const [price, setPrice] = useState(task.budget ? String(task.budget) : '');
  const [days, setDays] = useState('7');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const platformFee = price ? Math.round(Number(price) * 0.05 * 100) / 100 : 0;
  const youEarn = price ? Math.round((Number(price) - platformFee) * 100) / 100 : 0;
  const handleSubmit = () => {
    if (!message.trim() || !price) return;
    setSubmitted(true);
  };
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h3 className="text-base font-bold text-[#1a1a2e]">Submit an Offer</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
              <i className="ri-send-plane-line text-3xl text-emerald-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Offer Sent!</h4>
            <p className="text-sm text-gray-500 mb-6">Your offer has been submitted. The seeker will review it and get back to you soon.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Back to Browse
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            <div className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <img src={task.seekerAvatar} alt={task.seekerName} className="w-9 h-9 rounded-full object-cover object-top shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#1a1a2e]">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span className="text-xs text-gray-400">{task.seekerName}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{task.category}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs font-semibold text-[#1a1a2e]">{task.isFreeTask ? 'Free Task' : `Budget: $${task.budget}`}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Your Price (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-4 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#e94560] transition-colors"
                />
              </div>
              {price && (
                <div className="mt-2 bg-gray-50 rounded-lg p-3 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Platform fee (5%): <span className="font-semibold text-[#1a1a2e]">-${platformFee}</span></span>
                  <span className="text-emerald-600 font-bold">You earn: ${youEarn}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Delivery Time</label>
              <div className="flex gap-2 flex-wrap">
                {['3', '5', '7', '10', '14', '21'].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDays(d)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer whitespace-nowrap ${days === d ? 'bg-[#1a1a2e] text-white border-[#1a1a2e]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Cover Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Introduce yourself, explain your approach, and why you're the best fit for this task..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1a1a2e] resize-none focus:outline-none focus:border-[#e94560] transition-colors"
                rows={5}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{message.length}/500</p>
            </div>
            <div className="flex gap-3 pt-1">
              <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim() || !price}
                className="flex-1 py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Offer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default function BrowseTasksPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTask, setSelectedTask] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const alreadyOffered = new Set(sentOffers.map((o) => o.taskId));
  const filtered = availableTasks.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'All' || t.category === selectedCategory;
    return matchSearch && matchCat;
  });
  return (
    <HelperLayout title="Browse Tasks" subtitle="Find tasks that match your skills and submit offers" action={{ label: 'My Offers', href: '/dashboard/helper/offers', icon: 'ri-send-plane-line' }}>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center text-gray-400">
              <i className="ri-search-line text-sm"></i>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks by title or category..."
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm text-[#1a1a2e] focus:outline-none focus:border-[#e94560] transition-colors"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1a1a2e] focus:outline-none focus:border-[#e94560] transition-colors cursor-pointer bg-white"
          >
            <option value="All">All Categories</option>
            {taskCategories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <p className="text-xs text-gray-400 mb-4">{filtered.length} tasks available</p>
        <div className="space-y-4">
          {filtered.map((task) => {
            const offered = alreadyOffered.has(task.id);
            const isExpanded = expandedId === task.id;
            return (
              <div key={task.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="px-5 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-50 text-sky-600">{task.category}</span>
                        {offered && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">Offer Sent</span>
                        )}
                        <span className="text-xs text-gray-400">{task.offersCount} offers</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1a1a2e] mb-2">{task.title}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <img src={task.seekerAvatar} alt={task.seekerName} className="w-4 h-4 rounded-full object-cover object-top" />
                          <span className="text-xs text-gray-500">{task.seekerName}</span>
                          <div className="flex items-center gap-0.5">
                            <div className="w-3 h-3 flex items-center justify-center">
                              <i className="ri-star-fill text-amber-400 text-xs"></i>
                            </div>
                            <span className="text-xs text-gray-400">{task.seekerRating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className="ri-calendar-line text-xs"></i>
                          </div>
                          Due {task.deadline}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className="ri-time-line text-xs"></i>
                          </div>
                          Posted {task.postedAt}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-[#1a1a2e]">
                        {task.isFreeTask ? 'Free' : `$${task.budget}`}
                      </div>
                      <div className="text-xs text-gray-400">budget</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {task.skills.map((s) => (
                      <span key={s} className="text-xs px-2 py-0.5 bg-gray-50 text-gray-500 rounded-full border border-gray-100">{s}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : task.id)}
                      className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1a1a2e] transition-colors cursor-pointer"
                    >
                      <div className="w-3 h-3 flex items-center justify-center">
                        <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-sm`}></i>
                      </div>
                      {isExpanded ? 'Hide details' : 'View details'}
                    </button>
                    <div className="flex-1"></div>
                    {offered ? (
                      <span className="text-xs text-amber-600 font-semibold">Offer already sent</span>
                    ) : (
                      <button
                        onClick={() => setSelectedTask(task)}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <div className="w-3 h-3 flex items-center justify-center">
                          <i className="ri-send-plane-line text-xs"></i>
                        </div>
                        Submit Offer
                      </button>
                    )}
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-50 pt-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-search-2-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-2">No tasks found</h3>
            <p className="text-sm text-gray-400">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
      {selectedTask && <OfferModal task={selectedTask} onClose={() => setSelectedTask(null)} />}
    </HelperLayout>
  );
}
