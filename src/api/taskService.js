import api from './api';

const taskService = {
  /**
   * GET /api/tasks
   * @param {Object} params - { category, status, pageNumber, pageSize }
   */
  getTasks: (params = {}) =>
    api.get('/api/tasks', { params }),

  /**
   * GET /api/tasks/my  (JWT + Seeker)
   * @param {Object} params - { status, pageNumber, pageSize }
   */
  getMyTasks: (params = {}) =>
    api.get('/api/tasks/my', { params }),

  /**
   * GET /api/tasks/{id}
   */
  getTaskById: (id) =>
    api.get(`/api/tasks/${id}`),

  /**
   * POST /api/tasks  (JWT + Seeker)
   * @returns {{ id }}
   */
  createTask: (data) =>
    api.post('/api/tasks', data),

  /**
   * PUT /api/tasks/{id}  (JWT + Seeker)
   */
  updateTask: (id, data) =>
    api.put(`/api/tasks/${id}`, { id, ...data }),

  /**
   * DELETE /api/tasks/{id}  (JWT + Seeker)
   */
  deleteTask: (id) =>
    api.delete(`/api/tasks/${id}`),

  /**
   * PUT /api/tasks/{id}/complete  (JWT + Seeker)
   */
  completeTask: (id) =>
    api.put(`/api/tasks/${id}/complete`),
};

export default taskService;
