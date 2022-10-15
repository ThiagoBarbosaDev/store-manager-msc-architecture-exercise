const express = require('express');
const { salesControllers } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(salesControllers.insert);

module.exports = router;
