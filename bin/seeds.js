const mongoose = require('mongoose');
require('../configs/db.config');
const User = require('../models/user.model');

const users = [
  {
    "email": "juancuesta@gmail.com",
    "password": "tubandolero2018",
    "name": "Juan",
    "surname": "Cuesta",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin"
  },
  {
    "email": "pablo.svb4@gmail.com",
    "password": "tubandolero2018",
    "name": "Pablo",
    "surname": "Laso",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin"
  },
  {
    "email": "berrakutin@gmail.com",
    "password": "tubandolero2018",
    "name": "Marco",
    "surname": "Monzon",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin"
  }
];

User.create(users)
  .then(() => {
    console.info("Seeds success:", users);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", users);
    mongoose.connection.close();
  });
