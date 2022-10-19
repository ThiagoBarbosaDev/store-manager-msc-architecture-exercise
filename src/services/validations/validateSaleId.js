const connection = require('../../models/database/connection');
const { throwError } = require('../../utils/errorUtils');

const validateSaleId = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  if (result.length) {
    return true;
  }
  throw throwError('ID_WITHOUT_RESULTS', 'Sale not found');
};

module.exports = {
  validateSaleId,
};