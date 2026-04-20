import { useState } from 'react';
import { Link } from 'react-router-dom';

const seekerSteps = [
  {
    step: '01',
    title: 'Create Your Account',
    description: 'Sign up in under 2 minutes. Choose the Seeker role and complete your profile with your name, location, and preferences.',
    icon: 'ri-user-add-line',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
    image: 'https://readdy.ai/api/search-image?query=person%20signing%20up%20on%20laptop%20creating%20account%20registration%20form%20clean%20minimal%20interface%20white%20background%20professional%20modern%20design&width=480&height=300&seq=hiw-seeker-01&orientation=landscape',
  },
  {
    step: '02',
    title: 'Post Your Task',
    description: 'Describe what you need, set your budget, and choose a deadline. Add attachments or reference files to help helpers understand your requirements.',
    icon: 'ri-file-add-line',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    image: 'https://readdy.ai/api/search-image?query=person%20typing%20task%20description%20on%20laptop%20with%20form%20fields%20budget%20deadline%20clean%20modern%20interface%20white%20background%20professional%20workspace&width=480&height=300&seq=hiw-seeker-02&orientation=landscape',
  },
  {
    step: '03',
    title: 'Review Offers',
    description: 'Receive offers from qualified helpers within hours. Compare prices, delivery times, ratings, and cover messages to find the best match.',
    icon: 'ri-search-eye-line',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    image: 'https://readdy.ai/api/search-image?query=person%20reviewing%20multiple%20offer%20cards%20on%20screen%20comparing%20prices%20ratings%20profiles%20clean%20dashboard%20interface%20white%20background%20professional&width=480&height=300&seq=hiw-seeker-03&orientation=landscape',
  },
  {
    step: '04',
    title: 'Accept & Pay Securely',
    description: 'Accept the best offer and fund the task from your wallet. Your payment is held securely in escrow until you approve the delivered work.',
    icon: 'ri-shield-check-line',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    image: 'https://readdy.ai/api/search-image?query=secure%20payment%20escrow%20concept%20with%20shield%20lock%20icon%20digital%20wallet%20transaction%20clean%20minimal%20white%20background%20professional%20illustration&width=480&height=300&seq=hiw-seeker-04&orientation=landscape',
  },
  {
    step: '05',
    title: 'Collaborate & Communicate',
    description: 'Chat directly with your helper through our built-in messaging system. Share files, give feedback, and track progress in real time.',
    icon: 'ri-message-3-line',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
    image: 'https://readdy.ai/api/search-image?query=two%20people%20collaborating%20via%20chat%20messaging%20interface%20on%20laptop%20screens%20clean%20modern%20communication%20platform%20white%20background%20professional&width=480&height=300&seq=hiw-seeker-05&orientation=landscape',
  },
  {
    step: '06',
    title: 'Approve & Leave a Review',
    description: 'Review the delivered work, request revisions if needed, then approve and release payment. Leave a review to help the community.',
    icon: 'ri-star-line',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    image: 'https://readdy.ai/api/search-image?query=person%20giving%205%20star%20review%20rating%20on%20laptop%20screen%20satisfaction%20approval%20completed%20task%20clean%20minimal%20interface%20white%20background&width=480&height=300&seq=hiw-seeker-06&orientation=landscape',
  },
];

