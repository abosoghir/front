import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-[#1a1a2e]">Wasla</span>
        </h1>
        <div className="hidden md:flex items-center gap-8">
          {['How It Works', 'Categories', 'For Helpers', 'For Seekers'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                scrolled ? 'text-gray-600 hover:text-[#e94560]' : 'text-white/90 hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
              scrolled ? 'text-gray-700 hover:text-[#e94560]' : 'text-white/90 hover:text-white'
            }`}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="text-sm font-semibold px-5 py-2 rounded-md bg-[#e94560] text-white hover:bg-[#c73652] transition-colors whitespace-nowrap"
          >
            Get Started
          </Link>
        </div>
        <button
          className={`md:hidden w-8 h-8 flex items-center justify-center ${scrolled ? 'text-gray-700' : 'text-white'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className={`ri-${menuOpen ? 'close' : 'menu'}-line text-xl`}></i>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {['How It Works', 'Categories', 'For Helpers', 'For Seekers'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm font-medium text-gray-700 hover:text-[#e94560]"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <div className="flex gap-3 pt-2 border-t border-gray-100">
            <Link to="/login" className="flex-1 text-center text-sm font-medium py-2 border border-gray-200 rounded-md text-gray-700">
              Sign In
            </Link>
            <Link to="/register" className="flex-1 text-center text-sm font-semibold py-2 bg-[#e94560] text-white rounded-md">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}