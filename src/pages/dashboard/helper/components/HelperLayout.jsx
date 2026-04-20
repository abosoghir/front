import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HelperSidebar from './HelperSidebar';
const mobileNavItems = [
  { label: 'Overview', href: '/dashboard/helper', icon: 'ri-dashboard-line', exact: true },
  { label: 'Tasks', href: '/dashboard/helper/tasks', icon: 'ri-task-line' },
  { label: 'Browse', href: '/dashboard/helper/browse', icon: 'ri-search-2-line' },
  { label: 'Earnings', href: '/dashboard/helper/earnings', icon: 'ri-money-dollar-circle-line' },
  { label: 'Points', href: '/dashboard/helper/points', icon: 'ri-trophy-line' },
];
export default function HelperLayout({ children, title, subtitle, action }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const isActive = (href, exact = false) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);
  return (
    <div className="flex h-screen bg-[#f7f7f8] overflow-hidden" style={{ fontFamily: 'Inter, sans-serif' }}>
      <HelperSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-100 px-6 h-16 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold text-[#1a1a2e]">{title}</h2>
            {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-3">
            {action && (
              <Link
                to={action.href}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
              >
                {action.icon && (
                  <div className="w-4 h-4 flex items-center justify-center">
                    <i className={`${action.icon} text-sm`}></i>
                  </div>
                )}
                {action.label}
              </Link>
            )}
            <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer relative">
              <i className="ri-notification-3-line text-lg"></i>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e94560] rounded-full"></span>
            </button>
            <img
              src="https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20designer%20portrait%20friendly%20smile%20clean%20white%20background%20creative%20confident%20headshot&width=36&height=36&seq=helper-topbar-av-001&orientation=squarish"
              alt="Helper"
              className="w-8 h-8 rounded-full object-cover object-top cursor-pointer"
            />
          </div>
        </header>
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
        <nav className="lg:hidden bg-white border-t border-gray-100 flex items-center justify-around px-2 py-2 shrink-0">
          {mobileNavItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
                  active ? 'text-[#e94560]' : 'text-gray-400'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}