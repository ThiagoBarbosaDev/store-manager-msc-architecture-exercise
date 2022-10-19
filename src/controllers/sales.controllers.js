const { salesServices } = require('../services');

const insert = async (req, res) => {
  const payload = req.body;
  const { message } = await salesServices.insertSales(payload); 
  return res.status(201).json(message);
};

const find = async (req, res) => { 
  const { id } = req.params;
  const { message } = await salesServices.find(id);
  return res.status(200).json(message);
};

const findAll = async (_req, res) => {
  const { message } = await salesServices.findAll();
  return res.status(200).json(message);
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  await salesServices.deleteItem(id);
  return res.status(204).end();
};

const updateItem = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  await salesServices.updateItem(id, payload);
  const message = { saleId: id, itemsUpdated: payload };
  return res.status(200).json(message);
};

module.exports = {
  updateItem,
  insert,
  find,
  findAll,
  deleteItem,
};