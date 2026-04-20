import api from './api';

const notificationService = {
  /**
   * GET /api/notifications
   * @param {Object} params - { unreadOnly, pageNumber, pageSize }
   */
  getNotifications: (params = {}) =>
    api.get('/api/notifications', { params }),

  /**
   * PUT /api/notifications/{id}/read
   */
  markAsRead: (id) =>
    api.put(`/api/notifications/${id}/read`),

  /**
   * PUT /api/notifications/read-all
   */
  markAllAsRead: () =>
    api.put('/api/notifications/read-all'),
};

export default notificationService;
