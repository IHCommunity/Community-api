const mongoose = require('mongoose');
const Meeting = require('../models/meeting.model');
const Agreement = require('../models/meeting-agreement.model');
const ApiError = require('../models/api-error.model');
const schedule = require('node-schedule');

module.exports.list = (req, res, next) => {
  Meeting.find()
    .populate('agreements')
    .then(meetings => res.json(meetings))
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
  const { title, description, startDate, deadLine } = req.body;
  let meeting = new Meeting({ title, description, startDate, deadLine });

  const agreementsArray = req.body.agreements;

  let newAgreements = [];

  if (agreementsArray) {
    newAgreements = agreementsArray.map( (agreement) => {
      return new Agreement(agreement);
    });

    newAgreements.forEach( (agreement) => {
      meeting.agreements.push(agreement._id);
      agreement.meeting = meeting._id;
    });
  }

  meeting.save()
    .then(() => {
      if (newAgreements.length > 0) {
        Agreement.insertMany(newAgreements)
          .then( () => {
            res.status(201).json(meeting);
          })
          .catch(error => {
            if (error instanceof mongoose.Error.ValidationError) {
              next(new ApiError(error.errors));
            } else {
              next(new ApiError(error.message, 500));
            }
          })
      } else {
        res.status(201).json(meeting);
      }
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    })

    const setToActive = schedule.scheduleJob(meeting.startDate, function(){
        Meeting.findByIdAndUpdate(meeting._id, { $set: {active: true} }, { new: true })
            .then(meeting => {
                res.status(201).json(meeting);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            })
    });

    const setToInactive = schedule.scheduleJob(meeting.deadLine, function(){
        Meeting.findByIdAndUpdate(meeting._id, { $set: {active: false} }, { new: true })
            .then(meeting => {
                res.status(201).json(meeting);
            })
            .catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            })
    });
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Agreement.remove({meeting: id})
    .then(agreements => {
      if (agreements) {
        res.status(204).json()
      } else {
        next(new ApiError(`Agreements not found`, 404));
      }
    }).catch(error => next(error));

  Meeting.findByIdAndRemove(id)
    .then(meeting => {
      if (meeting) {
        res.status(204).json()
      } else {
        next(new ApiError(`Meeting not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  const { title, description, startDate, deadLine } = req.body;
  const updates = { title, description, startDate, deadLine };

  Meeting.findByIdAndUpdate(id, { $set: updates }, { new: true })
    .then(meeting => {
      if (meeting) {
        res.status(201).json(meeting)
      } else {
        next(new ApiError(`Meeting not found`, 404));
      }
    })
}
