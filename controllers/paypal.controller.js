const paypal = require('paypal-rest-sdk');
require('../configs/paypal.config');
const Payment = require('../models/payment.model');
const ApiError = require('../models/api-error.model');

module.exports.createPayment = (req, res, next) => {

  const id = req.params.id;
  const new_payment = new Payment;

  Payment.findById(id)
    .then(payment => {
      if (payment) {
          new_payment = payment;
          console.log(new_payment);
      } else {
        next(new ApiError(`Notice not found`, 404));
      }
    }).catch(error => next(error));

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": `http://localhost:3000/pay/success/${new_payment.amount}`,
      "cancel_url": "http://localhost:3000/pay/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": new_payment.title,
          "sku": "001",
          "price": new_payment.amount,
          "currency": "EUR",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "EUR",
        "total": new_payment.amount
      },
      "description": new_payment.description
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
    const amount = req.params.amount;

    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "EUR",
                "total": amount
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
            res.redirect('http://localhost:4200/news');
        }
    })
}

module.exports.cancelPayment = (req, res, next) => {
    res.redirect('http://localhost:4200');
}
