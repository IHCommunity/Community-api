const mongoose = require('mongoose');
const News = require('../models/news.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  News.find()
    .then(news => {
      news.sort( (a, b) => b.orderTypeNumber - a.orderTypeNumber);
      res.json(news);
    })
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  News.findById(id)
    .then(news => {
      if (news) {
        res.json(news)
      } else {
        next(new ApiError(`News not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const news = new News(req.body);

  switch (news.type) {
    case 'neutral':
      news.orderTypeNumber = 0;
      break;
    case 'good':
      news.orderTypeNumber = 1;
      break;
    case 'info':
      news.orderTypeNumber = 2;
      break;
    case 'alert':
      news.orderTypeNumber = 3;
      break;
    case 'danger':
      news.orderTypeNumber = 4;
      break;
  
    default:
      break;
  }

  news.save()
    .then(() => {
      res.status(201).json(news);
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
    .then(news => {
      if (news) {
        res.status(204).json()
      } else {
        next(new ApiError(`News not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  
  News.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(news => {
      if (news) {
        res.status(201).json(news)
      } else {
        next(new ApiError(`News not found`, 404));
      }
    }).catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.message, 400, error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}