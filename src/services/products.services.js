const { productsModels } = require('../models');
const { nameValidation } = require('./validations/nameValidation');
const { doesProductIdExist } = require('./validations/validateDoesProductIdExist');

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

  if (error.type) {
    return error;
  }

  const id = await productsModels.insert(payload);
  const response = await productsModels.find(id);
  return { type: null, message: response };
};

const update = async (id, payload) => {
  const { message, type } = nameValidation(payload);
  const doesIdExist = await doesProductIdExist(id);
  if (!doesIdExist) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
  if (type) { return { message, type }; }
  const affectedRows = await productsModels.update(id, payload);
  const result = await find(id);
  if (affectedRows) { return result; }
};

module.exports = {
  findAll,
  find,
  insert,
  update,
};