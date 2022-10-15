const { salesServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const insert = async (req, res) => {
  const payload = req.body;

  const { message, type } = await salesServices.insertSales(payload); 
  if (type) { return res.status(mapError(type)).json({ message }); }
  return res.status(201).json(message);
};

module.exports = {
  insert,
};