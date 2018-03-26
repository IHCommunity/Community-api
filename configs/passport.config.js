const User = require('../models/user.model');
const LocalStrategy = require('passport-local').Strategy;
const ApiError = require('../models/api-error.model');

module.exports.setup = (passport) => {
  passport.serializeUser((user, next) => {
    next(null, user._id);
  });

  passport.deserializeUser((id, next) => {
    User.findById(id)
      .then(user => {
        next(null, user);
      })
      .catch(error => next(error));
  });

  passport.use('local-auth', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, (email, password, next) => {
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          next(null, user, 'Invalid email or password');
        } else {
          user.checkPassword(password)
            .then(match => {
              if (match) {
                next(null, user);
              } else {
                next(null, null, 'Invalid email or password');
              }
            })
            .catch(error => next(error));
        }
      })
      .catch(error => next(error));
  }));
};