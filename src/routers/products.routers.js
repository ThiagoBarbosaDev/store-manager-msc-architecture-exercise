const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.get('/search', productsControllers.queryItem);

router.route('/:id')
  .get(productsControllers.find)
  .put(productsControllers.update)
  .delete(productsControllers.deleteItem);

router.route('/')
  .post(productsControllers.insert)
  .get(productsControllers.findAll);

module.exports = router;