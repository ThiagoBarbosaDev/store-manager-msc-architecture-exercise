const connection = require('./database/connection');

const insert = async ({ name }) => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.products (name) VALUES (?)', [name]);
  return insertId;
};

module.exports = {
  insert,
};
