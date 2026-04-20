import { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiFeatures, mockAIUsageHistory, aiStatusConfig, mockUserPoints } from '@/mocks/ai';

function FeatureModal({ feature, onClose, points }) {
  const [input, setInput] = useState('');
  const [step, setStep] = useState('input');
  const [result, setResult] = useState('');
  const canUse = feature.isFree || points >= feature.pointsCost;

  const handleSubmit = () => {
    if (!input.trim()) return;
    if (!canUse) {
      setStep('error');
      return;
    }
    setStep('processing');
    setTimeout(() => {
      setResult(
        feature.key === 'ChatAssistant'
          ? 'Based on your query, I recommend checking the "Browse Helpers" section to find specialists in React and Node.js. You can filter by rating and hourly rate to find the best match for your project budget.'
          : feature.key === 'CVImprovement'
            ? '✅ 3 improvements found:\n1. Add quantifiable achievements (e.g., "Increased conversion by 25%")\n2. Use stronger action verbs in your experience section\n3. Add a "Key Skills" summary section at the top'
            : feature.key === 'FileSummarization'
              ? '📄 Summary (3 key points):\n1. The project requires a full-stack e-commerce platform with payment integration\n2. Timeline is 8 weeks with 4 milestone deliverables\n3. Budget allocated: $4,500 with 5% platform fee'
              : feature.key === 'ProfileEnhancement'
                ? '🌟 Profile Optimization:\n• Headline: "Expert Full-Stack Developer | React, Node.js & Cloud Architecture"\n• Bio: Add client testimonials and project outcomes\n• Skills: Reorder to prioritize high-demand technologies'
                : '📝 Generated Proposal:\n\nDear [Client],\n\nI\'m excited to apply for this project. With 5+ years of experience in React and modern web development, I can deliver a high-quality solution within your timeline.\n\nKey deliverables:\n- Responsive UI with modern design\n- RESTful API integration\n- Comprehensive testing\n\nLooking forward to collaborating!'
      );
      setStep('result');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white`}>
              <i className={`${feature.icon} text-lg`}></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1a1a2e]">{feature.name}</h3>
              <p className="text-xs text-gray-400">{feature.isFree ? 'Free' : `${feature.pointsCost} points`}</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {step === 'input' && (
          <div className="px-6 py-5 space-y-4">
            {!canUse && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                <i className="ri-coins-line text-amber-500 mt-0.5"></i>
                <div>
                  <p className="text-sm font-semibold text-amber-800">Not enough points</p>
                  <p className="text-xs text-amber-700">You need {feature.pointsCost} points but only have {points}.</p>
                </div>
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                {feature.key === 'ChatAssistant' ? 'Ask anything...' :
                  feature.key === 'CVImprovement' ? 'Paste your CV content' :
                    feature.key === 'FileSummarization' ? 'Paste document content or describe the file' :
                      feature.key === 'ProfileEnhancement' ? 'Paste your current profile bio & headline' :
                        'Describe the task/project you want to apply for'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                rows={6}
                placeholder="Enter your content here..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#e94560] transition-colors"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!input.trim() || !canUse}
              className="w-full py-3 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i className="ri-sparkling-2-line"></i>
              {feature.isFree ? 'Generate' : `Use ${feature.pointsCost} Points`}
            </button>
          </div>
        )}

        {step === 'processing' && (
          <div className="px-6 py-16 text-center">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <div className="w-10 h-10 border-3 border-[#e94560] border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-sm font-semibold text-[#1a1a2e]">Processing with AI...</p>
            <p className="text-xs text-gray-400 mt-1">This usually takes a few seconds</p>
          </div>
        )}

        {step === 'result' && (
          <div className="px-6 py-5 space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <i className="ri-sparkling-2-line text-[#e94560]"></i>
                <span className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wide">AI Result</span>
              </div>
              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">{result}</pre>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigator.clipboard?.writeText(result)}
                className="flex-1 py-2.5 border border-gray-200 text-sm font-semibold text-gray-600 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-file-copy-line text-sm"></i>
                Copy
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {step === 'error' && (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-amber-50 rounded-full mx-auto mb-4">
              <i className="ri-coins-line text-3xl text-amber-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Insufficient Points</h4>
            <p className="text-sm text-gray-500 mb-6">
              You need <span className="font-bold">{feature.pointsCost}</span> points but only have <span className="font-bold">{points}</span>.
              Complete more tasks to earn points!
            </p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AIToolsPage() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8f8fb]">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tight shrink-0">
            <span className="text-[#1a1a2e]">Wasla</span>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link to="/helpers" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Browse Helpers</Link>
            <Link to="/tasks" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Open Tasks</Link>
            <Link to="/ai" className="text-sm font-semibold text-[#e94560]">AI Tools</Link>
            <Link to="/projects" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors">Projects</Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full">
              <i className="ri-coins-line text-amber-500 text-sm"></i>
              <span className="text-sm font-bold text-amber-700">{mockUserPoints} pts</span>
            </div>
            <Link to="/login" className="text-sm text-gray-600 hover:text-[#e94560] transition-colors whitespace-nowrap">Sign In</Link>
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#2a2a4e] to-[#1a1a2e] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 flex items-center justify-center bg-[#e94560]/20 rounded-xl">
              <i className="ri-sparkling-2-line text-xl text-[#e94560]"></i>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">AI-Powered Tools</h1>
          <p className="text-white/60 max-w-lg mx-auto">Supercharge your workflow with intelligent assistants. Use points to access premium features or chat for free.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {aiFeatures.map((feature) => (
            <div key={feature.key} className="bg-white rounded-xl border border-gray-100 p-6 hover:border-gray-200 transition-all group">
              <div className={`w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4`}>
                <i className={`${feature.icon} text-xl`}></i>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-base font-bold text-[#1a1a2e]">{feature.name}</h3>
                {feature.isFree ? (
                  <span className="text-xs font-bold px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded-full">FREE</span>
                ) : (
                  <span className="text-xs font-bold px-2 py-0.5 bg-amber-50 text-amber-600 rounded-full">{feature.pointsCost} pts</span>
                )}
              </div>
              <p className="text-sm text-gray-500 mb-4 line-clamp-2">{feature.description}</p>
              <button
                onClick={() => setSelectedFeature(feature)}
                className="w-full py-2.5 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="ri-sparkling-2-line text-sm"></i>
                {feature.isFree ? 'Start Chat' : 'Use Feature'}
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <h3 className="text-sm font-bold text-[#1a1a2e]">Usage History</h3>
            <i className={`${showHistory ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'} text-gray-400`}></i>
          </button>
          {showHistory && (
            <div className="border-t border-gray-100 divide-y divide-gray-50">
              {mockAIUsageHistory.map((usage) => {
                const cfg = aiStatusConfig[usage.status];
                return (
                  <div key={usage.id} className="px-5 py-4 flex items-center gap-4">
                    <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${cfg.bg}`}>
                      <i className={`${cfg.icon} text-base ${cfg.color}`}></i>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#1a1a2e]">{usage.featureName}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                        <span className="text-xs text-gray-400">{new Date(usage.usedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      {usage.errorMessage && (
                        <p className="text-xs text-rose-500 mt-1">{usage.errorMessage}</p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      {usage.pointsCost > 0 ? (
                        <span className="text-sm font-bold text-amber-600">-{usage.pointsCost} pts</span>
                      ) : (
                        <span className="text-xs font-semibold text-emerald-600">Free</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {selectedFeature && (
        <FeatureModal
          feature={selectedFeature}
          onClose={() => setSelectedFeature(null)}
          points={mockUserPoints}
        />
      )}
    </div>
  );
}
