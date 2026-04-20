import { useState } from 'react';

const reportTypes = [
  { key: 'User', label: 'User', icon: 'ri-user-line' },
  { key: 'Task', label: 'Task', icon: 'ri-task-line' },
  { key: 'Project', label: 'Project', icon: 'ri-folder-line' },
  { key: 'Message', label: 'Message', icon: 'ri-message-3-line' },
  { key: 'Review', label: 'Review', icon: 'ri-star-line' },
  { key: 'Payment', label: 'Payment', icon: 'ri-money-dollar-circle-line' },
  { key: 'Other', label: 'Other', icon: 'ri-more-line' },
];

const severityOptions = [
  { key: 'Low', label: 'Low', color: 'text-gray-500', bg: 'bg-gray-100' },
  { key: 'Medium', label: 'Medium', color: 'text-amber-600', bg: 'bg-amber-50' },
  { key: 'High', label: 'High', color: 'text-orange-600', bg: 'bg-orange-50' },
  { key: 'Critical', label: 'Critical', color: 'text-rose-600', bg: 'bg-rose-50' },
];

export default function ReportModal({ isOpen, onClose, targetType, targetId, targetName }) {
  const [type, setType] = useState(targetType || 'User');
  const [severity, setSeverity] = useState('Medium');
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState('');
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [step, setStep] = useState('form');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) return;
    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setReason('');
    setDetails('');
    setEvidenceUrl('');
    setSeverity('Medium');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl">
          <div>
            <h3 className="text-base font-bold text-[#1a1a2e]">Submit a Report</h3>
            {targetName && <p className="text-xs text-gray-400 mt-0.5">Reporting: {targetName}</p>}
          </div>
          <button onClick={handleClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {step === 'success' ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
              <i className="ri-shield-check-line text-3xl text-emerald-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Report Submitted</h4>
            <p className="text-sm text-gray-500 mb-6">Thank you for helping keep Wasla safe. Our team will review your report within 24-48 hours.</p>
            <button onClick={handleClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Report Type</label>
              <div className="flex flex-wrap gap-2">
                {reportTypes.map((rt) => (
                  <button
                    key={rt.key}
                    onClick={() => setType(rt.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                      type === rt.key ? 'border-[#e94560] bg-[#e94560]/5 text-[#e94560]' : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${rt.icon} text-xs`}></i>
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Severity</label>
              <div className="flex gap-2">
                {severityOptions.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setSeverity(s.key)}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer border text-center ${
                      severity === s.key ? `border-[#e94560] ${s.bg} ${s.color}` : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Reason *</label>
              <input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Brief description of the issue..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Additional Details</label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                rows={3}
                placeholder="Provide any additional context or details..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-[#e94560] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Evidence URL (optional)</label>
              <input
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={!reason.trim()}
              className="w-full py-3 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i className="ri-shield-check-line"></i>
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
