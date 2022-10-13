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
  const result = await productsServices.insert(payload);
  res.status(201).json(result);
};

module.exports = {
  findAll,
  find,
  insert,
};