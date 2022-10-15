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

const update = async (id, { name: payload }) => { 
  const [{ affectedRows }] = await connection
    .execute('UPDATE StoreManager.products SET name = ? WHERE id = ?', [payload, id]);
  return affectedRows;
};

const deleteItem = async (id) => {
  const result = await connection
    .execute('DELETE FROM StoreManager.products WHERE id = ?', [id]);
  return result;
};

module.exports = {
  findAll,
  find,
  insert,
  update,
  deleteItem,
};