import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppNavbar from '@/components/feature/AppNavbar';
import { mockHelpers } from '@/mocks/helpers';
import ReportModal from '@/components/ReportModal';
function StarRating({ rating, size = 'sm' }) {
  const cls = size === 'md' ? 'text-base' : 'text-xs';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-4 h-4 flex items-center justify-center`}>
          <i className={`${cls} ${i <= Math.round(rating) ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-gray-300'}`}></i>
        </div>
      ))}
    </div>
  );
}
export default function HelperProfilePage() {
  const { id } = useParams();
  const helper = mockHelpers.find((h) => h.id === Number(id));
  const [activeTab, setActiveTab] = useState('overview');
  const [saved, setSaved] = useState(false);
  const [showReport, setShowReport] = useState(false);
  if (!helper) {
    return (
      <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: 'Inter, sans-serif' }}>
        <AppNavbar />
        <div className="flex flex-col items-center justify-center py-32 text-center px-6">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4">
            <i className="ri-user-search-line text-2xl text-gray-400"></i>
          </div>
          <h2 className="text-xl font-bold text-[#1a1a2e] mb-2">Helper not found</h2>
          <p className="text-gray-500 text-sm mb-6">This profile doesn't exist or has been removed.</p>
          <Link to="/helpers" className="px-5 py-2.5 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap">
            Browse Helpers
          </Link>
        </div>
      </div>
    );
  }
  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'ri-user-line' },
    { key: 'services', label: `Services (${helper.services.length})`, icon: 'ri-briefcase-line' },
    { key: 'portfolio', label: `Portfolio (${helper.portfolio.length})`, icon: 'ri-gallery-line' },
    { key: 'reviews', label: `Reviews (${helper.totalReviewsCount})`, icon: 'ri-star-line' },
  ];
  return (
    <div className="min-h-screen bg-[#fafafa]" style={{ fontFamily: 'Inter, sans-serif' }}>
      <AppNavbar />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-gray-400">
          <Link to="/" className="hover:text-[#e94560] transition-colors">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link to="/helpers" className="hover:text-[#e94560] transition-colors">Browse Helpers</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-[#1a1a2e] font-medium">{helper.name}</span>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0 space-y-5">
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              {/* Cover */}
              <div className="h-28 bg-gradient-to-r from-[#1a1a2e] to-[#e94560]/60 relative">
                <div className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
                </div>
              </div>
              <div className="px-6 pb-6">
                {/* Avatar row */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-10 mb-4">
                  <div className="relative">
                    <img
                      src={helper.avatar}
                      alt={helper.name}
                      className="w-20 h-20 rounded-xl object-cover object-top border-4 border-white"
                    />
                    {helper.isAvailable && (
                      <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-400 border-2 border-white rounded-full"></span>
                    )}
                  </div>
                  <div className="flex gap-2 sm:mb-0">
                    <button
                      onClick={() => setSaved(!saved)}
                      className={`flex items-center gap-1.5 px-3 py-2 border rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${saved ? 'border-[#e94560] text-[#e94560] bg-[#e94560]/5' : 'border-gray-200 text-gray-600 hover:border-[#e94560] hover:text-[#e94560]'
                        }`}
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className={`${saved ? 'ri-heart-fill' : 'ri-heart-line'} text-sm`}></i>
                      </div>
                      {saved ? 'Saved' : 'Save'}
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-gray-300 transition-colors cursor-pointer whitespace-nowrap">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-share-line text-sm"></i>
                      </div>
                      Share
                    </button>
                    <button
                      onClick={() => setShowReport(true)}
                      className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-400 hover:border-rose-300 hover:text-rose-500 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-flag-line text-sm"></i>
                      </div>
                      Report
                    </button>
                  </div>
                </div>
                {/* Name & headline */}
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="text-2xl font-extrabold text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {helper.name}
                  </h1>
                  {helper.isVerified && (
                    <div className="flex items-center gap-1 text-xs bg-sky-50 text-sky-600 px-2 py-0.5 rounded-full font-medium">
                      <div className="w-3.5 h-3.5 flex items-center justify-center">
                        <i className="ri-verified-badge-fill text-xs"></i>
                      </div>
                      Verified
                    </div>
                  )}
                  {helper.badges.map((b) => (
                    <div key={b.name} className="flex items-center gap-1 text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-medium">
                      <div className="w-3.5 h-3.5 flex items-center justify-center">
                        <i className={`${b.icon} text-xs`}></i>
                      </div>
                      {b.name}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 text-sm mb-3">{helper.headline}</p>
                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1.5">
                    <StarRating rating={helper.averageRating} />
                    <span className="font-bold text-[#1a1a2e]">{helper.averageRating}</span>
                    <span className="text-gray-400">({helper.totalReviewsCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-map-pin-line text-sm text-gray-400"></i>
                    </div>
                    {helper.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-time-line text-sm text-gray-400"></i>
                    </div>
                    Responds in ~{helper.speedOfResponseInMinutes} min
                  </div>
                  <div className={`flex items-center gap-1 font-medium ${helper.isAvailable ? 'text-emerald-500' : 'text-gray-400'}`}>
                    <span className={`w-2 h-2 rounded-full ${helper.isAvailable ? 'bg-emerald-400' : 'bg-gray-300'}`}></span>
                    {helper.isAvailable ? 'Available for work' : 'Currently busy'}
                  </div>
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { icon: 'ri-check-double-line', value: helper.completedTasksCount, label: 'Tasks Done', color: 'text-emerald-500' },
                    { icon: 'ri-folder-line', value: helper.completedProjectsCount, label: 'Projects', color: 'text-sky-500' },
                    { icon: 'ri-video-chat-line', value: helper.completedSessionsCount, label: 'Sessions', color: 'text-violet-500' },
                    { icon: 'ri-trophy-line', value: helper.points, label: 'Points', color: 'text-amber-500' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#fafafa] rounded-lg p-3 text-center">
                      <div className={`w-6 h-6 flex items-center justify-center mx-auto mb-1 ${stat.color}`}>
                        <i className={`${stat.icon} text-base`}></i>
                      </div>
                      <div className="text-lg font-black text-[#1a1a2e]">{stat.value.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="flex border-b border-gray-100 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer border-b-2 ${activeTab === tab.key
                        ? 'border-[#e94560] text-[#e94560]'
                        : 'border-transparent text-gray-500 hover:text-[#1a1a2e]'
                      }`}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className={`${tab.icon} text-sm`}></i>
                    </div>
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-base font-bold text-[#1a1a2e] mb-3">About</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{helper.bio}</p>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#1a1a2e] mb-3">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {helper.skills.map((skill) => (
                          <span key={skill} className="text-sm px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {helper.reviews.length > 0 && (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="text-base font-bold text-[#1a1a2e]">Recent Reviews</h3>
                          <button onClick={() => setActiveTab('reviews')} className="text-xs text-[#e94560] font-medium hover:underline cursor-pointer whitespace-nowrap">
                            See all
                          </button>
                        </div>
                        <div className="space-y-4">
                          {helper.reviews.slice(0, 2).map((review) => (
                            <div key={review.id} className="border border-gray-100 rounded-lg p-4">
                              <div className="flex items-center gap-3 mb-2">
                                <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-8 h-8 rounded-full object-cover object-top" />
                                <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-[#1a1a2e]">{review.reviewerName}</span>
                                    <span className="text-xs text-gray-400">{review.date}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <StarRating rating={review.rating} />
                                    <span className="text-xs text-gray-400">{review.type}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-4">
                    {helper.services.map((service) => (
                      <div key={service.id} className="border border-gray-100 rounded-xl p-5 hover:border-[#e94560]/30 transition-colors">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 className="text-sm font-bold text-[#1a1a2e] mb-1">{service.title}</h4>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{service.category}</span>
                            <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <div className="w-3.5 h-3.5 flex items-center justify-center">
                                  <i className="ri-time-line text-xs"></i>
                                </div>
                                {service.deliveryDays} day{service.deliveryDays > 1 ? 's' : ''} delivery
                              </div>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-xl font-black text-[#1a1a2e]">${service.price}</div>
                            <button className="mt-2 px-4 py-1.5 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap">
                              Order Now
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div>
                    {helper.portfolio.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 mx-auto mb-3">
                          <i className="ri-gallery-line text-xl"></i>
                        </div>
                        <p className="text-sm">No portfolio items yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {helper.portfolio.map((item) => (
                          <div key={item.id} className="group rounded-xl overflow-hidden border border-gray-100 hover:border-[#e94560]/30 transition-colors">
                            <div className="h-44 overflow-hidden">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-4">
                              <h4 className="text-sm font-bold text-[#1a1a2e] mb-1">{item.title}</h4>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div>
                    {/* Rating summary */}
                    <div className="flex items-center gap-6 p-5 bg-[#fafafa] rounded-xl mb-5">
                      <div className="text-center">
                        <div className="text-5xl font-black text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>
                          {helper.averageRating}
                        </div>
                        <StarRating rating={helper.averageRating} size="md" />
                        <div className="text-xs text-gray-400 mt-1">{helper.totalReviewsCount} reviews</div>
                      </div>
                      <div className="flex-1 space-y-1.5">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const pct = star === 5 ? 78 : star === 4 ? 15 : star === 3 ? 5 : star === 2 ? 1 : 1;
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-xs text-gray-500 w-3">{star}</span>
                              <div className="w-3.5 h-3.5 flex items-center justify-center">
                                <i className="ri-star-fill text-yellow-400 text-xs"></i>
                              </div>
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${pct}%` }}></div>
                              </div>
                              <span className="text-xs text-gray-400 w-6">{pct}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="space-y-4">
                      {helper.reviews.map((review) => (
                        <div key={review.id} className="border border-gray-100 rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <img src={review.reviewerAvatar} alt={review.reviewerName} className="w-10 h-10 rounded-full object-cover object-top" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <span className="text-sm font-bold text-[#1a1a2e]">{review.reviewerName}</span>
                                <span className="text-xs text-gray-400">{review.date}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <StarRating rating={review.rating} />
                                <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">{review.type}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Sticky Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="sticky top-20 space-y-4">
              {/* Hire Card */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>${helper.hourlyRate}</span>
                  <span className="text-sm text-gray-400">/hr</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Starting rate · Final price depends on scope</p>
                <div className="space-y-2 mb-4">
                  <button className="w-full py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap">
                    Hire {helper.name.split(' ')[0]}
                  </button>
                  <button className="w-full py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:border-[#e94560] hover:text-[#e94560] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center">
                      <i className="ri-message-3-line text-sm"></i>
                    </div>
                    Send Message
                  </button>
                </div>
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-emerald-500">
                      <i className="ri-shield-check-line text-sm"></i>
                    </div>
                    Secure escrow payment
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-emerald-500">
                      <i className="ri-refund-2-line text-sm"></i>
                    </div>
                    Money-back guarantee
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 flex items-center justify-center text-emerald-500">
                      <i className="ri-time-line text-sm"></i>
                    </div>
                    Responds in ~{helper.speedOfResponseInMinutes} min
                  </div>
                </div>
              </div>
              {/* Quick Stats */}
              <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h4 className="text-sm font-bold text-[#1a1a2e] mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  {[
                    { label: 'Member since', value: '2024' },
                    { label: 'Total earnings', value: `$${(helper.totalEarnings / 1000).toFixed(1)}K` },
                    { label: 'Completion rate', value: '98%' },
                    { label: 'On-time delivery', value: '96%' },
                  ].map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{stat.label}</span>
                      <span className="text-xs font-bold text-[#1a1a2e]">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Back to browse */}
              <Link
                to="/helpers"
                className="flex items-center justify-center gap-2 w-full py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-[#e94560] hover:text-[#e94560] transition-colors whitespace-nowrap"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-arrow-left-line text-sm"></i>
                </div>
                Back to Browse
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ReportModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
        targetType="User"
        targetId={helper.id}
        targetName={helper.name}
      />
    </div>
  );
}
