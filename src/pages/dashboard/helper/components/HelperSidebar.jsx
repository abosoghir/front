import { Link, useLocation } from 'react-router-dom';
import { mockConversations } from '@/mocks/messages';
const navItems = [
  { label: 'Overview', href: '/dashboard/helper', icon: 'ri-dashboard-line', exact: true },
  { label: 'Active Tasks', href: '/dashboard/helper/tasks', icon: 'ri-task-line' },
  { label: 'Browse Tasks', href: '/dashboard/helper/browse', icon: 'ri-search-2-line' },
  { label: 'My Offers', href: '/dashboard/helper/offers', icon: 'ri-send-plane-line' },
  { label: 'Earnings', href: '/dashboard/helper/earnings', icon: 'ri-money-dollar-circle-line' },
  { label: 'Points & Badges', href: '/dashboard/helper/points', icon: 'ri-trophy-line' },
  { label: 'Messages', href: '/messages', icon: 'ri-message-3-line', badge: true },
  { label: 'Notifications', href: '/notifications', icon: 'ri-notification-3-line' },
];
const bottomItems = [
  { label: 'My Profile', href: '/helpers/1', icon: 'ri-user-line' },
  { label: 'Settings', href: '/profile', icon: 'ri-settings-3-line' },
];
export default function HelperSidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const totalUnread = mockConversations.reduce((s, c) => s + c.unreadCount, 0);
  const isActive = (href, exact = false) =>
    exact ? location.pathname === href : location.pathname.startsWith(href);
  return (
    <aside
      className={`hidden lg:flex flex-col bg-[#1a1a2e] transition-all duration-300 shrink-0 ${collapsed ? 'w-16' : 'w-56'
        }`}
    >
      <div className={`flex items-center h-16 border-b border-white/10 px-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <Link to="/" className="text-lg font-bold">
            <span className="text-white">Wasla</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="w-7 h-7 flex items-center justify-center text-white/50 hover:text-white transition-colors cursor-pointer rounded-md hover:bg-white/10"
        >
          <i className={`${collapsed ? 'ri-menu-unfold-line' : 'ri-menu-fold-line'} text-base`}></i>
        </button>
      </div>
      {!collapsed && (
        <div className="px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <img
                src="https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20woman%20designer%20portrait%20friendly%20smile%20clean%20white%20background%20creative%20confident%20headshot&width=36&height=36&seq=helper-sidebar-av-001&orientation=squarish"
                alt="Helper"
                className="w-9 h-9 rounded-lg object-cover object-top"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#1a1a2e]"></span>
            </div>
            <div className="min-w-0">
              <div className="text-white text-sm font-semibold truncate">Layla Ibrahim</div>
              <div className="text-white/40 text-xs">Helper Account</div>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-white/10 rounded-full h-1.5">
              <div className="bg-[#e94560] h-1.5 rounded-full" style={{ width: '48%' }}></div>
            </div>
            <span className="text-white/40 text-xs whitespace-nowrap">430 pts</span>
          </div>
          <p className="text-white/30 text-xs mt-1">70 pts to Top Helper</p>
        </div>
      )}
      <nav className="flex-1 py-3 overflow-y-auto">
        {!collapsed && (
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-4 mb-2">Main</p>
        )}
        <ul className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            const showBadge = item.badge && totalUnread > 0;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active
                      ? 'bg-[#e94560] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                    } ${collapsed ? 'justify-center' : ''}`}
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0 relative">
                    <i className={`${item.icon} text-base`}></i>
                    {showBadge && collapsed && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#e94560] rounded-full border border-[#1a1a2e]"></span>
                    )}
                  </div>
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap flex-1">{item.label}</span>
                  )}
                  {!collapsed && showBadge && (
                    <span className="text-xs font-bold bg-[#e94560] text-white px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                      {totalUnread}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
        {!collapsed && (
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest px-4 mt-5 mb-2">Account</p>
        )}
        <ul className="space-y-0.5 px-2 mt-2">
          {bottomItems.map((item) => {
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  title={collapsed ? item.label : undefined}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${active
                      ? 'bg-[#e94560] text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                    } ${collapsed ? 'justify-center' : ''}`}
                >
                  <div className="w-4 h-4 flex items-center justify-center shrink-0">
                    <i className={`${item.icon} text-base`}></i>
                  </div>
                  {!collapsed && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-2 border-t border-white/10">
        <Link
          to="/"
          title={collapsed ? 'Sign Out' : undefined}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <div className="w-4 h-4 flex items-center justify-center shrink-0">
            <i className="ri-logout-box-line text-base"></i>
          </div>
          {!collapsed && <span className="text-sm font-medium whitespace-nowrap">Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
