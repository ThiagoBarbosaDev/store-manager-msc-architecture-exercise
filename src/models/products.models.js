const connection = require('./database/connection');

const findAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products');
  return result;
};

const find = async (id) => {
  const [[result]] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  findAll,
  find,
};