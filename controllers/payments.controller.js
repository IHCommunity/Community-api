const mongoose = require('mongoose');
const Payment = require('../models/payment.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Payment.find()
    .then(payments => res.json(payments))
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
  payment.save()
    .then(() => {
      res.status(201).json(payment);
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
