const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.route('/:id')
  .get(salesControllers.find)
  .delete(salesControllers.deleteItem)
  .put(salesControllers.updateItem);

router
  .route('/')
  .post(salesControllers.insert)
  .get(salesControllers.findAll);

module.exports = router;
