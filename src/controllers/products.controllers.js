const { productsServices } = require('../services');

const findAll = async (_req, res) => {
  const { message } = await productsServices.findAll();
  res.status(200).json(message);
};

const find = async (req, res) => {
  const { id } = req.params;
  const { message } = await productsServices.find(id);
  res.status(200).json(message);
};

const insert = async (req, res) => { 
  const payload = req.body;
  const { message } = await productsServices.insert(payload);
  res.status(201).json(message);
};

const update = async (req, res) => { 
  const { id } = req.params;
  const payload = req.body;
  const { message } = await productsServices.update(id, payload);
  return res.status(200).json(message);
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  await productsServices.deleteItem(id);
  res.status(204).end();
};

const queryItem = async (req, res) => {
  const { q: query } = req.query;
  const { message } = await productsServices.queryItem(query);
  res.status(200).json(message);
};

module.exports = {
  queryItem,
  findAll,
  find,
  insert,
  update,
  deleteItem,
};