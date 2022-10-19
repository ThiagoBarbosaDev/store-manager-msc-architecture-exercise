const { errorMap } = require('./errorMap');

const throwError = (type, message) => ({ type, message });

const mapError = (type) => errorMap[type] || 500;

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

module.exports = {
  throwError,
  handleJoiError,
  mapError,
};