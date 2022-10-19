const salesModels = require('../models/sales.models');
const { throwError } = require('../utils/errorUtils');

const { insertSaleProductsSchema } = require('./validations/schemas');
const { validateProductIdArray } = require('./validations/validateProductId');

const { validateSaleId } = require('./validations/validateSaleId');

const findAll = async () => {
  const result = await salesModels.findAll();
  return { message: result };
};

const find = async (id) => {
  const result = await salesModels.find(id);
  const doesSaleIdNotExist = !result.length;
  if (doesSaleIdNotExist) { throw throwError('ID_WITHOUT_RESULTS', 'Sale not found'); }
  return { message: result };
};

const handleSaleProducts = (payload, saleId) =>
  payload.map(async (dataObj) => {
    await salesModels.insertSaleProducts(dataObj, saleId);
});

const insertSales = async (payload) => {
  insertSaleProductsSchema.validate(payload);
  await validateProductIdArray(payload);
  const saleId = await salesModels.insertSales();
  await Promise.all(handleSaleProducts(payload, saleId));
  return { message: { id: saleId, itemsSold: payload } };
};

const deleteItem = async (id) => {
  await validateSaleId(id);
  await salesModels.deleteItem(id);
  return true;
};

const handleUpdateItem = (payload, id) =>
  payload.map(async (dataObj) => {
    await salesModels.updateItem(dataObj, id);
  });

const updateItem = async (id, payload) => {
  insertSaleProductsSchema.validate(payload);
  await validateProductIdArray(payload);
  await validateSaleId(id);
  await Promise.all(handleUpdateItem(payload, id));
  return true;
};

module.exports = {
  findAll,
  find,
  insertSales,
  deleteItem,
  updateItem,
};
