import { useState } from 'react';
import SeekerLayout from '../components/SeekerLayout';
import { mockWallet, walletTransactions, transactionTypeConfig, paymentMethods } from '@/mocks/wallet';

function DepositModal({ onClose }) {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('VodafoneCash');
  const [step, setStep] = useState('form');
  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('success');
  };
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg">
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-[#1a1a2e]">Add Funds</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        {step === 'success' ? (
          <div className="px-6 py-10 text-center">
            <div className="w-16 h-16 flex items-center justify-center bg-emerald-50 rounded-full mx-auto mb-4">
              <i className="ri-check-double-line text-3xl text-emerald-500"></i>
            </div>
            <h4 className="text-lg font-bold text-[#1a1a2e] mb-2">Deposit Initiated!</h4>
            <p className="text-sm text-gray-500 mb-1">Your deposit of <span className="font-bold text-[#1a1a2e]">${amount}</span> is being processed.</p>
            <p className="text-xs text-gray-400 mb-6">Funds will appear in your wallet within a few minutes.</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-[#1a1a2e] text-white text-sm font-semibold rounded-lg hover:bg-[#2a2a4e] transition-colors cursor-pointer">
              Done
            </button>
          </div>
        ) : (
          <div className="px-6 py-5 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Amount (USD)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-semibold">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full border border-gray-200 rounded-lg pl-7 pr-3 py-3 text-sm focus:outline-none focus:border-[#e94560] transition-colors"
                />
              </div>
              <div className="flex gap-2 mt-2">
                {[50, 100, 250, 500].map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(String(v))}
                    className="flex-1 py-1.5 text-xs font-semibold border border-gray-200 rounded-md hover:border-[#e94560] hover:text-[#e94560] transition-colors cursor-pointer"
                  >
                    ${v}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Payment Method</label>
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
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="w-full py-3 bg-[#e94560] text-white text-sm font-semibold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Deposit ${amount || '0.00'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

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
              <button
                onClick={() => setAmount(String(balance))}
                className="text-xs text-[#e94560] font-semibold mt-1.5 cursor-pointer"
              >
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

export default function SeekerWalletPage() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const wallet = mockWallet;
  const transactions = walletTransactions;

  return (
    <SeekerLayout title="Wallet" subtitle="Manage your funds and transactions">
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1a1a2e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-white/60 text-xs font-medium">Available Balance</span>
              <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
                <i className="ri-wallet-3-line text-white/60 text-sm"></i>
              </div>
            </div>
            <div className="text-3xl font-black text-white mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>
              ${wallet.balance.toFixed(2)}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeposit(true)}
                className="flex-1 py-2 bg-[#e94560] text-white text-xs font-bold rounded-lg hover:bg-[#c73652] transition-colors cursor-pointer"
              >
                Deposit
              </button>
              <button
                onClick={() => setShowWithdraw(true)}
                className="flex-1 py-2 bg-white/10 text-white text-xs font-bold rounded-lg hover:bg-white/20 transition-colors cursor-pointer"
              >
                Withdraw
              </button>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-9 h-9 flex items-center justify-center bg-emerald-50 rounded-lg mb-3">
              <i className="ri-add-circle-line text-lg text-emerald-500"></i>
            </div>
            <div className="text-2xl font-bold text-[#1a1a2e]">${wallet.totalDeposited.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Total Deposited</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="w-9 h-9 flex items-center justify-center bg-amber-50 rounded-lg mb-3">
              <i className="ri-download-line text-lg text-amber-500"></i>
            </div>
            <div className="text-2xl font-bold text-[#1a1a2e]">${wallet.totalWithdrawn.toFixed(2)}</div>
            <div className="text-xs text-gray-400 mt-0.5">Total Withdrawn</div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#1a1a2e]">Transaction History</h3>
            <span className="text-xs text-gray-400">{transactions.length} transactions</span>
          </div>
          <div className="divide-y divide-gray-50">
            {transactions.map((tx) => {
              const cfg = transactionTypeConfig[tx.type] || transactionTypeConfig.Payment;
              const isPositive = tx.amount > 0;
              return (
                <div key={tx.id} className="px-5 py-4 flex items-center gap-4">
                  <div className={`w-9 h-9 flex items-center justify-center rounded-lg shrink-0 ${cfg.bg}`}>
                    <i className={`${cfg.icon} text-base ${cfg.color}`}></i>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#1a1a2e] truncate">{tx.description}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                      <span className="text-xs text-gray-400">{new Date(tx.createdOn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                      {tx.status === 'Pending' && (
                        <span className="text-xs font-semibold px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-600">Pending</span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-[#1a1a2e]'}`}>
                      {isPositive ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </div>
                    {tx.balanceAfter !== null && (
                      <div className="text-xs text-gray-400">Bal: ${tx.balanceAfter.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showDeposit && <DepositModal onClose={() => setShowDeposit(false)} />}
      {showWithdraw && <WithdrawModal onClose={() => setShowWithdraw(false)} balance={wallet.balance} />}
    </SeekerLayout>
  );
}
