import { Link } from 'react-router-dom';
const stats = [
  { icon: 'ri-group-line', value: '50K+', label: 'Active Users' },
  { icon: 'ri-emotion-happy-line', value: '98%', label: 'Satisfaction' },
  { icon: 'ri-customer-service-2-line', value: '24/7', label: 'Support' },
  { icon: 'ri-lock-line', value: '100%', label: 'Secure Payments' },
];
export default function CTASection() {
  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <div className="relative rounded-3xl overflow-hidden mb-12">
          <img
            src="https://readdy.ai/api/search-image?query=abstract%20network%20connection%20nodes%20glowing%20lines%20dark%20navy%20background%20technology%20collaboration%20freelance%20marketplace%20futuristic%20geometric%20shapes%20professional%20clean%20minimal%20dark%20blue%20teal%20accent%20lights%20wide%20banner&width=1000&height=360&seq=cta-bg-001&orientation=landscape"
            alt="CTA background"
            className="w-full h-64 object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#1a1a2e]/80 to-[#e94560]/60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-base md:text-lg max-w-xl">
              Join our growing community of seekers and helpers today. No credit card required.
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/register"
            className="px-8 py-4 bg-[#e94560] text-white rounded-lg font-bold text-base hover:bg-[#c73652] transition-colors whitespace-nowrap"
          >
            Create Free Account
          </Link>
          <Link
            to="/helpers"
            className="px-8 py-4 border-2 border-[#1a1a2e] text-[#1a1a2e] rounded-lg font-bold text-base hover:bg-[#1a1a2e] hover:text-white transition-colors whitespace-nowrap"
          >
            Browse Helpers
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e94560]/10">
                <i className={`${s.icon} text-[#e94560] text-lg`}></i>
              </div>
              <div className="text-xl font-black text-[#1a1a2e]" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}