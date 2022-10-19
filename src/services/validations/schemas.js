const Joi = require('joi');
const { handleJoiError } = require('../../utils/errorUtils');

const nameSchema = Joi.object({
  name: Joi.string().min(5).required(),
}).error(handleJoiError);

const productIdSchema = Joi.number().integer().required();

const quantitySchema = Joi.number().integer().min(1).positive()
  .required();

const saleObject = Joi.object({
  productId: productIdSchema,
  quantity: quantitySchema,
});

const insertSaleProductsSchema = Joi.array()
  .items(saleObject)
  .error(handleJoiError);

  module.exports = {
    nameSchema,
    insertSaleProductsSchema,
  };