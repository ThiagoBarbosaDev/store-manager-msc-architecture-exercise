const connection = require('../../models/database/connection');
const throwError = require('../../utils/genericErrorResponse');

const doesSaleIdExist = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.sales WHERE id = ?', [id]);
  console.log(result.length);
  if (result.length) {
    return false;
  }
  return true;
};

const validateSaleId = async (id) => { 
  if (await doesSaleIdExist(id)) { throw throwError('ID_WITHOUT_RESULTS', 'Sale not found'); }
};

module.exports = {
  validateSaleId,
};