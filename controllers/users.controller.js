const mongoose = require('mongoose');
const User = require('../models/user.model');
const ApiError = require('../models/api-error.model');
const latch = require('latch-sdk');

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id

  User.findById(id)
    .then( user => {
      if (user) {
        res.json(user);
      } else {
        next(new ApiError(`User not found`, 404));
      }
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
        res.send(user.email)
      } else {
        res.send(null);
      }
    })
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then( user => {
      if (user) {
        res.status(201).json(user)
      } else {
        next(new ApiError(`User not found`, 404));
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}

module.exports.pairLatch = (req, res, next) => {
  const pairResponse = latch.pair(req.body.code, function(err, data) {
    if (data['data'] !== undefined && data['data']['accountId']) {
      User.findByIdAndUpdate(req.user.id, {$set: { latchId: data['data']['accountId'], paired: true }})
        .then( (user) => {
          if (user) {
            res.status(204).json(user);
          } else {
            next(new ApiError('User not found', 404));
          }
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.message, 400, error.errors));
          } else {
            next(new ApiError(error.message, 500));
          }
        });
    } else if (data['error']) {
      console.log('im here');
      next(new ApiError('There was an error, try later or introduce a valid code', 400));
    }
  })
}

module.exports.unpairLatch = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then( user => {
      if (user) {
        const unpair = latch.unpair(user.latchId, () => {
          console.log('account unpaired');
          User.findByIdAndUpdate(id, {$set: { latchId: '', paired: false }})
            .then( (user) => {
              if (user) {
                res.status(204).json(user);
              } else {
                next(new ApiError('User not found', 404));
              }
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.message, 400, error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            });
        });
      } else {
        next(new ApiError('User not found', 404));
      }
    })
    .catch(error => next(error));
}
