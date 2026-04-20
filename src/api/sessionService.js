import api from './api';

const sessionService = {
  /**
   * GET /api/sessions
   * @param {Object} params - { status, pageNumber, pageSize }
   */
  getMySessions: (params = {}) =>
    api.get('/api/sessions', { params }),

  /**
   * POST /api/sessions  (JWT + Seeker)
   * @returns {{ id }}
   */
  createSession: (data) =>
    api.post('/api/sessions', data),

  /**
   * PUT /api/sessions/{id}/confirm  (JWT + Helper)
   */
  confirmSession: (id, meetingLink) =>
    api.put(`/api/sessions/${id}/confirm`, { id, meetingLink }),

  /**
   * PUT /api/sessions/{id}/complete
   */
  completeSession: (id) =>
    api.put(`/api/sessions/${id}/complete`),

  /**
   * PUT /api/sessions/{id}/cancel
   */
  cancelSession: (id) =>
    api.put(`/api/sessions/${id}/cancel`),
};

export default sessionService;
