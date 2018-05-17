const mongoose = require('mongoose');
const Service = require('../models/service.model');
const ApiError = require('../models/api-error.model');

module.exports.list = (req, res, next) => {
  Service.find()
    .then(services => {
      res.status(200).json(services);
    })
    .catch(error => next(error));
}

module.exports.create = (req, res, next) => {
  const { title, description, phone, email, address, latitude, longitude } = req.body;

  let service = new Service({
    title,
    description,
    phone,
    email,
    address,
    location: {
      type: 'Point',
      coordinates: [latitude, longitude]
    }
  });

  service.save()
    .then(() => {
      res.status(201).json(service);
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
  Service.findByIdAndRemove(id)
    .then(service => {
      if (service) {
        res.status(204).json()
      } else {
        next(new ApiError(`Service not found`, 404));
      }
    }).catch(error => next(error));
}