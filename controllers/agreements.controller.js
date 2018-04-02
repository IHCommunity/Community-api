const mongoose = require('mongoose');
const Meeting = require('../models/meeting.model');
const Agreement = require('../models/meeting-agreement.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  const id = req.params.id;

  Agreement.find({meeting: id})
    .then(agreements => res.json(agreements))
    .catch(error => next(error));
}

module.exports.get = (req, res, next) => {
  const id = req.params.id;
  Agreement.findById(id)
    .then(agreement => {
      if (agreement) {
        res.json(agreement)
      } else {
        next(new ApiError(`Agreement not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const id = req.params.id;

  const { title, description } = req.body;

  const agreement = new Agreement({ title, description, meeting: id });

  agreement.save()
    .then( () => {
      Meeting.findById(id)
        .then(meeting => {
          console.log(meeting);
          let agreementUpdated = meeting.agreements;
          agreementUpdated.push(agreement._id);

          Meeting.findByIdAndUpdate(id, { $set: { agreements: agreementUpdated} }, { new: true })
            .then(updatedMeeting => {
                res.json(updatedMeeting);
            }).catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.message, 400, error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            });
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.errors));
          } else {
            next(new ApiError(error.message, 500));
          }
        });
    })
    .catch(error => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ApiError(error.errors));
      } else {
        next(new ApiError(error.message, 500));
      }
    });
}

module.exports.delete = (req, res, next) => {
  const id = req.params.id;

  Agreement.findByIdAndRemove(id)
    .then(agreement => {
      Meeting.findById(agreement.meeting)
        .then(meeting => {
          let meetingAgreements = meeting.agreements;
          const updated = meetingAgreements.splice(meetingAgreements.indexOf(id), 1);

          Meeting.findByIdAndUpdate(agreement.meeting, { $set: { agreements: updated} }, { new: true })
            .then(updatedMeeting => {
                res.json(updatedMeeting);
            }).catch(error => {
              if (error instanceof mongoose.Error.ValidationError) {
                next(new ApiError(error.message, 400, error.errors));
              } else {
                next(new ApiError(error.message, 500));
              }
            });
        })
        .catch(error => {
          if (error instanceof mongoose.Error.ValidationError) {
            next(new ApiError(error.errors));
          } else {
            next(new ApiError(error.message, 500));
          }
        });

      if (agreement) {
        res.status(204).json()
      } else {
        next(new ApiError(`Agreement not found`, 404));
      }
    }).catch(error => next(error));
}

module.exports.edit = (req, res, next) => {
  const id = req.params.id;
  const userId = req.user._id;

  const { title, description, accept } = req.body;
  let updates;

  if (typeof accept !== "undefined") {
    Agreement.findById(id)
      .then( (agreement) => {
        let vote;

        if(accept) {
          vote = agreement.agree;
          vote.push(userId);
          updates = { agree: vote };
        } else {
          vote = agreement.disagree;
          vote.push(userId);
          updates = { disagree: vote };
        }
      })
  } else {
    updates = { title, description }
  }

  setTimeout(() => {
    Agreement.findByIdAndUpdate(id, { $set: updates }, { new: true })
      .then( (agreement) => {
        if (agreement) {
          res.status(201).json(agreement);
        } else {
          next(new ApiError(`Meeting not found`, 404));
        }
      })
  }, 500);

  // function updateData() {
    
  //   if (typeof accept !== "undefined") {
  //     Agreement.findById(id)
  //       .then( (agreement) => {
  //         let vote;

  //         if(accept) {
  //           vote = agreement.agree;
  //           vote.push(userId);
  //           updates = { agree: vote };
  //         } else {
  //           vote = agreement.disagree;
  //           vote.push(userId);
  //           updates = { disagree: vote };
  //         }
  //       })
  // } else {
  //   updates = { title, description }
  // }
  // }

  // async function updateDataBase() {
  //   await updateData();

  //   Agreement.findByIdAndUpdate(id, { $set: updates }, { new: true })
  //     .then( (agreement) => {
  //       if (agreement) {
  //         res.status(201).json(agreement);
  //       } else {
  //         next(new ApiError(`Meeting not found`, 404));
  //       }
  //     })
  // }

  // updateDataBase();
    
}