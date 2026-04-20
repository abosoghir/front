import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
export default function StepSuccess({ role, name }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);
  const nextSteps = role === 'seeker'
    ? [
        { icon: 'ri-file-add-line', text: 'Post your first task', href: '/' },
        { icon: 'ri-search-2-line', text: 'Browse available helpers', href: '/helpers' },
        { icon: 'ri-wallet-3-line', text: 'Add funds to your wallet', href: '/' },
      ]
    : [
        { icon: 'ri-user-settings-line', text: 'Complete your profile', href: '/' },
        { icon: 'ri-briefcase-line', text: 'Browse open tasks', href: '/tasks' },
        { icon: 'ri-robot-2-line', text: 'Try AI proposal generator', href: '/' },
      ];
  return (
    <div className={`text-center transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-emerald-50 border-4 border-emerald-100">
          <i className="ri-check-line text-4xl text-emerald-500"></i>
        </div>
      </div>
      <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
        Welcome, {name.split(' ')[0]}
      </h2>
      <p className="text-gray-500 text-sm mb-2">
        Your account has been created successfully.
      </p>
      <div className="inline-flex items-center gap-1.5 bg-[#e94560]/10 text-[#e94560] text-xs font-semibold px-3 py-1.5 rounded-full mb-8">
        <div className="w-3.5 h-3.5 flex items-center justify-center">
          <i className={`${role === 'seeker' ? 'ri-search-2-line' : 'ri-tools-line'} text-xs`}></i>
        </div>
        Registered {role === 'seeker' ? 'Seeker' : 'Helper'}
      </div>
      <div className="bg-[#fafafa] rounded-xl p-5 mb-6 text-left">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Suggested next steps</p>
        <div className="space-y-3">
          {nextSteps.map((step, i) => (
            <Link
              key={i}
              to={step.href}
              className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-[#e94560]/30 hover:bg-[#e94560]/5 transition-all group"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#e94560]/10 shrink-0">
                <i className={`${step.icon} text-[#e94560] text-sm`}></i>
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-[#e94560] transition-colors flex-1">
                {step.text}
              </span>
              <div className="w-4 h-4 flex items-center justify-center text-gray-300 group-hover:text-[#e94560] transition-colors">
                <i className="ri-arrow-right-line text-sm"></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Link
        to="/"
        className="block w-full py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}