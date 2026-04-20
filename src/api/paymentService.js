import api from './api';

const paymentService = {
  /**
   * POST /api/payments
   */
  createPayment: (data) =>
    api.post('/api/payments', data),

  /**
   * PUT /api/payments/{id}/confirm
   */
  confirmPayment: (id, data) =>
    api.put(`/api/payments/${id}/confirm`, data),
};

export default paymentService;
