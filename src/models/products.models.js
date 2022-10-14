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

const insert = async ({ name }) => {
   const [{ insertId }] = await connection.execute(
     'INSERT INTO StoreManager.products (name) VALUES (?)',
     [name],
   );
  return insertId;
};

module.exports = {
  findAll,
  find,
  insert,
};