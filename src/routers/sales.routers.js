const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .get(salesControllers.insert);

module.exports = router;
