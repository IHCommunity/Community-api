const paypal = require('paypal-rest-sdk');
require('../configs/paypal.config');

module.exports.createPayment = (req, res, next) => {

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:4200/succes",
      "cancel_url": "http://localhost:4200/cancel"
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
      // console.log("Create Payment Response");
      // console.log(payment);
      // res.json(payment);
      console.log(payment);
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
                "currency": "USD",
                "total": "500.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
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
