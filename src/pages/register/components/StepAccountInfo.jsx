import { useState } from 'react';
function getPasswordStrength(password) {
  if (!password) return { level: 0, label: '', color: '' };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 1) return { level: 1, label: 'Weak', color: 'bg-red-400' };
  if (score === 2) return { level: 2, label: 'Fair', color: 'bg-amber-400' };
  if (score === 3) return { level: 3, label: 'Good', color: 'bg-emerald-400' };
  return { level: 4, label: 'Strong', color: 'bg-emerald-500' };
}
export default function StepAccountInfo({ role, data, onChange, onNext, onBack }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const strength = getPasswordStrength(data.password);
  const validate = () => {
    const e = {};
    if (!data.name.trim()) e.name = 'Full name is required';
    if (!data.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(data.email)) e.email = 'Enter a valid email';
    if (!data.password) e.password = 'Password is required';
    else if (data.password.length < 8) e.password = 'At least 8 characters required';
    if (data.password !== data.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleNext = () => {
    if (validate()) onNext();
  };
  const field = (
    key,
    label,
    type,
    placeholder,
    icon,
    extra
  ) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
          <i className={`${icon} text-base`}></i>
        </div>
        <input
          type={type}
          value={data[key]}
          onChange={(e) => {
            onChange({ ...data, [key]: e.target.value });
            setErrors({ ...errors, [key]: '' });
          }}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 text-sm border rounded-lg outline-none transition-all ${
            errors[key]
              ? 'border-red-400 focus:ring-2 focus:ring-red-100'
              : 'border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10'
          }`}
        />
        {extra}
      </div>
      {errors[key] && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <i className="ri-error-warning-line"></i> {errors[key]}
        </p>
      )}
    </div>
  );
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          Create your account
        </h2>
        <p className="text-gray-500 text-sm">
          Signing up{' '}
          <span className="font-semibold text-[#e94560] capitalize">{role}</span>
        </p>
      </div>
      <div className="space-y-4 mb-6">
        {field('name', 'Full Name', 'text', 'Your full name', 'ri-user-line')}
        {field('email', 'Email Address', 'email', 'you@example.com', 'ri-mail-line')}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
              <i className="ri-lock-line text-base"></i>
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={data.password}
              onChange={(e) => {
                onChange({ ...data, password: e.target.value });
                setErrors({ ...errors, password: '' });
              }}
              placeholder="Min. 8 characters"
              className={`w-full pl-10 pr-10 py-3 text-sm border rounded-lg outline-none transition-all ${
                errors.password
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                  : 'border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className={`${showPassword ? 'ri-eye-off-line' : 'ri-eye-line'} text-base`}></i>
            </button>
          </div>
          {data.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i <= strength.level ? strength.color : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                Password strength: <span className="font-semibold">{strength.label}</span>
              </p>
            </div>
          )}
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <i className="ri-error-warning-line"></i> {errors.password}
            </p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400">
              <i className="ri-lock-2-line text-base"></i>
            </div>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={data.confirmPassword}
              onChange={(e) => {
                onChange({ ...data, confirmPassword: e.target.value });
                setErrors({ ...errors, confirmPassword: '' });
              }}
              placeholder="Repeat your password"
              className={`w-full pl-10 pr-10 py-3 text-sm border rounded-lg outline-none transition-all ${
                errors.confirmPassword
                  ? 'border-red-400 focus:ring-2 focus:ring-red-100'
                  : data.confirmPassword && data.password === data.confirmPassword
                  ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-100'
                  : 'border-gray-200 focus:border-[#e94560] focus:ring-2 focus:ring-[#e94560]/10'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className={`${showConfirm ? 'ri-eye-off-line' : 'ri-eye-line'} text-base`}></i>
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <i className="ri-error-warning-line"></i> {errors.confirmPassword}
            </p>
          )}
          {data.confirmPassword && data.password === data.confirmPassword && !errors.confirmPassword && (
            <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
              <i className="ri-check-line"></i> Passwords match
            </p>
          )}
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 py-3 border border-gray-200 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="flex-1 py-3 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
        >
          Continue
          <div className="w-4 h-4 flex items-center justify-center">
            <i className="ri-arrow-right-line"></i>
          </div>
        </button>
      </div>
    </div>
  );
}