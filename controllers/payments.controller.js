const mongoose = require('mongoose');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');
const Mailer = require('../models/email.model');

module.exports.list = (req, res, next) => {
  Payment.find()
    .then(payments => {
        let newPayments = payments.filter(payment => {
            if ( payment.debtor.indexOf(req.user.id) >= 0 ) {
                return payment;
            }
        })
        res.json(newPayments);
    })
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Payment.findById(id)
    .then(payment => {
      if (payment) {
        res.json(payment)
      } else {
        next(new ApiError(`Payment not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const payment = new Payment(req.body);

  User.find()
    .then(users => {
        users.forEach(user => {
            payment.debtor.push(user._id);
        })

        payment.save()
        .then(() => {
            let mailsAdresses = [];
            User.find()
              .then(users => {
                  mailsAdresses = users.map(user => user.email);

                  newPaymentMessage = {
                      from: 'Juan Cuesta 😠 <sender@server.com>',
                      to: mailsAdresses,
                      subject: payment.title,
                      html: `<div>
                                <h3 style="color: grey; text-align: center">New payment has been created</h3>
                                <p style="">Your community ADMIN has created a payment. To pay please use your Community App!</p>
                                <p style="text-align: right">Thanks! ☻</p>
                            </div>`
                  };

                  mail = new Mailer();

                  mail.sendNewMail(newPaymentMessage);

                  res.status(201).json(payment);
              })
              .catch(error => {
                if (error instanceof mongoose.Error.ValidationError) {
                  next(new ApiError(error.errors));
                } else {
                  next(new ApiError(error.message, 500));
                }
              })
        })
    })
    .catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.errors));
        } else {
            next(new ApiError(error.message, 500));
        }
    })
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;
  Payment.findByIdAndRemove(id)
    .then(payment => {
      if (payment) {
        res.status(204).json()
      } else {
        next(new ApiError(`Payment not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  Payment.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(payment => {
      if (payment) {
        res.status(201).json(payment)
      } else {
        next(new ApiError(`Payment not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}
