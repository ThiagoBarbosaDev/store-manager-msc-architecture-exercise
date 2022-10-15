const Joi = require('joi');

const productIdSchema = Joi.number().integer().required()
  .messages({
    'number.base': '"productId" should be a "number"',
    'number.empty': '"productId" is required',
    'any.required': '"productId" is required',
  });

const nameSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.base': '{{#label}} should be a "string"',
    'string.empty': '{{#label}} is required',
    'string.min': '{{#label}} length must be at least {#limit} characters long',
    'any.required': '{{#label}} is required',
  }),
});

const saleObject = Joi.object({
  productId: productIdSchema,
  quantity: Joi.number().integer().min(1).positive()
    .required()
    .messages({
      'number.base': '"quantity" should be a "number"',
      'number.empty': '"quantity" is required',
      'number.min': '"quantity" must be greater than or equal to 1',
      'any.required': '"quantity" is required',
    }),
});

const insertSaleProductsSchema = Joi.array()
  .items(saleObject)
  .messages({ 'string.empty': 'teste' });

module.exports = {
  nameSchema,
  insertSaleProductsSchema,
};