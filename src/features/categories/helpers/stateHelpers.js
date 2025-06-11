// helpers/stateHelpers.js

/**
 * Genera un preloadedState para el slice de categories
 * @param {Array} categories - Arreglo de categorías (cada una debe tener id)
 * @param {string} status - Estado general del slice (ej: 'idle', 'loading', 'succeeded')
 * @returns {object} preloadedState listo para pasar a renderWithProviders
 */

export const createPreloadedCategoryState = (
  categories = [],
  status = 'succeeded'
) => {
  const entities = {};
  const ids = [];

  categories.forEach((cat) => {
    entities[cat.id] = cat;
    ids.push(cat.id);
  });

  return {
    categories: {
      entities,
      ids,
      status,
      deleteStatus: 'idle',
      error: null
    }
  };
};
