import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SeekerLayout from '../../components/SeekerLayout';
import taskService from '@/api/taskService';
import taskOfferService from '@/api/taskOfferService';

const statusConfig = {
  Open: { label: 'Open', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'ri-door-open-line' },
  Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'ri-time-line' },
  InProgress: { label: 'In Progress', color: 'text-sky-600', bg: 'bg-sky-50', icon: 'ri-loader-3-line' },
  Completed: { label: 'Completed', color: 'text-gray-600', bg: 'bg-gray-100', icon: 'ri-check-double-line' },
  Cancelled: { label: 'Cancelled', color: 'text-red-500', bg: 'bg-red-50', icon: 'ri-close-circle-line' },
};

export default function TaskDetailPage() {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      setLoading(true);
      try {
        const data = await taskService.getTaskById(id);
        setTask(data);
      } catch (err) {
        setError(err.message || 'Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleAcceptOffer = async (offerId) => {
    try {
      await taskOfferService.acceptOffer(offerId);
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch {}
  };

  const handleRejectOffer = async (offerId) => {
    try {
      await taskOfferService.rejectOffer(offerId);
      const data = await taskService.getTaskById(id);
      setTask(data);
    } catch {}
  };

  if (loading) {
    return (
      <SeekerLayout>
        <div className="flex items-center justify-center py-20">
          <i className="ri-loader-4-line animate-spin text-3xl text-[#e94560]"></i>
        </div>
      </SeekerLayout>
    );
  }

  if (!task || error) {
    return (
      <SeekerLayout>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <i className="ri-file-search-line text-2xl text-gray-400"></i>
          </div>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">Task not found</h2>
          <p className="text-gray-500 text-sm mb-6">This task doesn't exist or has been removed.</p>
          <Link to="/dashboard/seeker/tasks" className="px-5 py-2.5 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors">
            Back to Tasks
          </Link>
        </div>
      </SeekerLayout>
    );
  }

  const config = statusConfig[task.status] || statusConfig['Open'];

  return (
    <SeekerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link to="/dashboard/seeker/tasks" className="flex items-center gap-1 text-sm text-gray-400 hover:text-[#e94560] transition-colors mb-2">
              <i className="ri-arrow-left-line text-sm"></i>
              Back to My Tasks
            </Link>
            <h1 className="text-xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>
              {task.title}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                <i className={`${config.icon} text-xs`}></i>
                {config.label}
              </span>
              <span className="text-xs text-gray-400">{task.category}</span>
              <span className="text-xs text-gray-400">Posted {task.createdAt}</span>
            </div>
          </div>
          {task.budget && (
            <div className="text-right shrink-0">
              <div className="text-2xl font-black text-[#1a1a2e]">${task.budget}</div>
              <div className="text-xs text-gray-400">Budget</div>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main */}
          <div className="flex-1 space-y-5">
            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Description</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
            </div>

            {/* Attachments */}
            {task.attachments.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">Attachments</h3>
                <div className="space-y-2">
                  {task.attachments.map((att) => (
                    <div key={att.id} className="flex items-center gap-3 p-3 bg-[#fafafa] rounded-lg">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#e94560]/10">
                        <i className="ri-file-line text-[#e94560] text-sm"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-[#1a1a2e]">{att.fileName}</div>
                        <div className="text-xs text-gray-400">{att.fileType} · {att.fileSize}</div>
                      </div>
                      <button className="text-xs text-[#e94560] font-medium hover:underline cursor-pointer">Download</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Offers */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-[#1a1a2e] mb-3">
                Offers ({task.offers.length})
              </h3>
              {task.offers.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">No offers yet.</p>
              ) : (
                <div className="space-y-3">
                  {task.offers.map((offer) => (
                    <div key={offer.id} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <img src={offer.helperAvatar} alt={offer.helperName} className="w-10 h-10 rounded-lg object-cover object-top" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-[#1a1a2e]">{offer.helperName}</span>
                              {offer.isVerified && <i className="ri-verified-badge-fill text-sky-500 text-sm"></i>}
                            </div>
                            <div className="text-right shrink-0">
                              <div className="text-base font-black text-[#1a1a2e]">${offer.proposedPrice}</div>
                              <div className="text-xs text-gray-400">{offer.proposedDurationDays} days</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                            <span>★ {offer.helperRating}</span>
                            <span>({offer.helperReviewsCount} reviews)</span>
                            <span>{offer.helperCompletedTasks} tasks done</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{offer.message}</p>
                          <div className="flex gap-2">
                            {offer.status === 'Pending' && (
                              <>
                                <button className="px-3 py-1.5 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer">
                                  Accept Offer
                                </button>
                                <button className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
                                  Decline
                                </button>
                              </>
                            )}
                            {offer.status === 'Accepted' && (
                              <span className="text-xs text-emerald-500 font-medium flex items-center gap-1">
                                <i className="ri-check-line text-xs"></i> Accepted
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-4">
            <div className="bg-white rounded-xl border border-gray-100 p-5 space-y-3">
              <h4 className="text-sm font-bold text-[#1a1a2e]">Task Info</h4>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between"><span className="text-gray-500">Budget</span><span className="font-bold text-[#1a1a2e]">{task.budget ? `$${task.budget}` : 'Open'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Deadline</span><span className="font-bold text-[#1a1a2e]">{task.deadline || '—'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Category</span><span className="font-bold text-[#1a1a2e]">{task.category}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Offers</span><span className="font-bold text-[#1a1a2e]">{task.offers.length}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Platform Fee</span><span className="font-bold text-[#1a1a2e]">{task.platformFee * 100}%</span></div>
              </div>
            </div>

            {task.assignedHelper && (
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="text-sm font-bold text-[#1a1a2e] mb-3">Assigned Helper</h4>
                <div className="flex items-center gap-3">
                  <img src={task.assignedHelper.avatar} alt={task.assignedHelper.name} className="w-10 h-10 rounded-lg object-cover object-top" />
                  <div>
                    <div className="text-sm font-bold text-[#1a1a2e]">{task.assignedHelper.name}</div>
                    <Link to={`/helpers/${task.assignedHelper.id}`} className="text-xs text-[#e94560] hover:underline">View Profile</Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </SeekerLayout>
  );
}
