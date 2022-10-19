const connection = require('./database/connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT sale_id as saleId, product_id as productId, quantity, date '
      + 'FROM StoreManager.sales_products '
      + 'SP INNER JOIN StoreManager.sales S ON SP.sale_id = S.id',
  );
  return result;
};

const find = async (id) => { 
  const [result] = await connection
    .execute(
      'SELECT product_id as productId, quantity, date '
      + 'FROM StoreManager.sales_products '
      + 'SP INNER JOIN StoreManager.sales S ON SP.sale_id = S.id WHERE sale_id = ?', [id],
  );
  return result;
};

const insertSales = async () => {
  const [{ insertId }] = await connection
    .execute('INSERT INTO StoreManager.sales VALUE ()');
  return insertId;
};

const insertSaleProducts = async ({ productId, quantity }, saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
    [saleId, productId, quantity],
  );

  return affectedRows;
};

const deleteItem = async (id) => {
  const [{ affectedRows }] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  return affectedRows;
};

const updateItem = async ({ quantity, productId }, id) => {
  const [{ affectedRows }] = await connection.execute(
    'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
    [quantity, id, productId],
  );
  return affectedRows;
};

module.exports = {
  updateItem,
  deleteItem,
  findAll,
  find,
  insertSales,
  insertSaleProducts,
};
