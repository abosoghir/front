import api from './api';

const authService = {
  /**
   * POST /api/auth/login
   * @returns {{ id, email, name, phoneNumber, roles, token, expirseIn, refreshToken, refreshTokenExpiration }}
   */
  login: (email, password) =>
    api.post('/api/auth/login', { email, password }),

  /**
   * POST /api/auth/register
   * @returns {{ id, email, name }}
   */
  register: (name, email, phoneNumber, password, role) =>
    api.post('/api/auth/register', { name, email, phoneNumber, password, role }),

  /**
   * POST /api/auth/refresh-token
   * @returns {{ id, email, name, phoneNumber, roles, token, expirseIn, refreshToken, refreshTokenExpiration }}
   */
  refreshToken: (token, refreshToken) =>
    api.post('/api/auth/refresh-token', { token, refreshToken }),

  /**
   * PUT /api/auth/change-password
   */
  changePassword: (currentPassword, newPassword) =>
    api.put('/api/auth/change-password', { currentPassword, newPassword }),

  /**
   * POST /api/auth/revoke-refresh-token  (logout)
   */
  logout: (refreshToken) =>
    api.post('/api/auth/revoke-refresh-token', { refreshToken }),
};

export default authService;
