
const roles = [
  {
    id: 'seeker',
    icon: 'ri-search-2-line',
    title: 'I\'m a Seeker',
    subtitle: 'I need help with tasks & projects',
    perks: [
      'Post tasks and projects for free',
      'Receive offers from verified helpers',
      'Secure milestone-based payments',
      'Review and rate helpers',
    ],
    color: 'border-[#e94560] bg-[#e94560]/5',
    iconBg: 'bg-[#e94560]/10 text-[#e94560]',
    badge: 'Most Popular',
  },
  {
    id: 'helper',
    icon: 'ri-tools-line',
    title: 'I\'m a Helper',
    subtitle: 'I offer skills and services',
    perks: [
      'Showcase your skills & portfolio',
      'Submit offers on tasks & projects',
      'Earn points, badges & rewards',
      'AI-powered proposal generator',
    ],
    color: 'border-[#1a1a2e] bg-[#1a1a2e]/5',
    iconBg: 'bg-[#1a1a2e]/10 text-[#1a1a2e]',
    badge: 'Earn More',
  },
];
export default function StepRoleSelect({ role, onSelect, onNext }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          How will you use Wasla?
        </h2>
        <p className="text-gray-500 text-sm">Choose your role — you can always switch later.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {roles.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            className={`relative text-left p-6 rounded-xl border-2 transition-all cursor-pointer ${
              role === r.id ? r.color : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
              r.id === 'seeker' ? 'bg-[#e94560]/10 text-[#e94560]' : 'bg-[#1a1a2e]/10 text-[#1a1a2e]'
            }`}>
              {r.badge}
            </span>
            <div className={`w-12 h-12 flex items-center justify-center rounded-xl mb-4 ${r.iconBg}`}>
              <i className={`${r.icon} text-xl`}></i>
            </div>
            <div className="font-bold text-[#1a1a2e] text-base mb-1">{r.title}</div>
            <div className="text-gray-500 text-xs mb-4">{r.subtitle}</div>
            <ul className="space-y-1.5">
              {r.perks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-xs text-gray-600">
                  <div className="w-3.5 h-3.5 flex items-center justify-center shrink-0 mt-0.5">
                    <i className={`ri-check-line text-xs ${r.id === 'seeker' ? 'text-[#e94560]' : 'text-[#1a1a2e]'}`}></i>
                  </div>
                  {perk}
                </li>
              ))}
            </ul>
            {role === r.id && (
              <div className={`absolute top-3 left-3 w-5 h-5 flex items-center justify-center rounded-full ${
                r.id === 'seeker' ? 'bg-[#e94560]' : 'bg-[#1a1a2e]'
              }`}>
                <i className="ri-check-line text-white text-xs"></i>
              </div>
            )}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={!role}
        className="w-full py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
      >
        Continue
        <div className="w-4 h-4 flex items-center justify-center">
          <i className="ri-arrow-right-line"></i>
        </div>
      </button>
    </div>
  );
}