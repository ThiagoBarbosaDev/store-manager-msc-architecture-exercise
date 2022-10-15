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
  insertSales,
  insertSaleProducts,
};
