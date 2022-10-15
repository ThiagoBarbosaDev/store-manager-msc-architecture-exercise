const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.route('/:id')
  .get(productsControllers.find)
  .put(productsControllers.update);

router.route('/')
  .post(productsControllers.insert)
  .get(productsControllers.findAll);

module.exports = router;