const helperSteps = [
  {
    step: '01',
    title: 'Build Your Profile',
    description: 'Create a compelling profile showcasing your skills, portfolio, and experience. Add your hourly rate and get verified to stand out.',
    icon: 'ri-user-star-line',
    color: 'text-sky-600',
    bg: 'bg-sky-50',
  },
  {
    step: '02',
    title: 'Browse Open Tasks',
    description: 'Explore hundreds of tasks posted daily. Filter by category, budget, and deadline to find tasks that match your expertise.',
    icon: 'ri-search-2-line',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    step: '03',
    title: 'Submit Your Offer',
    description: 'Write a personalized cover message, set your price, and specify your delivery timeline. A strong offer wins more tasks.',
    icon: 'ri-send-plane-line',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    step: '04',
    title: 'Deliver Great Work',
    description: 'Once your offer is accepted, get to work! Communicate with the seeker, deliver on time, and exceed expectations.',
    icon: 'ri-rocket-line',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    step: '05',
    title: 'Get Paid & Earn Points',
    description: 'Receive payment directly to your wallet after approval. Earn points and badges for every completed task to boost your ranking.',
    icon: 'ri-trophy-line',
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
];

const faqs = [
  {
    q: 'How does the escrow payment system work?',
    a: 'When a seeker accepts your offer, they fund the task from their wallet. The money is held securely in escrow by Wasla. Once the seeker approves the delivered work, the payment is released to your wallet instantly.',
  },
  {
    q: 'What is the platform fee?',
    a: 'Wasla charges a 5% platform fee on each completed task. This fee is deducted from the helper\'s earnings. There are no fees for seekers to post tasks or browse helpers.',
  },
  {
    q: 'How do I get verified?',
    a: 'Verification is available for helpers who want to build more trust. Submit your national ID or passport through your profile settings. Verification is reviewed within 24-48 hours.',
  },
  {
    q: 'What happens if I\'m not satisfied with the work?',
    a: 'You can request revisions from the helper before approving the work. If you can\'t reach an agreement, you can open a dispute and our team will mediate to find a fair resolution.',
  },
  {
    q: 'Can I cancel a task after accepting an offer?',
    a: 'Yes, but cancellation policies depend on the task stage. If work hasn\'t started, you\'ll receive a full refund. If work is in progress, a partial refund may apply based on the work completed.',
  },
  {
    q: 'How do points and badges work?',
    a: 'Helpers earn points for completing tasks, receiving 5-star reviews, and maintaining high response rates. Points unlock badges that appear on your profile, increasing your visibility and attracting more seekers.',
  },
];

export default function HowItWorksPage() {
  const [activeRole, setActiveRole] = useState('seeker');
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-[#1a1a2e]">Wasla</Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/how-it-works" className="text-sm font-semibold text-[#e94560]">How It Works</Link>
            <Link to="/categories" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Categories</Link>
            <Link to="/helpers" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Browse Helpers</Link>
            <Link to="/tasks" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Open Tasks</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors whitespace-nowrap">Sign In</Link>
            <Link to="/register" className="px-4 py-2 bg-[#e94560] text-white rounded-md text-sm font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">Get Started</Link>
          </div>
        </div>
      </nav>

      <div className="bg-[#1a1a2e] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">How Wasla Works</h1>
          <p className="text-white/60 text-lg mb-8">A simple, secure, and transparent process for both seekers and helpers</p>
          <div className="flex gap-1 bg-white/10 rounded-full p-1 w-fit mx-auto">
            <button
              onClick={() => setActiveRole('seeker')}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeRole === 'seeker' ? 'bg-[#e94560] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              I need work done
            </button>
            <button
              onClick={() => setActiveRole('helper')}
              className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeRole === 'helper' ? 'bg-[#e94560] text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              I want to work
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {activeRole === 'seeker' ? (
          <div className="space-y-20">
            {seekerSteps.map((step, i) => (
              <div key={step.step} className={`flex items-center gap-12 ${i % 2 === 1 ? 'flex-row-reverse' : ''}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-5xl font-black text-gray-100">{step.step}</span>
                    <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${step.bg}`}>
                      <i className={`${step.icon} text-xl ${step.color}`}></i>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a2e] mb-3">{step.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-base">{step.description}</p>
                </div>
                <div className="flex-1">
                  <div className="rounded-xl overflow-hidden border border-gray-100 h-52">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover object-top" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100"></div>
              <div className="space-y-8">
                {helperSteps.map((step) => (
                  <div key={step.step} className="flex gap-8 relative">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full ${step.bg} border-4 border-white shrink-0 z-10`}>
                      <i className={`${step.icon} text-2xl ${step.color}`}></i>
                    </div>
                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Step {step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">{step.title}</h3>
                      <p className="text-gray-500 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#f8f8fb] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#1a1a2e] mb-3">Built on Trust & Safety</h2>
            <p className="text-gray-500">Every transaction on Wasla is protected by our security layer</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'ri-shield-check-line', title: 'Escrow Protection', desc: 'Payments held securely until work is approved', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { icon: 'ri-verified-badge-line', title: 'Verified Helpers', desc: 'Identity-verified freelancers you can trust', color: 'text-sky-600', bg: 'bg-sky-50' },
              { icon: 'ri-customer-service-2-line', title: '24/7 Support', desc: 'Our team is always here to help resolve issues', color: 'text-amber-600', bg: 'bg-amber-50' },
              { icon: 'ri-refund-2-line', title: 'Dispute Resolution', desc: 'Fair mediation if something goes wrong', color: 'text-violet-600', bg: 'bg-violet-50' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl border border-gray-100 p-6 text-center">
                <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${item.bg} mx-auto mb-4`}>
                  <i className={`${item.icon} text-2xl ${item.color}`}></i>
                </div>
                <h4 className="font-semibold text-[#1a1a2e] mb-1">{item.title}</h4>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-[#1a1a2e] text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-semibold text-[#1a1a2e]">{faq.q}</span>
                <i className={`${openFaq === i ? 'ri-subtract-line' : 'ri-add-line'} text-gray-400 shrink-0 ml-4`}></i>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#1a1a2e] py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-white/60 mb-8">Join thousands of seekers and helpers on Wasla today</p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/register" className="px-8 py-3 bg-[#e94560] text-white rounded-md font-semibold hover:bg-[#c73652] transition-colors whitespace-nowrap">
              Create Free Account
            </Link>
            <Link to="/helpers" className="px-8 py-3 bg-white/10 text-white rounded-md font-semibold hover:bg-white/20 transition-colors whitespace-nowrap">
              Browse Helpers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
