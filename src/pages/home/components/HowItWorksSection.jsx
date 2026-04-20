const steps = [
  {
    number: '01',
    icon: 'ri-file-add-line',
    title: 'Post Your Need',
    description: 'Create a task or project in minutes. Describe what you need, set your budget, and choose a deadline. It\'s completely free to post.',
    bullets: ['Free to post tasks & projects', 'Set your own budget', 'Choose from 10+ categories'],
    image: 'https://readdy.ai/api/search-image?query=person%20typing%20on%20laptop%20posting%20job%20task%20online%20freelance%20platform%20clean%20minimal%20workspace%20desk%20warm%20light%20professional%20modern%20office%20environment%20soft%20background%20neutral%20tones&width=480&height=280&seq=step-post-001&orientation=landscape',
    color: 'bg-[#e94560]/10',
    iconColor: 'text-[#e94560]',
  },
  {
    number: '02',
    icon: 'ri-shake-hands-line',
    title: 'Connect & Negotiate',
    description: 'Receive offers from verified helpers. Review their profiles, ratings, and portfolios. Chat directly and agree on terms before starting.',
    bullets: ['Review helper profiles & ratings', 'Compare multiple offers', 'Chat before committing'],
    image: 'https://readdy.ai/api/search-image?query=two%20professionals%20shaking%20hands%20agreement%20collaboration%20freelance%20deal%20modern%20office%20clean%20background%20business%20meeting%20warm%20neutral%20tones%20professional%20atmosphere&width=480&height=280&seq=step-connect-001&orientation=landscape',
    color: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    number: '03',
    icon: 'ri-award-line',
    title: 'Complete & Review',
    description: 'Work gets done, milestones are approved, and payment is released securely. Leave a review to help the community grow.',
    bullets: ['Secure milestone-based payments', 'Approve deliverables step by step', 'Earn points & badges'],
    image: 'https://readdy.ai/api/search-image?query=happy%20person%20celebrating%20task%20completion%20success%20freelance%20work%20done%20laptop%20thumbs%20up%20modern%20clean%20workspace%20bright%20warm%20light%20professional%20satisfied%20expression&width=480&height=280&seq=step-complete-001&orientation=landscape',
    color: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];
export default function HowItWorksSection() {
  return (
    <section id="for-seekers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest uppercase text-[#e94560] mb-3 block">Simple Process</span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            How Wasla Works
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Get started in three simple steps. No complicated setup, no hidden fees.
          </p>
        </div>
        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`flex flex-col ${i % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 items-center bg-[#fafafa] rounded-2xl overflow-hidden border border-gray-100`}
            >
              <div className="w-full lg:w-1/2 h-56 lg:h-72 overflow-hidden">
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${step.color}`}>
                    <i className={`${step.icon} text-xl ${step.iconColor}`}></i>
                  </div>
                  <span className="text-5xl font-black text-gray-100" style={{ fontFamily: 'Sora, sans-serif' }}>{step.number}</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{step.description}</p>
                <ul className="space-y-2">
                  {step.bullets.map((b, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <i className="ri-check-line text-[#e94560] text-sm"></i>
                      </div>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}