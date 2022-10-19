const Joi = require('joi');

const composeErrorMessage = (errorBody, { limit, key }, type) => {
  let message = errorBody;
  message = message.replace('{{#limit}}', limit);
  message = message.replace('{{#label}}', `"${key}"`);
  message = message.replace('{{#key}}', `"${key}"`);
  return { message, type };
};

const handleJoiError = (error) => {
  const { code, local } = error[0];
  const messageBody = error[0].messages[code].source;
  switch (code) {
    case 'string.min':
      throw composeErrorMessage(messageBody, local, 'BAD_REQUEST');
    case 'number.min':
      throw composeErrorMessage(messageBody, local, 'BAD_REQUEST');
    case 'any.required':
      throw composeErrorMessage(messageBody, local, 'VALUE_NOT_FOUND');
    default:
      break;
  }
};

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