import api from './api';

const categoryService = {
  /**
   * GET /api/categories
   * @returns {{ taskCategories: [{id, name}], serviceCategories: [{id, name}] }}
   */
  getCategories: () =>
    api.get('/api/categories'),
};

export default categoryService;
