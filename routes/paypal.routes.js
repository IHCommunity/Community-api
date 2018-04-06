const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal.controller');

router.post('/', paypalController.createPayment);

module.exports = router;
