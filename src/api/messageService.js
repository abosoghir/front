import api from './api';

const messageService = {
  /**
   * GET /api/messages/conversations
   */
  getConversations: () =>
    api.get('/api/messages/conversations'),

  /**
   * GET /api/messages/chat/{otherUserId}
   * @param {Object} params - { pageNumber, pageSize }
   */
  getChatHistory: (otherUserId, params = {}) =>
    api.get(`/api/messages/chat/${otherUserId}`, { params }),

  /**
   * POST /api/messages
   * @returns {{ id }}
   */
  sendMessage: (data) =>
    api.post('/api/messages', data),

  /**
   * PUT /api/messages/read
   */
  markAsRead: (senderId, messageIds) =>
    api.put('/api/messages/read', { senderId, messageIds }),
};

export default messageService;
