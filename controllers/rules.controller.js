const mongoose = require('mongoose');
const Rule = require('../models/rule.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Rule.find()
    .then(rules => res.json(rules))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Rule.findById(id)
    .then(rule => {
      if (rule) {
        res.json(rule)
      } else {
        next(new ApiError(`Rule not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const rule = new Rule(req.body);
  rule.save()
    .then(() => {
      res.status(201).json(rule);
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
  News.findByIdAndRemove(id)
    .then(rule => {
      if (rule) {
        res.status(204).json()
      } else {
        next(new ApiError(`Rule not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  
  Rule.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(rule => {
      if (rule) {
        res.json(rule)
      } else {
        next(new ApiError(`Rule not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}