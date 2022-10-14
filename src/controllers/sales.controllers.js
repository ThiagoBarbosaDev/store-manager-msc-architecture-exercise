// const { mapError } = require('../utils/errorMap');

const { salesServices } = require('../services');

const insert = async (req, res) => {
  const payload = req.body;
  // const { type, message } = await productsServices.insert(payload);
  // if (type) {
  //   return res.status(mapError(type)).json({ message });
  // }
  const { type, message } = await salesServices.insert(payload); 
  res.status(200).json({ type, message });
};

module.exports = {
  insert,
};