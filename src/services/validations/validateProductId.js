const connection = require('../../models/database/connection');
const { throwError } = require('../../utils/errorUtils');

const validateProductId = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (result.length) {
    return true;
  }
  throw throwError('PRODUCT_NOT_FOUND', 'Product not found');
};

const validateProductIdArray = async (payload) => {
  await Promise.all(
    payload.map(async ({ productId }) => validateProductId(productId)),
  );
};

module.exports = {
  validateProductId,
  validateProductIdArray,
};
