import { useState } from 'react';
import { Link } from 'react-router-dom';
import SeekerLayout from '../components/SeekerLayout';
import { mockSessions, sessionStatusConfig } from '@/mocks/sessions';

const tabs = [
  { key: 'all', label: 'All Sessions' },
  { key: 'upcoming', label: 'Upcoming' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

export default function SeekerSessionsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const now = new Date();
  const filtered = mockSessions.filter((s) => {
    if (activeTab === 'upcoming') return s.status === 'Confirmed' || s.status === 'Pending';
    if (activeTab === 'completed') return s.status === 'Completed';
    if (activeTab === 'cancelled') return s.status === 'Cancelled' || s.status === 'NoShow';
    return true;
  });

  const counts = {
    all: mockSessions.length,
    upcoming: mockSessions.filter((s) => s.status === 'Confirmed' || s.status === 'Pending').length,
    completed: mockSessions.filter((s) => s.status === 'Completed').length,
    cancelled: mockSessions.filter((s) => s.status === 'Cancelled' || s.status === 'NoShow').length,
  };

  const totalSpent = mockSessions.filter((s) => s.status === 'Completed').reduce((sum, s) => sum + s.totalPrice, 0);

  return (
    <SeekerLayout
      title="Sessions"
      subtitle="Manage your booked sessions with helpers"
      action={{ label: 'Book Session', href: '/helpers', icon: 'ri-video-chat-line' }}
    >
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Sessions', value: mockSessions.length, icon: 'ri-video-chat-line', color: 'text-sky-500', bg: 'bg-sky-50' },
            { label: 'Upcoming', value: counts.upcoming, icon: 'ri-calendar-check-line', color: 'text-violet-500', bg: 'bg-violet-50' },
            { label: 'Completed', value: counts.completed, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Total Spent', value: `$${totalSpent}`, icon: 'ri-money-dollar-circle-line', color: 'text-[#e94560]', bg: 'bg-[#e94560]/10' },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-5">
              <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${s.bg} mb-3`}>
                <i className={`${s.icon} text-lg ${s.color}`}></i>
              </div>
              <div className="text-2xl font-black text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
              <div className="text-xs font-medium text-gray-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${activeTab === tab.key ? 'bg-white text-[#1a1a2e]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${activeTab === tab.key ? 'bg-[#e94560] text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                {counts[tab.key]}
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((session) => {
            const cfg = sessionStatusConfig[session.status];
            const date = new Date(session.scheduledAt);
            const isUpcoming = session.status === 'Confirmed' || session.status === 'Pending';
            return (
              <div key={session.id} className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={session.helperAvatar}
                      alt={session.helperName}
                      className="w-12 h-12 rounded-xl object-cover object-top shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="text-sm font-bold text-[#1a1a2e]">{session.helperName}</h4>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                          <i className={`${cfg.icon} mr-1`}></i>
                          {cfg.label}
                        </span>
                        {session.isFreeSession && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Free</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mb-2">{session.helperHeadline}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-calendar-line"></i>
                          <span>{date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-time-line"></i>
                          <span>{date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-timer-line"></i>
                          <span>{session.durationMinutes} min</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <i className="ri-video-chat-line"></i>
                          <span>{session.meetingPlatform}</span>
                        </div>
                      </div>
                      {session.notes && (
                        <p className="text-xs text-gray-400 mt-2 line-clamp-1">{session.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-[#1a1a2e]">
                      {session.isFreeSession ? 'Free' : `$${session.totalPrice}`}
                    </div>
                    <div className="flex flex-col gap-1.5 mt-2">
                      {isUpcoming && session.meetingLink && (
                        <a
                          href={session.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 px-3 py-2 bg-[#e94560] text-white text-xs font-semibold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
                        >
                          <i className="ri-video-chat-line text-xs"></i>
                          Join
                        </a>
                      )}
                      <Link
                        to={`/messages`}
                        className="flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
                      >
                        <i className="ri-message-3-line text-xs"></i>
                        Message
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-video-chat-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-2">No sessions here</h3>
            <p className="text-sm text-gray-400 mb-4">Book a session with a helper to get started</p>
            <Link
              to="/helpers"
              className="px-5 py-2.5 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors"
            >
              Browse Helpers
            </Link>
          </div>
        )}
      </div>
    </SeekerLayout>
  );
}
