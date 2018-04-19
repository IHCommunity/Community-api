const express = require('express');
const router = express.Router();
const paypalController = require('../controllers/paypal.controller');

router.post('/:id', paypalController.createPayment);
router.get('/success/:amount/:userId/:localPaymentId', paypalController.makePayment);
router.get('/cancel', paypalController.cancelPayment);

module.exports = router;
