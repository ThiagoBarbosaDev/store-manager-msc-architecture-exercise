const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router.get('/:id', salesControllers.find);

router
  .route('/')
  .post(salesControllers.insert)
  .get(salesControllers.findAll);

module.exports = router;
