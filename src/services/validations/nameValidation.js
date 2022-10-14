const { nameSchema } = require('./schemas');

const nameValidation = ({ name }) => {
  const { error } = nameSchema.validate(name);
  
  if (error && error.details[0].type === 'any.required') {
    return { type: 'INVALID_NAME_VALUE', message: error.details[0].message };
  }
  
  if (error && error.details[0].type === 'string.min') {
    return {
      type: 'INVALID_NAME_LENGTH',
      message: error.details[0].message,
    };
  }
  return { type: null, message: '' };
};

module.exports = {
  nameValidation,
};
