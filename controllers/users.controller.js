const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        next(new ApiError('User already registered', 400));
      } else {
        user = new User(req.body);
        user.save()
          .then(() => {
            res.json(user);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.message, 400, error.errors));
            } else {
              next(error);
            }
          });
      }
    }).catch(error => next(new ApiError('User already registered', 500)));
}

module.exports.check = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        //res.json({email: user.email});
        res.send(user.email)
      } else {
        //res.json(req.body);
        res.send(null);
      }
    })
}
