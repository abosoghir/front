import { Link } from 'react-router-dom';
const perks = [
  { icon: 'ri-money-dollar-circle-line', title: 'Earn More', desc: 'Set your own rates and keep more of what you earn. Low platform fees.' },
  { icon: 'ri-robot-2-line', title: 'AI Proposal Generator', desc: 'Use AI to craft winning proposals and stand out from the competition.' },
  { icon: 'ri-trophy-line', title: 'Points & Badges', desc: 'Earn rewards for every task. Every 5th task is completely free for you.' },
  { icon: 'ri-shield-user-line', title: 'Build Your Reputation', desc: 'Verified profile, reviews, and badges that showcase your expertise.' },
];
export default function ForHelpersSection() {
  return (
    <section id="for-helpers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/2 relative">
            <div className="rounded-2xl overflow-hidden h-80 lg:h-[480px]">
              <img
                src="https://readdy.ai/api/search-image?query=confident%20freelancer%20helper%20working%20laptop%20home%20office%20professional%20modern%20clean%20workspace%20warm%20light%20successful%20young%20professional%20focused%20productive%20minimal%20background%20neutral%20tones&width=600&height=480&seq=helper-section-001&orientation=portrait"
                alt="Helper working"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="text-2xl font-black text-[#e94560]" style={{ fontFamily: 'Sora, sans-serif' }}>$4,200</div>
              <div className="text-xs text-gray-500 mt-0.5">Avg. monthly earnings</div>
              <div className="flex items-center gap-1 mt-1">
                <div className="w-3 h-3 flex items-center justify-center">
                  <i className="ri-arrow-up-line text-emerald-500 text-xs"></i>
                </div>
                <span className="text-xs text-emerald-500 font-medium">+32% this month</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="text-xs font-bold tracking-widest uppercase text-[#e94560] mb-3 block">For Helpers</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4 leading-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
              Turn Your Skills<br />Into Income
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-8">
              Join thousands of helpers who are building successful freelance careers on Wasla. Create your profile, showcase your skills, and start earning today.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {perks.map((p, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#fafafa] border border-gray-100">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#e94560]/10 shrink-0">
                    <i className={`${p.icon} text-[#e94560] text-base`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1a1a2e]">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#e94560] text-white rounded-lg font-semibold text-sm hover:bg-[#c73652] transition-colors whitespace-nowrap"
            >
              Start Helper
              <div className="w-4 h-4 flex items-center justify-center">
                <i className="ri-arrow-right-line"></i>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}