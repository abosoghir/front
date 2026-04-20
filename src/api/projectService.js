import api from './api';

const projectService = {
  /**
   * GET /api/projects
   * @param {Object} params - { category, status, pageNumber, pageSize }
   */
  getProjects: (params = {}) =>
    api.get('/api/projects', { params }),
};

export default projectService;
