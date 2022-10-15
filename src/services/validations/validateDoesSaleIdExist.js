const connection = require('../../models/database/connection');

const doesSaleIdExist = async (id) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.sales WHERE id = ?',
    [id],
  );
  console.log(result.length);
  if (result.length) {
    return false;
  }
  return true;
};

module.exports = {
  doesSaleIdExist,
};
