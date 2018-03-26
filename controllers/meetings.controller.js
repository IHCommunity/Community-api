const mongoose = require('mongoose');
const Meeting = require('../models/meeting.model');
const Agreement = require('../models/meeting-agreement.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Meeting.find()
    .populate('agreements')
    .then(meeting => res.json(meeting))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Meeting.findById(id)
    .populate('agreements')
    .then(meeting => {
      if (meeting) {
        res.json(meeting)
      } else {
        next(new ApiError(`Meeting not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {

}

module.exports.delete = (req, res, next) => {

}

module.exports.edit = (req, res, next) => {

}