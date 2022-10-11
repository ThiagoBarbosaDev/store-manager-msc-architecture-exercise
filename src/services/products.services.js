const { productsModels } = require('../models');

const findAll = async () => {
  const result = await productsModels.findAll();
  return { type: null, message: result };
};

const find = async (id) => {
  const result = await productsModels.find(id);
  if (!result) { return { type: 'ID_WITHOUT_RESULTS', message: 'Product not found' }; }
  return { type: null, message: result };
};

module.exports = {
  findAll,
  find,
};