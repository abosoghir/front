import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await login(form.email, form.password);
      // Redirect to intended page or role-based dashboard
      const from = location.state?.from?.pathname;
      if (from) {
        navigate(from, { replace: true });
      } else if (data.roles?.includes('Helper')) {
        navigate('/dashboard/helper', { replace: true });
      } else {
        navigate('/dashboard/seeker', { replace: true });
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      if (errorMsg === 'Email is not confirmed' || errorMsg?.includes('not confirmed') || errorMsg?.includes('EmailNotConfirmed')) {
        setError(
          <span>
            Please confirm your email first.{' '}
            <Link to="/verify-email" state={{ email: form.email }} className="underline font-semibold hover:text-red-700">
              Verify now
            </Link>
          </span>
        );
      } else {
        setError(errorMsg || 'Invalid email or password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12 overflow-hidden">
        <img
          src="https://readdy.ai/api/search-image?query=abstract%20digital%20network%20connection%20nodes%20glowing%20lines%20dark%20navy%20background%20technology%20collaboration%20freelance%20marketplace%20futuristic%20geometric%20shapes%20professional%20clean%20minimal%20dark%20blue%20teal%20accent%20lights%20tall%20portrait&width=720&height=1080&seq=login-bg-001&orientation=portrait"
          alt="Login background"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/80 via-[#0d0d1a]/70 to-[#e94560]/40"></div>
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">Wasla</span>
          </Link>
        </div>
        <div className="relative z-10">
          <div className="w-10 h-10 flex items-center justify-center mb-4">
            <i className="ri-double-quotes-l text-4xl text-[#e94560]/60"></i>
          </div>
          <p className="text-white text-xl font-semibold leading-relaxed mb-6 max-w-sm">
            "Wasla helped me land my first freelance client within 48 hours. The platform just works."
          </p>
          <div className="flex items-center gap-3">
            <img
              src="https://readdy.ai/api/search-image?query=young%20professional%20Egyptian%20man%20portrait%20friendly%20smile%20clean%20white%20background%20developer%20tech%20worker%20confident%20look&width=44&height=44&seq=login-avatar-001&orientation=squarish"
              alt="Testimonial"
              className="w-11 h-11 rounded-full object-cover object-top border-2 border-white/30"
            />
            <div>
              <div className="text-white text-sm font-semibold">Ahmed Hassan</div>
              <div className="text-white/50 text-xs">Full-Stack Developer · Helper</div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex gap-8">
          {[
            { value: '50K+', label: 'Users' },
            { value: '120K+', label: 'Tasks Done' },
            { value: '4.9★', label: 'Rating' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-white text-xl font-black" style={{ fontFamily: 'Sora, sans-serif' }}>{s.value}</div>
              <div className="text-white/50 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <Link to="/" className="text-2xl font-bold">
              <span className="text-[#1a1a2e]">Wasla</span>
            </Link>
          </div>
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              Welcome back
            </h2>
            <p className="text-gray-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-[#e94560] font-semibold hover:underline">
                Sign up free
              </Link>
            </p>
          </div>
          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-google-fill text-base text-red-500"></i>
              </div>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-linkedin-fill text-base text-sky-600"></i>
              </div>
              LinkedIn
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-github-fill text-base text-gray-800"></i>
              </div>
              GitHub
            </button>
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">or continue with email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>
          {successMessage && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-5">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <i className="ri-check-line text-emerald-500 text-sm"></i>
              </div>
              <span className="text-emerald-600 text-sm">{successMessage}</span>
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
              <div className="w-4 h-4 flex items-center justify-center shrink-0">
                <i className="ri-error-warning-line text-red-500 text-sm"></i>
              </div>
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-mail-line text-base"></i>
                </div>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs text-[#e94560] hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
                  <i className="ri-lock-line text-base"></i>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-3 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-base`}></i>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-gray-300 accent-[#e94560] cursor-pointer"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me for 30 days
              </label>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors disabled:opacity-60 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <i className="ri-loader-4-line animate-spin text-base"></i>
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-8">
            By signing in, you agree to our{' '}
            <a href="#" className="underline hover:text-[#e94560]">Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="underline hover:text-[#e94560]">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}