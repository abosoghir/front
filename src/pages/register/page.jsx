import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import StepRoleSelect from './components/StepRoleSelect';
import StepAccountInfo from './components/StepAccountInfo';
import StepProfile from './components/StepProfile';
import StepSuccess from './components/StepSuccess';

const STEPS = ['Role', 'Account', 'Profile', 'Done'];
const sideImages = {
  0: 'https://readdy.ai/api/search-image?query=abstract%20digital%20network%20connection%20nodes%20glowing%20lines%20dark%20navy%20background%20technology%20collaboration%20freelance%20marketplace%20futuristic%20geometric%20shapes%20professional%20clean%20minimal%20dark%20blue%20teal%20accent%20lights%20tall%20portrait&width=720&height=1080&seq=reg-bg-001&orientation=portrait',
  1: 'https://readdy.ai/api/search-image?query=professional%20person%20creating%20account%20laptop%20registration%20form%20modern%20clean%20workspace%20warm%20light%20focused%20minimal%20background%20neutral%20tones%20tall%20portrait&width=720&height=1080&seq=reg-bg-002&orientation=portrait',
  2: 'https://readdy.ai/api/search-image?query=freelancer%20setting%20up%20profile%20portfolio%20laptop%20creative%20workspace%20modern%20clean%20professional%20warm%20light%20minimal%20background%20tall%20portrait&width=720&height=1080&seq=reg-bg-003&orientation=portrait',
  3: 'https://readdy.ai/api/search-image?query=happy%20person%20celebrating%20success%20account%20created%20laptop%20modern%20clean%20workspace%20bright%20warm%20light%20professional%20satisfied%20expression%20tall%20portrait&width=720&height=1080&seq=reg-bg-004&orientation=portrait',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const { register, login } = useAuth();
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [registerError, setRegisterError] = useState('');
  const [registerLoading, setRegisterLoading] = useState(false);
  const [accountData, setAccountData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    headline: '',
    hourlyRate: '',
    skills: [],
    companyName: '',
  });

  const handleFinish = async () => {
    setRegisterLoading(true);
    setRegisterError('');
    try {
      // Register the user
      await register(
        accountData.name,
        accountData.email,
        accountData.phoneNumber,
        accountData.password,
        role === 'seeker' ? 'Seeker' : 'Helper'
      );

      // Navigate to Verify Email page
      navigate('/verify-email', { state: { email: accountData.email } });
    } catch (err) {
      setRegisterError(err.message || 'Registration failed. Please try again.');
    } finally {
      setRegisterLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="hidden lg:flex lg:w-5/12 relative flex-col justify-between p-12 overflow-hidden">
        <img
          src={sideImages[step]}
          alt="Register background"
          className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d1a]/85 via-[#0d0d1a]/70 to-[#e94560]/50"></div>
        <div className="relative z-10">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-white">Wasla</span>
          </Link>
        </div>
        <div className="relative z-10">
          {step === 0 && (
            <div>
              <div className="text-5xl font-black text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Join 50,000+<br />
                <span className="text-[#e94560]">Professionals</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Whether you need help or want to offer your skills, Wasla is the platform for you.
              </p>
            </div>
          )}
          {step === 1 && (
            <div>
              <div className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Secure &amp;<br />
                <span className="text-[#e94560]">Private</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Your data is encrypted and protected. We never share your personal information with third parties.
              </p>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shield-check-line text-emerald-400 text-base"></i>
                </div>
                <span className="text-emerald-400 text-sm font-medium">256-bit SSL encryption</span>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                Stand Out<br />
                <span className="text-[#e94560]">From the Crowd</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                A complete profile gets 3x more opportunities. Take a few minutes to set it up right.
              </p>
            </div>
          )}
          {step === 3 && (
            <div>
              <div className="text-4xl font-black text-white mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
                You&apos;re All<br />
                <span className="text-[#e94560]">Set!</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Your account is ready. Start exploring the platform and make things happen.
              </p>
            </div>
          )}
        </div>
        <div className="relative z-10 flex flex-wrap gap-3">
          {[
            { icon: 'ri-shield-check-line', label: 'Verified Platform' },
            { icon: 'ri-lock-line', label: 'Secure Payments' },
            { icon: 'ri-customer-service-2-line', label: '24/7 Support' },
          ].map((b) => (
            <div key={b.label} className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5">
              <div className="w-3.5 h-3.5 flex items-center justify-center">
                <i className={`${b.icon} text-white/70 text-xs`}></i>
              </div>
              <span className="text-white/70 text-xs">{b.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full lg:w-7/12 flex flex-col bg-white">
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <Link to="/" className="lg:hidden text-xl font-bold">
            <span className="text-[#1a1a2e]">Wasla</span>
          </Link>
          <div className="hidden lg:block"></div>
          {step < 3 && (
            <div className="flex items-center gap-2">
              {STEPS.slice(0, 3).map((label, i) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                        i < step
                          ? 'bg-emerald-500 text-white'
                          : i === step
                          ? 'bg-[#e94560] text-white'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {i < step ? <i className="ri-check-line text-xs"></i> : i + 1}
                    </div>
                    <span className={`text-xs font-medium hidden sm:block ${i === step ? 'text-[#e94560]' : i < step ? 'text-emerald-500' : 'text-gray-400'}`}>
                      {label}
                    </span>
                  </div>
                  {i < 2 && <div className={`w-8 h-px ${i < step ? 'bg-emerald-300' : 'bg-gray-200'}`}></div>}
                </div>
              ))}
            </div>
          )}
          <div className="text-sm text-gray-500">
            {step < 3 ? (
              <>
                Have an account?{' '}
                <Link to="/login" className="text-[#e94560] font-semibold hover:underline">
                  Sign in
                </Link>
              </>
            ) : null}
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-lg">
            {registerError && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-5">
                <div className="w-4 h-4 flex items-center justify-center shrink-0">
                  <i className="ri-error-warning-line text-red-500 text-sm"></i>
                </div>
                <span className="text-red-600 text-sm">{registerError}</span>
              </div>
            )}
            {step === 0 && (
              <StepRoleSelect
                role={role}
                onSelect={setRole}
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && role && (
              <StepAccountInfo
                role={role}
                data={accountData}
                onChange={setAccountData}
                onNext={() => setStep(2)}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && role && (
              <StepProfile
                role={role}
                data={profileData}
                onChange={setProfileData}
                onNext={handleFinish}
                onBack={() => setStep(1)}
                loading={registerLoading}
              />
            )}
            {step === 3 && role && (
              <StepSuccess role={role} name={accountData.name || 'Friend'} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}