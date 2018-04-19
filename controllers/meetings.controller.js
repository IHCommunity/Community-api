const mongoose = require('mongoose');
const Meeting = require('../models/meeting.model');
const Agreement = require('../models/meeting-agreement.model');
const ApiError = require('../models/api-error.model');
const schedule = require('node-schedule');
const Mailer = require('../models/email.model');
const User = require('../models/user.model');

module.exports.list = (req, res, next) => {
  Meeting.find()
    .populate('agreements')
    .then(meetings => res.json(meetings))
    .catch(error => next(error));
}

module.exports.getClosest = (req, res, next) => {
  Meeting.find({ startDate:{$gte: new Date()}}).sort('-date').limit(1)
    .then(meetings => res.json(meetings[0]))
    .catch(error => next(error));
}

module.exports.listResume = (req, res, next) => {
  Meeting.find({ deadLine: { $lt: new Date() } })
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

module.exports.getActive = (req, res, next) => {
  Meeting.findOne({ active: true })
    .populate('agreements')
    .then(meeting => {
      if (meeting) {
        res.json(meeting)
      } else {
        next(new ApiError(`There is no active meeting`, 404));
      }
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const { title, description, startDate, deadLine } = req.body;
  let meeting = new Meeting({ title, description, startDate, deadLine });
  // const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
  // const beautyStartDate = startDate.toLocaleDateString('en-US', options);

  let mailsAdresses = [];
  let mail;
  let createMeetingMessage, startMeetingMessage, endMeetingMessage = {};

  User.find()
    .then(users => {
        mailsAdresses = users.map(user => user.email);
        const newD = new Date(startDate);

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        const month = monthNames[newD.getMonth()];

        createMeetingMessage = {
            from: 'Juan Cuesta 😠 <sender@server.com>',
            to: mailsAdresses,
            subject: 'New meeting has been created',
            text: `Juan Cuesta has created a meeting on ${month} ${newD.getDay()}, ${newD.getFullYear()}`
        };
        startMeetingMessage = {
            from: 'Juan Cuesta 😠 <sender@server.com>',
            to: mailsAdresses,
            subject: title,
            text: `The meeting is about to start in one hour! Don't forget your mobile, you'll need it.`
        };
        endMeetingMessage = {
            from: 'Juan Cuesta 😠 <sender@server.com>',
            to: mailsAdresses,
            subject: title,
            text: `The meeting has been closed! You can check the results in Community App!`
        };

        mail = new Mailer();
    })
    .then(() => {
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
            mail.sendNewMail(createMeetingMessage);
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

          const MINUTE = 60000;
          const ONE_HOUR_LESS = new Date(meeting.startDate.getTime() - MINUTE / 2)

          const notifyMeeting = schedule.scheduleJob(ONE_HOUR_LESS, function(){
              mail.sendNewMail(startMeetingMessage);
          });

          const setToActive = schedule.scheduleJob(meeting.startDate, function(){
              Meeting.findByIdAndUpdate(meeting._id, { $set: {active: true} }, { new: true })
                  .then(meeting => {
                      console.log(meeting);
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
                      mail.sendNewMail(endMeetingMessage);
                      console.log(meeting);
                  })
                  .catch(error => {
                    if (error instanceof mongoose.Error.ValidationError) {
                      next(new ApiError(error.errors));
                    } else {
                      next(new ApiError(error.message, 500));
                    }
                  })
          });
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
