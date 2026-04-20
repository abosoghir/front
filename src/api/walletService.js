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
};

export default walletService;
