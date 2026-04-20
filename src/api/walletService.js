import api from './api';

const walletService = {
  /**
   * GET /api/wallet
   */
  getWallet: () =>
    api.get('/api/wallet'),

  /**
   * GET /api/wallet/transactions
   * @param {Object} params - { pageNumber, pageSize }
   */
  getTransactions: (params = {}) =>
    api.get('/api/wallet/transactions', { params }),

  /**
   * POST /api/wallet/withdraw
   */
  withdraw: (data) =>
    api.post('/api/wallet/withdraw', data),

  /**
   * POST /api/wallet/deposit
   */
  deposit: (data) =>
    api.post('/api/wallet/deposit', data),
};

export default walletService;
