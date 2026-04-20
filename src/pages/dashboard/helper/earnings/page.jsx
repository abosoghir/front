import { useState } from 'react';
import HelperLayout from '@/pages/dashboard/helper/components/HelperLayout';
import { earningsHistory } from '@/mocks/helperDashboard';
import { paymentMethods } from '@/mocks/wallet';

function WithdrawModal({ onClose, balance }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('VodafoneCash');
  const [step, setStep] = useState('form');
  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance) return;
    setStep('success');
  };
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1a1a2e]">Withdraw Funds</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        {step === 'success' ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
              <i className="ri-check-double-line text-3xl text-emerald-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Withdrawal Requested!</h4>
            <p className="text-sm text-gray-500 mb-1">Your withdrawal of <span className="font-bold text-[#1a1a2e]">${amount}</span> is being processed.</p>
            <p className="text-xs text-gray-400 mb-6">Funds will be transferred within 2-3 business days.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
              <span className="text-xs text-gray-500">Available Balance</span>
              <span className="text-sm font-bold text-[#1a1a2e]">${balance.toFixed(2)}</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  max={balance}
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-3 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
                />
              </div>
              <button onClick={() => setAmount(String(balance))} className="text-xs text-[#e94560] font-semibold mt-1.5 cursor-pointer">
                Withdraw all
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Withdraw To</label>
              <div className="space-y-2">
                {paymentMethods.map((pm) => (
                  <button
                    key={pm.key}
                    onClick={() => setMethod(pm.key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${method === pm.key ? 'border-[#e94560] bg-[#e94560]/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <div className={`w-9 h-9 flex items-center justify-center rounded-lg ${pm.bg}`}>
                      <i className={`${pm.icon} text-base ${pm.color}`}></i>
                    </div>
                    <span className="text-sm font-medium text-[#1a1a2e]">{pm.label}</span>
                    {method === pm.key && (
                      <div className="ml-auto w-5 h-5 flex items-center justify-center bg-[#e94560] rounded-full">
                        <i className="ri-check-line text-white text-xs"></i>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
            {amount && parseFloat(amount) > balance && (
              <p className="text-xs text-rose-500 font-medium">Amount exceeds your available balance.</p>
            )}
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) <= 0 || parseFloat(amount) > balance}
              className="w-full py-3 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Withdraw ${amount || '0.00'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
const periods = [
  { key: 'all', label: 'All Time' },
  { key: 'month', label: 'This Month' },
  { key: 'quarter', label: 'This Quarter' },
];
const typeColors = {
  Task: { color: 'text-sky-600', bg: 'bg-sky-50' },
  Project: { color: 'text-violet-600', bg: 'bg-violet-50' },
  Session: { color: 'text-emerald-600', bg: 'bg-emerald-50' },
};
export default function EarningsPage() {
  const [period, setPeriod] = useState('all');
  const [showWithdraw, setShowWithdraw] = useState(false);
  const filtered = earningsHistory.filter((e) => {
    if (period === 'month') return e.date >= '2026-04-01';
    if (period === 'quarter') return e.date >= '2026-01-01';
    return true;
  });
  const totalGross = filtered.reduce((s, e) => s + e.amount, 0);
  const totalFees = filtered.reduce((s, e) => s + e.platformFee, 0);
  const totalNet = filtered.reduce((s, e) => s + e.netAmount, 0);
  return (
    <HelperLayout title="Earnings" subtitle="Track your income and payment history">
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 w-fit">
          {periods.map((p) => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${period === p.key ? 'bg-white text-[#1a1a2e]' : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-9 h-9 flex items-center justify-center bg-emerald-50 rounded-lg mb-3">
              <i className="ri-money-dollar-circle-line text-lg text-emerald-500"></i>
            </div>
            <div className="text-2xl font-bold text-[#1a1a2e]">${totalNet.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Net Earnings</div>
            <div className="text-xs text-emerald-500 font-medium mt-1">After platform fees</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-9 h-9 flex items-center justify-center bg-sky-50 rounded-lg mb-3">
              <i className="ri-bar-chart-line text-lg text-sky-500"></i>
            </div>
            <div className="text-2xl font-bold text-[#1a1a2e]">${totalGross.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Gross Earnings</div>
            <div className="text-xs text-gray-400 font-medium mt-1">Before fees</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-9 h-9 flex items-center justify-center bg-rose-50 rounded-lg mb-3">
              <i className="ri-percent-line text-lg text-rose-500"></i>
            </div>
            <div className="text-2xl font-bold text-[#1a1a2e]">${totalFees.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Platform Fees (5%)</div>
            <div className="text-xs text-gray-400 font-medium mt-1">{filtered.length} transactions</div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-[#1a1a2e]">Transaction History</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {filtered.map((entry) => {
              const tc = typeColors[entry.type];
              return (
                <div key={entry.id} className="px-5 py-4 flex items-center gap-4">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${tc.bg}`}>
                    <i className={`ri-money-dollar-circle-line text-base ${tc.color}`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1a1a2e] truncate">{entry.taskTitle}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${tc.bg} ${tc.color}`}>{entry.type}</span>
                      <span className="text-xs text-gray-400">{entry.category}</span>
                      <span className="text-xs text-gray-300">•</span>
                      <span className="text-xs text-gray-400">{entry.date}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-sm font-bold text-emerald-600">+${entry.netAmount}</div>
                    <div className="text-xs text-gray-400">-${entry.platformFee} fee</div>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400 text-sm">No transactions in this period</div>
          )}
        </div>
        <div className="bg-[#1a1a2e] rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-white text-sm font-bold mb-1">Ready to Withdraw?</h3>
            <p className="text-white/50 text-xs">Your available balance is <span className="text-white font-bold">${totalNet.toFixed(2)}</span>. Withdrawals are processed within 2-3 business days.</p>
          </div>
          <button onClick={() => setShowWithdraw(true)} className="flex items-center gap-2 px-5 py-2.5 bg-[#e94560] text-white text-sm font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer whitespace-nowrap">
            <div className="w-4 h-4 flex items-center justify-center">
              <i className="ri-bank-card-line text-sm"></i>
            </div>
            Withdraw Funds
          </button>
        </div>
      </div>
      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} balance={totalNet} />}
    </HelperLayout>
  );
}
