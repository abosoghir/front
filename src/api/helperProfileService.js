import api from './api';

const helperProfileService = {
  // ── Services ─────────────────────────────────────────────
  /**
   * POST /api/helper-services  (JWT + Helper)
   * @returns {{ id }}
   */
  createService: (data) =>
    api.post('/api/helper-services', data),

  /**
   * PUT /api/helper-services/{id}  (JWT + Helper)
   */
  updateService: (id, data) =>
    api.put(`/api/helper-services/${id}`, { id, ...data }),

  /**
   * DELETE /api/helper-services/{id}  (JWT + Helper)
   */
  deleteService: (id) =>
    api.delete(`/api/helper-services/${id}`),

  // ── Portfolio Projects ───────────────────────────────────
  /**
   * POST /api/helper-projects  (JWT + Helper)
   * @returns {{ id }}
   */
  createProject: (data) =>
    api.post('/api/helper-projects', data),

  /**
   * PUT /api/helper-projects/{id}  (JWT + Helper)
   */
  updateProject: (id, data) =>
    api.put(`/api/helper-projects/${id}`, { id, ...data }),

  /**
   * DELETE /api/helper-projects/{id}  (JWT + Helper)
   */
  deleteProject: (id) =>
    api.delete(`/api/helper-projects/${id}`),

  // ── Skills ───────────────────────────────────────────────
  /**
   * POST /api/helper-skills  (JWT + Helper)
   * @returns {{ id, skillName }}
   */
  addSkill: (skillName) =>
    api.post('/api/helper-skills', { skillName }),

  /**
   * DELETE /api/helper-skills/{id}  (JWT + Helper)
   */
  removeSkill: (id) =>
    api.delete(`/api/helper-skills/${id}`),
};

export default helperProfileService;
