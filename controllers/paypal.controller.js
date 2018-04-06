const paypal = require('paypal-rest-sdk');
require('../configs/paypal.config');

module.exports.createPayment = (req, res, next) => {

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/succes",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Monthly payment",
          "sku": "001",
          "price": "500.00",
          "currency": "EUR",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "EUR",
        "total": "500.00"
      },
      "description": "This is the payment description."
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      res.status(error.httpStatusCode).json(error);
    } else {
      console.log("Create Payment Response");
      console.log(payment);
      res.json(payment);
    }
  });
}
