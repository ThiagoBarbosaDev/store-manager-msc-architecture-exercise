const { productsServices } = require('../services');
const { mapError } = require('../utils/errorMap');
// const { validateId } = require('./validations/inputValidations');

const findAll = async (_req, res) => {
  const { message } = await productsServices.findAll();
  res.status(200).json(message);
};

const find = async (req, res) => {
  const { id } = req.params;
  // const { message, type } = validateId(id);

  // if (type) return res.status(mapError(type)).json({ message });
  
  const result = await productsServices.find(id);
  if (result.type) { return res.status(mapError(result.type)).json({ message: result.message }); }

  res.status(200).json(result.message);
};

const insert = async (req, res) => { 
  const payload = req.body;
  const { type, message } = await productsServices.insert(payload);
 if (type) {
   return res.status(mapError(type)).json({ message });
 }
  res.status(201).json(message);
};

const update = async (req, res) => { 
  const { id } = req.params;
  const payload = req.body;
  const { type, message } = await productsServices.update(id, payload);
  if (type) { return res.status(mapError(type)).json({ message }); }
  return res.status(200).json(message);
};

const deleteItem = async (req, res) => {
  const { id } = req.params;
  // const payload = req.body;
  const { type, message } = await productsServices.deleteItem(id);
  if (type) { return res.status(mapError(type)).json({ message }); }
  res.status(204).end();
};

module.exports = {
  findAll,
  find,
  insert,
  update,
  deleteItem,
};