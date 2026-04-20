const features = [
  {
    icon: 'ri-shield-check-line',
    title: 'Secure Escrow Payments',
    description: 'Your money is held safely until the work is delivered and approved. No risk, full protection for both seekers and helpers.',
    badge: '100% Secure',
    large: true,
    color: 'bg-[#e94560]/10 text-[#e94560]',
  },
  {
    icon: 'ri-verified-badge-line',
    title: 'Verified Helpers',
    description: 'Every helper goes through identity and skill verification. Work with confidence knowing you\'re hiring trusted professionals.',
    badge: '99% Verified',
    large: false,
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: 'ri-message-3-line',
    title: 'Real-time Messaging',
    description: 'Chat directly with helpers or seekers. Share files, voice messages, and coordinate seamlessly within the platform.',
    badge: 'Instant',
    large: false,
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: 'ri-robot-2-line',
    title: 'AI-Powered Tools',
    description: 'Boost your profile with AI. Generate proposals, improve your CV, summarize files, and enhance your profile — all powered by smart AI tools.',
    badge: '5 AI Features',
    large: true,
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: 'ri-trophy-line',
    title: 'Gamification & Rewards',
    description: 'Earn points and badges complete tasks. Every 5th task is free for helpers!',
    badge: 'Points & Badges',
    large: false,
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: 'ri-bar-chart-grouped-line',
    title: 'Milestone Tracking',
    description: 'Break large projects into milestones. Track progress, approve deliverables, and release payments step by step.',
    badge: 'Full Control',
    large: false,
    color: 'bg-sky-50 text-sky-600',
  },
];
export default function FeaturesSection() {
  return (
    <section id="how-it-works" className="py-24 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#e94560] mb-3 block">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Everything You Need
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Powerful features designed for seamless collaboration between seekers and helpers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`group bg-white rounded-2xl p-7 border border-gray-100 hover:-translate-y-1 transition-all duration-300 cursor-default ${
                f.large ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${f.color}`}>
                  <i className={`${f.icon} text-xl`}></i>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 text-gray-500 whitespace-nowrap">
                  {f.badge}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#1a1a2e] mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}