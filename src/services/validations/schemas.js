const Joi = require('joi');

const idSchema = Joi.number().integer().min(1).required();
const nameSchema = Joi.string().min(5).required().messages({
  'string.base': '"name" should be a "string"',
  'string.empty': '"name" is required',
  'string.min': '"name" length must be at least {#limit} characters long',
  'any.required': '"name" is required',
});

module.exports = {
  idSchema,
  nameSchema,
};