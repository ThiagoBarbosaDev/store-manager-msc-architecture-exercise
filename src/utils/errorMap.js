const errorMap = {
  INVALID_ID_VALUE: 404,
  ID_WITHOUT_RESULTS: 404,
};

const mapError = (type) => errorMap[type] || 500;

module.exports = {
  mapError,
};