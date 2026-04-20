import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import notificationService from '@/api/notificationService';

const typeConfig = {
  offer_received: { icon: 'ri-send-plane-fill', color: 'text-sky-600', bg: 'bg-sky-50' },
  offer_accepted: { icon: 'ri-checkbox-circle-fill', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  offer_rejected: { icon: 'ri-close-circle-fill', color: 'text-red-500', bg: 'bg-red-50' },
  task_completed: { icon: 'ri-check-double-fill', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  task_cancelled: { icon: 'ri-forbid-fill', color: 'text-gray-500', bg: 'bg-gray-100' },
  message_received: { icon: 'ri-message-3-fill', color: 'text-[#e94560]', bg: 'bg-red-50' },
  payment_received: { icon: 'ri-money-dollar-circle-fill', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  review_received: { icon: 'ri-star-fill', color: 'text-amber-500', bg: 'bg-amber-50' },
  badge_earned: { icon: 'ri-trophy-fill', color: 'text-amber-500', bg: 'bg-amber-50' },
  system: { icon: 'ri-information-fill', color: 'text-gray-500', bg: 'bg-gray-100' },
};

const defaultTypeConfig = { icon: 'ri-notification-3-fill', color: 'text-gray-500', bg: 'bg-gray-100' };

function formatTime(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function groupByDate(notifications) {
  const groups = {};
  notifications.forEach((n) => {
    const date = new Date(n.createdAt || n.createdOn);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
    let label = '';
    if (diffDays === 0) label = 'Today';
    else if (diffDays === 1) label = 'Yesterday';
    else if (diffDays < 7) label = 'This Week';
    else label = 'Earlier';
    if (!groups[label]) groups[label] = [];
    groups[label].push(n);
  });
  return groups;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const data = await notificationService.getNotifications({ pageSize: 100 });
        setNotifications(data?.items || data || []);
      } catch {
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.isRead) : notifications;
  const grouped = groupByDate(filtered);
  const groupOrder = ['Today', 'Yesterday', 'This Week', 'Earlier'];

  const markAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch {}
  };
  const markRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    } catch {}
  };
  const deleteNotif = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xl font-bold text-[#1a1a2e]">Wasla</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-gray-600">Notifications</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/dashboard/seeker" className="text-sm text-gray-500 hover:text-[#e94560] transition-colors cursor-pointer">
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1a1a2e]">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-500 mt-0.5">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-sm text-[#e94560] hover:text-[#c73652] font-medium transition-colors cursor-pointer whitespace-nowrap"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-1 bg-gray-100 rounded-full p-1 w-fit mb-6">
          {['all', 'unread'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                filter === tab ? 'bg-white text-[#1a1a2e] shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab === 'all' ? 'All' : `Unread (${unreadCount})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-notification-off-line text-2xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 font-medium">No notifications here</p>
            <p className="text-gray-400 text-sm mt-1">You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {groupOrder.map((group) => {
              const items = grouped[group];
              if (!items || items.length === 0) return null;
              return (
                <div key={group}>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">{group}</p>
                  <div className="space-y-2">
                    {items.map((notif) => {
                      const cfg = typeConfig[notif.type];
                      const Wrapper = notif.link ? Link : 'div';
                      const wrapperProps = notif.link ? { to: notif.link } : {};
                      return (
                        <div
                          key={notif.id}
                          className={`relative bg-white rounded-lg border transition-all group ${
                            notif.isRead ? 'border-gray-100' : 'border-[#e94560]/20 bg-red-50/30'
                          }`}
                        >
                          <Wrapper
                            {...wrapperProps}
                            className="flex items-start gap-4 p-4 cursor-pointer"
                            onClick={() => markRead(notif.id)}
                          >
                            <div className="shrink-0 mt-0.5">
                              {notif.avatar ? (
                                <div className="relative">
                                  <img
                                    src={notif.avatar}
                                    alt=""
                                    className="w-10 h-10 rounded-full object-cover object-top"
                                  />
                                  <div className={`absolute -bottom-1 -right-1 w-5 h-5 flex items-center justify-center rounded-full ${cfg.bg}`}>
                                    <i className={`${cfg.icon} text-xs ${cfg.color}`}></i>
                                  </div>
                                </div>
                              ) : (
                                <div className={`w-10 h-10 flex items-center justify-center rounded-full ${cfg.bg}`}>
                                  <i className={`${cfg.icon} text-lg ${cfg.color}`}></i>
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={`text-sm font-semibold ${notif.isRead ? 'text-gray-700' : 'text-[#1a1a2e]'}`}>
                                  {notif.title}
                                </p>
                                <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">{formatTime(notif.createdAt)}</span>
                              </div>
                              <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{notif.body}</p>
                            </div>
                            {!notif.isRead && (
                              <div className="w-2 h-2 bg-[#e94560] rounded-full shrink-0 mt-2"></div>
                            )}
                          </Wrapper>
                          <button
                            onClick={() => deleteNotif(notif.id)}
                            className="absolute top-3 right-10 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer"
                          >
                            <i className="ri-close-line text-sm"></i>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
