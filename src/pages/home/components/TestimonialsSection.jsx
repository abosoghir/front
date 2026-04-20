import { useState } from 'react';
const testimonials = [
  {
    quote: 'Wasla completely changed how I find freelance work. The platform is clean, the seekers are serious, and the payment system is rock solid. I\'ve completed over 40 tasks in 6 months!',
    name: 'Ahmed Hassan',
    role: 'Helper · Full-Stack Developer',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20man%20portrait%20friendly%20smile%20clean%20white%20background%20developer%20tech%20worker%20confident%20look&width=56&height=56&seq=testi-1&orientation=squarish',
    earnings: '$4,200 earned',
  },
  {
    quote: 'I posted my first task and had 8 offers within 2 hours. The quality of helpers is amazing. The milestone system gave me full control over the project. Highly recommend!',
    name: 'Sara Mohamed',
    role: 'Seeker · Startup Founder',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20portrait%20friendly%20smile%20clean%20white%20background%20entrepreneur%20business%20confident%20look&width=56&height=56&seq=testi-2&orientation=squarish',
    earnings: '$12,000 spent',
  },
  {
    quote: 'The AI tools are a game changer. I used the proposal generator and my acceptance rate went from 20% to 65%. The points system keeps me motivated to do more.',
    name: 'Omar Khalil',
    role: 'Helper · UI/UX Designer',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20man%20designer%20portrait%20friendly%20smile%20clean%20white%20background%20creative%20confident%20look%20modern&width=56&height=56&seq=testi-3&orientation=squarish',
    earnings: '$7,800 earned',
  },
  {
    quote: 'As a small business owner, Wasla saved me thousands. I found a verified developer who built my entire e-commerce site for a fraction of agency prices. Incredible value.',
    name: 'Nour Adel',
    role: 'Seeker · E-commerce Owner',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20business%20owner%20portrait%20friendly%20smile%20clean%20white%20background%20confident%20modern%20look&width=56&height=56&seq=testi-4&orientation=squarish',
    earnings: '$3,500 saved',
  },
  {
    quote: 'The verification system builds real trust. I know every helper I work with has been vetted. The chat system is smooth and the notifications keep me on top of everything.',
    name: 'Karim Youssef',
    role: 'Seeker · Marketing Manager',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20man%20marketing%20manager%20portrait%20friendly%20smile%20clean%20white%20background%20confident%20modern%20look&width=56&height=56&seq=testi-5&orientation=squarish',
    earnings: '$8,900 spent',
  },
  {
    quote: 'I love the badge system Earning the "Top Helper" badge opened so many doors. Seekers trust me more and I get premium offers now. Wasla really rewards hard work.',
    name: 'Layla Ibrahim',
    role: 'Helper · Content Writer',
    rating: 5,
    avatar: 'https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20writer%20portrait%20friendly%20smile%20clean%20white%20background%20creative%20confident%20modern%20look&width=56&height=56&seq=testi-6&orientation=squarish',
    earnings: '$5,600 earned',
  },
];
export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const visible = testimonials.slice(active, active + 3);
  return (
    <section className="py-24 bg-[#1a1a2e]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#e94560] mb-3 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Loved by Seekers &amp; Helpers
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Join thousands of satisfied users who trust Wasla every day.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {visible.map((t, i) => (
            <div
              key={active + i}
              className={`bg-white rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 ${i === 1 ? 'md:mt-6' : ''}`}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-double-quotes-l text-3xl text-[#e94560]/30"></i>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed flex-1">{t.quote}</p>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <div key={j} className="w-4 h-4 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover object-top border-2 border-[#e94560]/20"
                  />
                  <div>
                    <div className="text-sm font-bold text-[#1a1a2e]">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#e94560] bg-[#e94560]/10 px-2 py-1 rounded-full whitespace-nowrap">
                  {t.earnings}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-30 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: testimonials.length - 2 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${active === i ? 'bg-[#e94560] w-6' : 'bg-white/30'}`}
              />
            ))}
          </div>
          <button
            onClick={() => setActive(Math.min(testimonials.length - 3, active + 1))}
            disabled={active >= testimonials.length - 3}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 disabled:opacity-30 transition-colors cursor-pointer"
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>
    </section>
  );
}