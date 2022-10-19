const { productsModels } = require('../models');
const { throwError } = require('../utils/errorUtils');

const { nameSchema } = require('./validations/schemas');
const { validateProductId } = require('./validations/validateProductId');

const findAll = async () => {
  const result = await productsModels.findAll();
  return { type: null, message: result };
};

const find = async (id) => {
  const result = await productsModels.find(id);
  if (!result) { throw throwError('ID_WITHOUT_RESULTS', 'Product not found'); }
  return { message: result };
};

const insert = async (payload) => {
  nameSchema.validate(payload);
  const id = await productsModels.insert(payload);
  const response = await productsModels.find(id);
  return { message: response };
};

const deleteItem = async (id) => { 
  await validateProductId(id);
  await productsModels.deleteItem(id);
  return true;
};

const update = async (id, payload) => {
  nameSchema.validate(payload);
  await validateProductId(id);
  await productsModels.update(id, payload);
  const result = await find(id);
  return result;
};

const queryItem = async (query) => {
  const result = await productsModels.queryItem(query);
  return { message: result };
};

module.exports = {
  findAll,
  find,
  insert,
  deleteItem,
  update,
  queryItem,
};