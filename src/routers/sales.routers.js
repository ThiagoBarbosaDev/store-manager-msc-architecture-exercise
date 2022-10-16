const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.route('/:id')
  .get(salesControllers.find)
  .delete(salesControllers.deleteItem);

router
  .route('/')
  .post(salesControllers.insert)
  .get(salesControllers.findAll);

module.exports = router;
