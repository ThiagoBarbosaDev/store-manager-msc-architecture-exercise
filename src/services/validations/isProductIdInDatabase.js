const { doesProductIdExist } = require('./validateDoesProductIdExist');

const isProductIdInDatabase = async (payload) => {
  const doesProductIdExistsArray = await Promise.all(
    payload.map(async ({ productId }) => doesProductIdExist(productId)),
  );

  const doesProductIdNotExist = !doesProductIdExistsArray.every(
    (productId) => !!productId,
  );

  if (doesProductIdNotExist) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return false;
};

module.exports = {
  isProductIdInDatabase,
};
