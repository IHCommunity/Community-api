const mongoose = require('mongoose');
require('../configs/db.config');
const Payment = require('../models/payment.model');

const payment = [
    {
        "title": "May",
        "description": "Monthly rent payment",
        "amount": 700
    },
    {
        "title": "Garage camera",
        "description": "4K camera to watch the garage... 500 euros",
        "amount": 20
    }
]

Payment.create(payment)
  .then(() => {
    console.info("Seeds success:", payment);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", payment);
    mongoose.connection.close();
  });
