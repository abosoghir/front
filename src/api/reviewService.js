import api from './api';

const reviewService = {
  /**
   * POST /api/reviews
   * @returns {{ id }}
   */
  createReview: (data) =>
    api.post('/api/reviews', data),

  /**
   * GET /api/reviews/user/{userId}
   */
  getUserReviews: (userId, params = {}) =>
    api.get(`/api/reviews/user/${userId}`, { params }),
};

export default reviewService;
