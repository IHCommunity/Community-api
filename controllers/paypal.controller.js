const paypal = require('paypal-rest-sdk');
require('../configs/paypal.config');
const Payment = require('../models/payment.model');

module.exports.createPayment = (req, res, next) => {

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/pay/succes",
      "cancel_url": "http://localhost:3000/pay/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Month",
          "sku": "002",
          "price": "50.00",
          "currency": "EUR",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "EUR",
        "total": "50.00"
      },
      "description": "This is the payment description."
    }]
  };

paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(error.httpStatusCode).json(error);
    } else {
          for (let link of payment.links) {
              if (link.rel === 'approval_url') {
                  res.json(link.href);
              }
          }
      }
  });
}

module.exports.makePayment = (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": "50.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        console.log(payment);
        if (error) {
            console.log('error');
            throw error;
        } else {
            console.log(JSON.stringify(payment));
            res.json('payment');
        }
    })
}

module.exports.cancelPayment = (req, res, next) => {
    res.send('Cancelled')
}
