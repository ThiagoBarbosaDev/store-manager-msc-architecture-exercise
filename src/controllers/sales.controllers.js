const { salesServices } = require('../services');
const { mapError } = require('../utils/errorMap');

const insert = async (req, res) => {
  const payload = req.body;

  const { message, type } = await salesServices.insertSales(payload); 
  if (type) { return res.status(mapError(type)).json({ message }); }
  return res.status(201).json(message);
};

const find = async (req, res) => { 
  const { id } = req.params;
  const { message, type } = await salesServices.find(id);
  if (type) { return res.status(mapError(type)).json({ message }); }
  return res.status(200).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesServices.findAll();
  return res.status(200).json(message);
};

module.exports = {
  insert,
  find,
  findAll,
};