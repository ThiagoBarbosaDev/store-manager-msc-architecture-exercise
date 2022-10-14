const { productsModels } = require('../models');
const { nameValidation } = require('./validations/nameValidation');

const findAll = async () => {
  const result = await productsModels.findAll();
  return { type: null, message: result };
};

const find = async (id) => {
  const result = await productsModels.find(id);
  if (!result) { return { type: 'ID_WITHOUT_RESULTS', message: 'Product not found' }; }
  return { type: null, message: result };
};

const insert = async (payload) => {
  const error = nameValidation(payload);
  console.log(error.type);
  if (error.type) {
    return error;
  }

  const id = await productsModels.insert(payload);
  const response = await productsModels.find(id);
  return { type: null, message: response };
};

module.exports = {
  findAll,
  find,
  insert,
};