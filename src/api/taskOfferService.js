import api from './api';

const taskOfferService = {
  /**
   * POST /api/task-offers  (JWT + Helper)
   * @returns {{ id }}
   */
  createOffer: (data) =>
    api.post('/api/task-offers', data),

  /**
   * PUT /api/task-offers/{id}/accept  (JWT + Seeker)
   */
  acceptOffer: (id) =>
    api.put(`/api/task-offers/${id}/accept`),

  /**
   * PUT /api/task-offers/{id}/reject  (JWT + Seeker)
   */
  rejectOffer: (id) =>
    api.put(`/api/task-offers/${id}/reject`),

  /**
   * GET /api/task-offers/my  (JWT + Helper)
   */
  getMyOffers: (params = {}) =>
    api.get('/api/task-offers/my', { params }),
};

export default taskOfferService;
