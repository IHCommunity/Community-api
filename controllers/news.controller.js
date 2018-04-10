const mongoose = require('mongoose');
const News = require('../models/news.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  News.find()
    .then(news => {
      res.json(news);
    })
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  News.findById(id)
    .then(notice => {
      if (notice) {
        res.json(notice)
      } else {
        next(new ApiError(`Notice not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const notice = new News(req.body);

  switch (notice.type) {
    case 'neutral':
      notice.orderTypeNumber = 0;
      break;
    case 'good':
      notice.orderTypeNumber = 1;
      break;
    case 'info':
      notice.orderTypeNumber = 2;
      break;
    case 'alert':
      notice.orderTypeNumber = 3;
      break;
    case 'danger':
      notice.orderTypeNumber = 4;
      break;

    default:
      break;
  }

  notice.save()
    .then(() => {
      res.status(201).json(notice);
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
    .then(notice => {
      if (notice) {
        res.status(204).json()
      } else {
        next(new ApiError(`Notice not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;

  if(typeof req.body.storeNotice !== 'undefined') {
    News.findById(id)
      .then(notice => {
        let newStoredArray = notice.stored;

        if(req.body.storeNotice) {
          newStoredArray.push(userId);
        } else {
          newStoredArray.splice(newStoredArray.indexOf(userId), 1);
        }

        News.findByIdAndUpdate(id, { $set: { stored: newStoredArray } }, { new:true })
          .then(notice => res.status(201).json(notice))
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.message, 400, error.errors));
            } else {
              next(new ApiError(error.message, 500));
            }
          });
      })
      .catch(error => next(error));
  } else {
    News.findByIdAndUpdate(id, { $set: req.body }, { new: true })
      .then(notice => {
        if (notice) {
          res.status(201).json(notice)
        } else {
          next(new ApiError(`Notice not found`, 404));
        }
      }).catch(error => {
        if (error instanceof mongoose.Error.ValidationError) {
          next(new ApiError(error.message, 400, error.errors));
        } else {
          next(new ApiError(error.message, 500));
        }
      });
    }
}
