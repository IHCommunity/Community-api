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
    "email": "cr7@yahoo.es",
    "password": "siuu",
    "name": "Cristiano",
    "surname": "Ronaldo",
    "phone": "808080",
    "apt": "7mo C",
    "role": "user"
  },
  {
    "email": "mrwhite@gmail.com",
    "password": "bluemeta",
    "name": "Walter",
    "surname": "White",
    "phone": "707070",
    "apt": "1ro M",
    "role": "user"
  },
  {
    "email": "popo@popo.com",
    "password": "popo",
    "name": "Popo",
    "surname": "Popo",
    "phone": "6060",
    "apt": "2do C",
    "role": "user"
  },
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
