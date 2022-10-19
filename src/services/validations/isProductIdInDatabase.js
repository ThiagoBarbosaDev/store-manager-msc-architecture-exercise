const connection = require('../../models/database/connection');
const throwError = require('../../utils/genericErrorResponse');

const checkDatabaseForId = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (result.length) {
    return true;
  }
    throw throwError('PRODUCT_NOT_FOUND', 'Product not found');
};

const handleProductIdValidation = async (payload) => {
  await Promise.all(
    payload.map(async ({ productId }) => checkDatabaseForId(productId)),
  );
};

module.exports = {
  checkDatabaseForId,
  handleProductIdValidation,
};
