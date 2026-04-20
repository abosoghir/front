import api from './api';

const helperService = {
  /**
   * GET /api/helpers
   * @param {Object} params - { search, category, minRating, minPrice, maxPrice, availableOnly, verifiedOnly, sortBy, pageNumber, pageSize }
   */
  getHelpers: (params = {}) =>
    api.get('/api/helpers', { params }),

  /**
   * GET /api/helpers/all  (JWT required)
   */
  getAllHelpersDetailed: () =>
    api.get('/api/helpers/all'),

  /**
   * GET /api/helpers/{id}
   */
  getHelperById: (id) =>
    api.get(`/api/helpers/${id}`),

  /**
   * GET /api/helpers/recommend?query={query}
   */
  recommendHelpers: (query) =>
    api.get('/api/helpers/recommend', { params: { query } }),

  /**
   * GET /api/helper-projects/helper/{helperId}
   */
  getHelperProjects: (helperId) =>
    api.get(`/api/helper-projects/helper/${helperId}`),

  /**
   * GET /api/helper-services/helper/{helperId}
   */
  getHelperServices: (helperId) =>
    api.get(`/api/helper-services/helper/${helperId}`),
};

export default helperService;
