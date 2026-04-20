import { useState } from 'react';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { sentOffers } from '@/mocks/helperDashboard';
import { Link } from 'react-router-dom';
const tabs = [
  { key: 'all', label: 'All Offers' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'rejected', label: 'Rejected / Withdrawn' },
];
const statusConfig = {
  Pending: { label: 'Pending', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'ri-time-line' },
  Accepted: { label: 'Accepted', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: 'ri-check-double-line' },
  Rejected: { label: 'Rejected', color: 'text-red-500', bg: 'bg-red-50', icon: 'ri-close-circle-line' },
  Withdrawn: { label: 'Withdrawn', color: 'text-gray-500', bg: 'bg-gray-100', icon: 'ri-arrow-go-back-line' },
};
export default function MyOffersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [offers, setOffers] = useState(sentOffers);
  const filtered = offers.filter((o) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return o.status === 'Pending';
    if (activeTab === 'accepted') return o.status === 'Accepted';
    if (activeTab === 'rejected') return o.status === 'Rejected' || o.status === 'Withdrawn';
    return true;
  });
  const counts = {
    all: offers.length,
    pending: offers.filter((o) => o.status === 'Pending').length,
    accepted: offers.filter((o) => o.status === 'Accepted').length,
    rejected: offers.filter((o) => o.status === 'Rejected' || o.status === 'Withdrawn').length,
  };
  const handleWithdraw = (id) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, status: 'Withdrawn' } : o)));
  };
  return (
    <HelperLayout title="My Offers" subtitle="Track all offers you've submitted to seekers" action={{ label: 'Browse Tasks', href: '/dashboard/helper/browse', icon: 'ri-search-2-line' }}>
      <div className="p-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Sent', value: offers.length, icon: 'ri-send-plane-line', color: 'text-sky-500', bg: 'bg-sky-50' },
            { label: 'Pending', value: counts.pending, icon: 'ri-time-line', color: 'text-amber-500', bg: 'bg-amber-50' },
            { label: 'Accepted', value: counts.accepted, icon: 'ri-check-double-line', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'Success Rate', value: `${Math.round((counts.accepted / offers.length) * 100)}%`, icon: 'ri-bar-chart-line', color: 'text-violet-500', bg: 'bg-violet-50' },
          ].map((card) => (
            <div key={card.label} className="bg-white rounded-xl p-4 border border-gray-100">
              <div className={`w-8 h-8 flex items-center justify-center rounded-lg ${card.bg} mb-3`}>
                <i className={`${card.icon} text-base ${card.color}`}></i>
              </div>
              <div className="text-xl font-bold text-[#1a1a2e]">{card.value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{card.label}</div>
            </div>
          ))}
        </div>
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
        <div className="space-y-3">
          {filtered.map((offer) => {
            const cfg = statusConfig[offer.status];
            return (
              <div key={offer.id} className="bg-white rounded-xl border border-gray-100 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${cfg.bg} ${cfg.color}`}>
                        <div className="w-3 h-3 flex items-center justify-center">
                          <i className={`${cfg.icon} text-xs`}></i>
                        </div>
                        {cfg.label}
                      </span>
                      <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{offer.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-[#1a1a2e] mb-1">{offer.taskTitle}</h3>
                    <div className="flex items-center gap-3 flex-wrap text-xs text-gray-400">
                      <span>Seeker: <span className="text-[#1a1a2e] font-medium">{offer.seekerName}</span></span>
                      <span className="text-gray-300">•</span>
                      <span>Submitted: {offer.submittedAt}</span>
                      <span className="text-gray-300">•</span>
                      <span>Duration: {offer.proposedDurationDays} days</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-base font-bold text-[#1a1a2e]">${offer.proposedPrice}</div>
                    <div className="text-xs text-gray-400">proposed</div>
                    <div className="text-xs text-emerald-600 font-medium mt-0.5">
                      You earn: ${Math.round(offer.proposedPrice * 0.95)}
                    </div>
                  </div>
                </div>
                {offer.status === 'Pending' && (
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-50">
                    <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#1a1a2e] transition-colors cursor-pointer">
                      <div className="w-3 h-3 flex items-center justify-center">
                        <i className="ri-message-3-line text-xs"></i>
                      </div>
                      Message Seeker
                    </button>
                    <div className="flex-1"></div>
                    <button
                      onClick={() => handleWithdraw(offer.id)}
                      className="text-xs text-red-500 hover:text-red-600 font-semibold cursor-pointer transition-colors"
                    >
                      Withdraw Offer
                    </button>
                  </div>
                )}
                {offer.status === 'Accepted' && (
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-50">
                    <div className="w-4 h-4 flex items-center justify-center text-emerald-500">
                      <i className="ri-check-double-line text-sm"></i>
                    </div>
                    <span className="text-xs text-emerald-600 font-semibold">Offer accepted Check your active tasks.</span>
                    <div className="flex-1"></div>
                    <Link to="/dashboard/helper/tasks" className="text-xs text-[#e94560] font-semibold hover:underline">Go to task</Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
              <i className="ri-send-plane-line text-2xl text-gray-400"></i>
            </div>
            <h3 className="text-base font-bold text-[#1a1a2e] mb-2">No offers here</h3>
            <p className="text-sm text-gray-400 mb-4">Browse available tasks and submit your first offer</p>
            <Link to="/dashboard/helper/browse" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors">
              Browse Tasks
            </Link>
          </div>
        )}
      </div>
    </HelperLayout>
  );
}
