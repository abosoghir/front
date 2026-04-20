import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navLinks = [
  { label: 'Browse Helpers', href: '/helpers' },
  { label: 'Tasks', href: '/tasks' },
  { label: 'Projects', href: '/projects' },
];

export default function AppNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, profile, isSeeker, isHelper, logout } = useAuth();
  const isActive = (href) => location.pathname === href;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const dashboardLink = isHelper ? '/dashboard/helper' : '/dashboard/seeker';
  const displayName = profile?.name || user?.name || 'User';
  const avatarUrl = profile?.profilePictureUrl;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
          <span className="text-[#1a1a2e]">Wasla</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? 'text-[#e94560] bg-[#e94560]/8'
                  : 'text-gray-600 hover:text-[#1a1a2e] hover:bg-gray-50'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/notifications"
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer relative"
              >
                <i className="ri-notification-3-line text-lg"></i>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#e94560] rounded-full"></span>
              </Link>
              <Link
                to="/messages"
                className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <i className="ri-message-3-line text-lg"></i>
              </Link>
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {avatarUrl ? (
                    <img src={avatarUrl} alt={displayName} className="w-8 h-8 rounded-full object-cover object-top" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[#e94560] flex items-center justify-center text-white text-sm font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{displayName}</span>
                  <i className={`ri-arrow-down-s-line text-gray-400 text-sm transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}></i>
                </button>
                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-gray-100 shadow-lg py-2 z-20">
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <p className="text-sm font-semibold text-[#1a1a2e] truncate">{displayName}</p>
                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                      </div>
                      <Link
                        to={dashboardLink}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-dashboard-line text-base text-gray-400"></i>
                        Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-user-settings-line text-base text-gray-400"></i>
                        Profile Settings
                      </Link>
                      <Link
                        to="/ai"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        <i className="ri-robot-line text-base text-gray-400"></i>
                        AI Tools
                      </Link>
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <button
                          onClick={() => { setDropdownOpen(false); handleLogout(); }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <i className="ri-logout-box-r-line text-base"></i>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              <button className="w-9 h-9 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer relative">
                <i className="ri-notification-3-line text-lg"></i>
              </button>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-[#e94560] transition-colors whitespace-nowrap"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="text-sm font-semibold px-4 py-2 bg-[#e94560] text-white rounded-lg hover:bg-[#c73652] transition-colors whitespace-nowrap"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
        <button
          className="md:hidden w-8 h-8 flex items-center justify-center text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`ri-${menuOpen ? 'close' : 'menu'}-line text-xl`}></i>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-medium py-2 ${isActive(link.href) ? 'text-[#e94560]' : 'text-gray-700'}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            {isAuthenticated ? (
              <>
                <Link to={dashboardLink} onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-medium py-2 border border-gray-200 rounded-lg text-gray-700">
                  Dashboard
                </Link>
                <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="flex-1 text-center text-sm font-semibold py-2 bg-red-500 text-white rounded-lg cursor-pointer">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-medium py-2 border border-gray-200 rounded-lg text-gray-700">
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-semibold py-2 bg-[#e94560] text-white rounded-lg">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}