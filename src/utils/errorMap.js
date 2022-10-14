const errorMap = {
  INVALID_ID_VALUE: 404,
  ID_WITHOUT_RESULTS: 404,
  INVALID_NAME_VALUE: 400,
  INVALID_NAME_LENGTH: 422,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};