const salesModels = require('../models/sales.models');
const { validateSaleProducts } = require('./validations/nameValidation');
const { doesProductIdExist } = require('./validations/validateDoesProductIdExist');

const handleSaleProducts = (payload, saleId) =>
  payload.map(async (dataObj) => {
    const saleProductsId = await salesModels.insertSaleProducts(dataObj, saleId);
    return saleProductsId;
  });

const insertSales = async (payload) => {
  const { message, type } = validateSaleProducts(payload);
  const doesProductIdExistsArray = await Promise
    .all(payload.map(async ({ productId }) => doesProductIdExist(productId)));
  const doesProductIdNotExist = !doesProductIdExistsArray.every((productId) => productId);

  if (doesProductIdNotExist) { return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' }; }
  if (type) { return { type, message }; }

  const saleId = await salesModels.insertSales();
  await Promise.all(handleSaleProducts(payload, saleId));

  return { type: null, message: { id: saleId, itemsSold: payload } };
};

module.exports = {
  insertSales,
};
