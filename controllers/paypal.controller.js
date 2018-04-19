const paypal = require('paypal-rest-sdk');
require('../configs/paypal.config');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.createPayment = (req, res, next) => {

  const userId = req.user._id;
  const id = req.params.id;
  let new_payment = new Payment();

  Payment.findById(id)
    .then(payment => {
      if (payment) {
          const create_payment_json = {
              "intent": "sale",
              "payer": {
                  "payment_method": "paypal"
              },
              "redirect_urls": {
                  "return_url": `http://localhost:3000/paypal/success/${payment.amount}/${userId}/${payment._id}`,
                  "cancel_url": "http://localhost:3000/paypal/cancel"
              },
              "transactions": [{
                  "item_list": {
                      "items": [{
                          "name": payment.title,
                          "sku": "001",
                          "price": payment.amount.toString(),
                          "currency": "EUR",
                          "quantity": 1
                      }]
                  },
                  "amount": {
                      "currency": "EUR",
                      "total": payment.amount.toString()
                  },
                  "description": payment.description
              }]
          };

          paypal.payment.create(create_payment_json, function (error, payment) {
              if (error) {
                  console.log(error);
                  res.status(error.httpStatusCode).json(error);
              } else {
                  for (let link of payment.links) {
                      if (link.rel === 'approval_url') {
                          res.json(link.href);
                      }
                  }
              }
          });
      } else {
        next(new ApiError(`Notice not found`, 404));
      }
    }).catch(error => next(error));

}

module.exports.makePayment = (req, res, next) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const amount = req.params.amount;
    const userId = req.params.userId;
    const localPaymentId = req.params.localPaymentId;

    User.findById(userId)
        .then(user => {
            if (user) {
                Payment.findById(localPaymentId)
                    .then(payment => {
                        if (payment) {
                          payment.debtor.splice(payment.debtor.indexOf(userId), 1);
                          payment.debt_free.push(userId);

                          payment.save()
                            .then( () => {
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
                                    if (error) {
                                        console.log('error');
                                        throw error;
                                    } else {
                                        res.redirect('http://localhost:4200/home/payments/good');
                                    }
                                })
                            } )
                            .catch(error => {
                              if (error instanceof mongoose.Error.ValidationError) {
                                next(new ApiError(error.message, 400, error.errors));
                              } else {
                                next(new ApiError(error.message, 500));
                              }
                            });
                        } else {
                          next(new ApiError(`Payment not found`, 404));
                        }
                    })
                    .catch(error => next(error));
            } else {
              next(new ApiError(`User not found`, 404));
            }
          })
        .catch(error => next(error));
}

module.exports.cancelPayment = (req, res, next) => {
    res.redirect('http://localhost:4200/home/payments/wrong');
}
