const { nameSchema, insertSaleProductsSchema } = require('./schemas');

const nameValidation = (name) => {
  const { error } = nameSchema.validate(name);
  // const errorMap = {
  //   INVALID_NAME_VALUE: 400,
  // };
 
  // if (error) { throw { message: error.details[0].message }; }
  // if (error) { throw new Error('deu ruim'); }

  if (error && error.details[0].type === 'any.required') {
    return { type: 'VALUE_NOT_FOUND', message: error.details[0].message };
  }
  
  if (error && error.details[0].type === 'string.min') {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: error.details[0].message,
    };
  }
  return { type: null, message: '' };
};

const validateSaleProducts = (payload) => {
  const { error } = insertSaleProductsSchema.validate(payload);
  // console.log('###', error);
  if (error && error.details[0].type === 'any.required') {
    return { type: 'VALUE_NOT_FOUND', message: error.details[0].message };
  }

  if (error && error.details[0].type === 'number.min') {
    return { type: 'INVALID_NUMBER_VALUE', message: error.details[0].message };
  }
  return { type: null, message: '' };
};

module.exports = {
  nameValidation,
  validateSaleProducts,
};
