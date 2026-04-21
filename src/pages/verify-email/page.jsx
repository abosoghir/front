import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import authService from '../../api/authService';

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [email] = useState(location.state?.email || '');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendStatus, setResendStatus] = useState('');

  // Fallback if accessed directly without email
  useEffect(() => {
    if (!email) {
      navigate('/login');
    }
  }, [email, navigate]);

  // Handle countdown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      setError('Please enter the 6-digit code');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // In the frontend API service, confirmEmail takes (userId, code) but we changed backend to (Email, Code)
      // So we will pass email as the first parameter. (We will also update authService.js to match)
      await authService.confirmEmail(email, code);
      
      // Success!
      // Navigate to login with success message
      navigate('/login', { state: { message: 'Email confirmed successfully! You can now log in.' } });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Invalid confirmation code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    setError('');
    setResendStatus('');
    try {
      await authService.resendConfirmationEmail(email);
      setCooldown(60);
      setResendStatus('A new code has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to resend code');
    }
  };

  if (!email) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold inline-block mb-6">
            <span className="text-[#1a1a2e]">Wasla</span>
          </Link>
          <div className="w-16 h-16 bg-[#e94560]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-mail-check-line text-[#e94560] text-3xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
          <p className="text-sm text-gray-500">
            We sent a 6-digit verification code to<br />
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        {resendStatus && (
          <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-600 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
            <i className="ri-check-line"></i>
            {resendStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="code" className="sr-only">Verification Code</label>
            <input
              id="code"
              name="code"
              type="text"
              required
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="appearance-none rounded-lg relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-[#e94560] focus:border-[#e94560] focus:z-10 text-center text-2xl tracking-widest font-mono"
              placeholder="000000"
            />
          </div>

          <button
            type="submit"
            disabled={loading || code.length < 6}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-[#e94560] hover:bg-[#d63d56] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e94560] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <i className="ri-loader-4-line animate-spin text-lg"></i>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <p className="text-gray-500 mb-2">Didn't receive the email?</p>
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className="text-[#e94560] font-semibold hover:underline disabled:text-gray-400 disabled:no-underline transition-colors"
          >
            {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Click to resend'}
          </button>
        </div>
      </div>
    </div>
  );
}
