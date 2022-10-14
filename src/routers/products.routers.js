const express = require('express');
const { productsControllers } = require('../controllers');

const router = express.Router();

router.get('/:id', productsControllers.find);

router.route('/')
  .post(productsControllers.insert)
  .get(productsControllers.findAll);

module.exports = router;