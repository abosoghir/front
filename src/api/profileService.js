import api from './api';

const profileService = {
  /**
   * GET /api/profile/me
   */
  getMyProfile: () =>
    api.get('/api/profile/me'),

  /**
   * PUT /api/profile/me
   */
  updateMyProfile: (data) =>
    api.put('/api/profile/me', data),

  /**
   * GET /api/users/{userId}/profile
   */
  getUserProfile: (userId) =>
    api.get(`/api/users/${userId}/profile`),
};

export default profileService;
