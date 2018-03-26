const mongoose = require('mongoose');
const ApiError = require('../models/api-error.model');

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        next(new ApiError('Forbidden', 403));
    }
};