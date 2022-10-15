// const { mapError } = require('../utils/errorMap');

const { salesServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const insert = async (req, res) => {
  const payload = req.body;
  // const { type, message } = await productsServices.insert(payload);
  // if (type) {
  //   return res.status(mapError(type)).json({ message });
  // }
  const { message, type } = await salesServices.insertSales(payload); 
  res.status(mapError(type)).json({ message });
};

module.exports = {
  insert,
};