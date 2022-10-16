const connection = require('../../models/database/connection');

const doesProductIdExist = async (id) => {
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  if (result.length) { return true; }
  return false;
};

module.exports = {
  doesProductIdExist,
};