import { useState } from 'react';
const quickLinks = ['About Us', 'How It Works', 'Categories', 'Pricing', 'Blog'];
const supportLinks = ['Help Center', 'Contact Us', 'Terms of Service', 'Privacy Policy', 'Trust & Safety'];
export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      body.append('email', email);
      await fetch('https://readdy.ai/api/form/d7ifiluhdlg6dog9ddrg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setSubmitted(true);
      setEmail('');
    } catch {
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <footer className="bg-[#f5f5f5] border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="text-xl font-bold mb-3">
              <span className="text-[#1a1a2e]">Wasla</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-5 max-w-xs">
              Egypt's leading freelance marketplace connecting seekers with skilled helpers. Get things done, earn more, grow together.
            </p>
            <div className="flex gap-3">
              {[
                { icon: 'ri-linkedin-fill', href: '#' },
                { icon: 'ri-twitter-x-fill', href: '#' },
                { icon: 'ri-facebook-fill', href: '#' },
                { icon: 'ri-instagram-line', href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:border-[#e94560] hover:text-[#e94560] transition-colors"
                >
                  <i className={`${s.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Quick Links</div>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Support */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Support</div>
            <ul className="space-y-2.5">
              {supportLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <div className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-4">Stay Updated</div>
            <p className="text-sm text-gray-500 mb-4 leading-relaxed">
              Get the latest news, tips, and platform updates delivered to your inbox.
            </p>
            {submitted ? (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <div className="w-4 h-4 flex items-center justify-center">
                  <i className="ri-check-line"></i>
                </div>
                Thanks for subscribing
              </div>
            ) : (
              <form
                data-readdy-form
                onSubmit={handleSubmit}
                className="flex gap-2"
              >
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="flex-1 text-sm px-3 py-2.5 border border-gray-200 rounded-lg bg-white outline-none focus:border-[#e94560] transition-colors"
                />
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-10 h-10 flex items-center justify-center bg-[#e94560] text-white rounded-lg hover:bg-[#c73652] transition-colors disabled:opacity-60 cursor-pointer shrink-0"
                >
                  <i className="ri-send-plane-line text-sm"></i>
                </button>
              </form>
            )}
            <p className="text-xs text-gray-400 mt-2">
              We respect your privacy.{' '}
              <a href="#" className="underline hover:text-[#e94560]">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t border-gray-200 bg-[#efefef]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">© 2026 Wasla. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-xs text-gray-400 hover:text-[#e94560]">Terms</a>
            <a href="#" className="text-xs text-gray-400 hover:text-[#e94560]">Privacy</a>
            <a href="#" className="text-xs text-gray-400 hover:text-[#e94560]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}