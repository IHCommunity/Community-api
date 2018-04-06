const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal.controller');

router.post('/', paypalController.createPayment);
router.get('/succes', paypalController.makePayment);
router.get('/cancel', paypalController.cancelPayment);

module.exports = router;
