const connection = require('./database/connection');

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

const deleteItem = async (id) => {
  const [{ affectedRows }] = await connection
    .execute('DELETE FROM StoreManager.sales WHERE id = ?', [id]);
  console.log(id);
  return affectedRows;
};

// id, sale => sales
// product_id INT, sale_id INT, quantity INT  sales_products

// [
//   {
//     productId: 1,
//     quantity: 1,
//   },
//   {
//     productId: 2,
//     quantity: 5,
//   },
// ];

module.exports = {
  deleteItem,
  findAll,
  find,
  insertSales,
  insertSaleProducts,
};
