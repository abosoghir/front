import { useState } from 'react';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { helperActiveTasks } from '@/mocks/helperDashboard';
const tabs = [
  { key: 'all', label: 'All Tasks' },
  { key: 'active', label: 'Active' },
  { key: 'review', label: 'Under Review' },
  { key: 'completed', label: 'Completed' },
];
function DeliverableChecklist({ task }) {
  const [items, setItems] = useState(task.deliverables);
  const toggle = (id) => {
    setItems((prev) => prev.map((d) => (d.id === id ? { ...d, done: !d.done } : d)));
  };
  const doneCount = items.filter((d) => d.done).length;
  const progress = Math.round((doneCount / items.length) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-gray-500">Deliverables ({doneCount}/{items.length})</span>
        <span className="text-xs font-bold text-[#1a1a2e]">{progress}%</span>
      </div>
      <div className="bg-gray-100 rounded-full h-1.5 mb-3">
        <div className="bg-[#e94560] h-1.5 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
      </div>
      <ul className="space-y-2">
        {items.map((d) => (
          <li key={d.id} className="flex items-center gap-2.5 cursor-pointer" onClick={() => toggle(d.id)}>
            <div className={`w-4 h-4 flex items-center justify-center rounded border transition-colors shrink-0 ${d.done ? 'bg-[#e94560] border-[#e94560]' : 'border-gray-300'}`}>
              {d.done && <i className="ri-check-line text-white text-xs"></i>}
            </div>
            <span className={`text-sm transition-colors ${d.done ? 'line-through text-gray-400' : 'text-[#1a1a2e]'}`}>{d.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
function SubmitWorkModal({ task, onClose }) {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = () => {
    if (!message.trim()) return;
    setSubmitted(true);
  };
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1a1a2e]">Submit Work for Review</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
              <i className="ri-check-double-line text-3xl text-emerald-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Work Submitted!</h4>
            <p className="text-sm text-gray-500 mb-6">The seeker has been notified and will review your work. You&apos;ll be paid once they approve.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Back to Tasks
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-4">
            <div>
              <p className="text-sm font-semibold text-[#1a1a2e] mb-1">{task.title}</p>
              <p className="text-xs text-gray-400">Agreed price: <span className="font-bold text-[#1a1a2e]">${task.agreedPrice}</span></p>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Delivery Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                placeholder="Describe what you've delivered, any notes for the seeker, and links to your work..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#1a1a2e] resize-none focus:outline-none focus:border-[#e94560] transition-colors"
                rows={5}
              />
              <p className="text-xs text-gray-400 text-right mt-1">{message.length}/500</p>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center cursor-pointer hover:border-gray-300 transition-colors">
              <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2 text-gray-400">
                <i className="ri-upload-cloud-2-line text-2xl"></i>
              </div>
              <p className="text-sm text-gray-500">Attach files or links</p>
              <p className="text-xs text-gray-400 mt-0.5">PDF, ZIP, images, or Google Drive links</p>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={onClose} className="flex-1 py-2.5 border border-gray-200 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className="flex-1 py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit for Review
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default function HelperActiveTasksPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [submitTask, setSubmitTask] = useState(null);
  const [expandedId, setExpandedId] = useState(1);
  const allTasks = [
    ...helperActiveTasks,
    {
      id: 4, taskId: 3, title: 'Write 10 SEO Blog Articles for SaaS Product', category: 'Content Writing',
      seekerName: 'Sara Mohamed', seekerAvatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20startup%20founder%20portrait%20friendly%20smile%20clean%20white%20background%20entrepreneur%20business%20confident%20look%20headshot&width=48&height=48&seq=seeker-av-dash-004&orientation=squarish',
      agreedPrice: 380, deadline: '2026-03-20', startedAt: '2026-03-01', status: 'Completed',
      progressPercent: 100,
      deliverables: [
        { id: 20, label: 'Keyword Research Report', done: true },
        { id: 21, label: '10 SEO Articles (1500-2000 words each)', done: true },
        { id: 22, label: 'Meta Descriptions & Internal Links', done: true },
      ],
      lastMessage: 'All articles delivered and approved. Great work!', lastMessageAt: '2026-03-18',
    },
  ];
  const filtered = allTasks.filter((t) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return t.status === 'Active';
    if (activeTab === 'review') return t.status === 'UnderReview';
    if (activeTab === 'completed') return t.status === 'Completed';
    return true;
  });
  const counts = {
    all: allTasks.length,
    active: allTasks.filter((t) => t.status === 'Active').length,
    review: allTasks.filter((t) => t.status === 'UnderReview').length,
    completed: allTasks.filter((t) => t.status === 'Completed').length,
  };
  return (
    <HelperLayout title="Active Tasks" subtitle="Track your ongoing work and submit deliverables">
      <div className="p-6">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.key ? 'bg-white text-[#1a1a2e]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-[#e94560] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filtered.map((task) => {
            const isExpanded = expandedId === task.id;
            const statusColor = task.status === 'Active' ? 'bg-sky-50 text-sky-600' : task.status === 'UnderReview' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500';
            const statusLabel = task.status === 'UnderReview' ? 'Under Review' : task.status;
            return (
              <div key={task.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div
                  className="px-5 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : task.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${statusColor}`}>{statusLabel}</span>
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{task.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#1a1a2e] mb-2">{task.title}</h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <img src={task.seekerAvatar} alt={task.seekerName} className="w-4 h-4 rounded-full object-cover object-top" />
                          <span className="text-xs text-gray-500">{task.seekerName}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className="ri-calendar-line text-xs"></i>
                          </div>
                          Due {task.deadline}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <div className="w-3 h-3 flex items-center justify-center">
                            <i className="ri-message-3-line text-xs"></i>
                          </div>
                          {task.lastMessageAt}
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-base font-bold text-[#1a1a2e]">${task.agreedPrice}</div>
                      <div className="text-xs text-gray-400">agreed</div>
                      <div className="w-5 h-5 flex items-center justify-center ml-auto mt-2 text-gray-400">
                        <i className={`${isExpanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-lg`}></i>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all ${task.status === 'Completed' ? 'bg-emerald-400' : task.status === 'UnderReview' ? 'bg-amber-400' : 'bg-[#e94560]'}`}
                        style={{ width: `${task.progressPercent}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-400 whitespace-nowrap">{task.progressPercent}% done</span>
                  </div>
                </div>
                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      <DeliverableChecklist task={task} />
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-2">Last Message</p>
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <p className="text-sm text-[#1a1a2e]">&ldquo;{task.lastMessage}&rdquo;</p>
                          <p className="text-xs text-gray-400 mt-1">{task.seekerName} · {task.lastMessageAt}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-sm font-semibold text-[#1a1a2e] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="w-4 h-4 flex items-center justify-center">
                              <i className="ri-message-3-line text-sm"></i>
                            </div>
                            Message Seeker
                          </button>
                          {task.status === 'Active' && (
                            <button
                              onClick={() => setSubmitTask(task)}
                              className="flex items-center justify-center gap-2 py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer"
                            >
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-upload-cloud-2-line text-sm"></i>
                              </div>
                              Submit Work for Review
                            </button>
                          )}
                          {task.status === 'UnderReview' && (
                            <div className="flex items-center gap-2 py-2.5 bg-amber-50 text-amber-700 text-sm font-semibold rounded-lg px-3">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-time-line text-sm"></i>
                              </div>
                              Awaiting seeker approval
                            </div>
                          )}
                          {task.status === 'Completed' && (
                            <div className="flex items-center gap-2 py-2.5 bg-emerald-50 text-emerald-700 text-sm font-semibold rounded-lg px-3">
                              <div className="w-4 h-4 flex items-center justify-center">
                                <i className="ri-check-double-line text-sm"></i>
                              </div>
                              Task completed &amp; paid
                            </div>
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
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-task-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-2">No tasks here</h3>
            <p className="text-sm text-gray-400 mb-4">Browse available tasks and submit offers to get started</p>
          </div>
        )}
      </div>
      {submitTask && <SubmitWorkModal task={submitTask} onClose={() => setSubmitTask(null)} />}
    </HelperLayout>
  );
}
