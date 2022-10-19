const errorMap = {
  INVALID_ID_VALUE: 404,
  ID_WITHOUT_RESULTS: 404,
  VALUE_NOT_FOUND: 400,
  INVALID_NAME_LENGTH: 422,
  INVALID_NUMBER_VALUE: 422,
  PRODUCT_NOT_FOUND: 404,
  BAD_REQUEST: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};