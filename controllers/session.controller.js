const passport = require('passport');
const ApiError = require('../models/api-error.model');
const latch = require('latch-sdk');

module.exports.create = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    next(new ApiError('Email and password are required'));
  } else {
    passport.authenticate('local-auth', (error, user, message) => {
      if (error) {
        next(error);
      } else if (!user) {
        next(new ApiError(message, 401));
      } else {
        if (user.LatchId) {
          latch.status(user.LatchId, function(err, data) {
            if (data['data']['operations'][process.env.LATCH_ID]['status'] == 'on') {
              req.login(user, (error) => {
                if (error) {
                  next(new ApiError(error.message, 500));
                } else {
                  res.status(201).json(req.user);
                }
              });
            } else {
              next(new ApiError('Password is not correct'));
            }
          })
        } else {
          req.login(user, (error) => {
            if (error) {
              next(new ApiError(error.message, 500));
            } else {
              res.status(201).json(req.user);
            }
          });
        }
      }
    })(req, res, next);
  }
};

module.exports.destroy = (req, res, next) => {
  req.logout();
  res.status(204).json();
};