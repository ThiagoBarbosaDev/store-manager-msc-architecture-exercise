const connection = require('../../models/database/connection');

const doesProductIdExist = async (id) => { 
  // if (id) { return true; }
  const [result] = await connection
    .execute('SELECT * FROM StoreManager.products WHERE id = ?', [id]);
  console.log(result.length);
  if (result.length) { return true; }
  return false;
};

module.exports = {
  doesProductIdExist,
};