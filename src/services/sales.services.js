const salesModels = require('../models/sales.models');
const { validateSaleProducts } = require('./validations/nameValidation');
const { doesProductIdExist } = require('./validations/validateDoesProductIdExist');
const { doesSaleIdExist } = require('./validations/validateDoesSaleIdExist');

const handleSaleProducts = (payload, saleId) =>
  payload.map(async (dataObj) => {
    const saleProductsId = await salesModels.insertSaleProducts(dataObj, saleId);
    return saleProductsId;
  });

const insertSales = async (payload) => {
  const { message, type } = validateSaleProducts(payload);
  
  if (type) { return { type, message }; }

  const doesProductIdExistsArray = await Promise
  .all(payload.map(async ({ productId }) => doesProductIdExist(productId)));
  const doesProductIdNotExist = !doesProductIdExistsArray.every((productId) => productId);
  
  if (doesProductIdNotExist) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }

  const saleId = await salesModels.insertSales();
  await Promise.all(handleSaleProducts(payload, saleId));

  return { type: null, message: { id: saleId, itemsSold: payload } };
};

const find = async (id) => {
  const isSaleIdInvalid = await doesSaleIdExist(id);
  if (isSaleIdInvalid) { return { type: 'ID_WITHOUT_RESULTS', message: 'Sale not found' }; }
  const result = await salesModels.find(id);
  return { type: null, message: result };
};

const findAll = async () => {
  const result = await salesModels.findAll();
  return { type: null, message: result };
};

module.exports = {
  insertSales,
  find,
  findAll,
};
