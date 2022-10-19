const salesModels = require('../models/sales.models');
const { handleProductIdValidation } = require('./validations/isProductIdInDatabase');
const { insertSaleProductsSchema } = require('./validations/schemas');
const { validateSaleId } = require('./validations/validateSaleId');

const find = async (id) => {
  await validateSaleId(id);
  const result = await salesModels.find(id);
  return { type: null, message: result };
};

const findAll = async () => {
  const result = await salesModels.findAll();
  return { type: null, message: result };
};

const handleSaleProducts = (payload, saleId) =>
  payload.map(async (dataObj) => {
    const saleProductsId = await salesModels.insertSaleProducts(dataObj, saleId);
    return saleProductsId;
});

const insertSales = async (payload) => {
  insertSaleProductsSchema.validate(payload);
  await handleProductIdValidation(payload);
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
    console.log(dataObj, payload, id);
    await salesModels.updateItem(dataObj, id);
  });

const updateItem = async (id, payload) => {
  insertSaleProductsSchema.validate(payload);
  await handleProductIdValidation(payload);
  await validateSaleId(id);
  await Promise.all(handleUpdateItem(payload, id));
  return true;
};

module.exports = {
  find,
  findAll,
  insertSales,
  deleteItem,
  updateItem,
};
