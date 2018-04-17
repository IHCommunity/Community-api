const mongoose = require('mongoose');
require('../configs/db.config');
const User = require('../models/user.model');
// const latch = require('latch-sdk');
const users = [
  {
    "email": "juancuesta@gmail.com",
    "password": "tubandolero2018",
    "name": "Juan",
    "surname": "Cuesta",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin",
    "_id": "5ad0b22372613a5be0a37acc"
  },
  {
    "email": "pablo.svb4@gmail.com",
    "password": "tubandolero2018",
    "name": "Pablo",
    "surname": "Laso",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin",
    "_id": "5accf93ee84a94175bca8e68"
  },
  {
    "email": "berrakutin@gmail.com",
    "password": "tubandolero2018",
    "name": "Marco",
    "surname": "Monzon",
    "phone": "909090",
    "apt": "2do A",
    "role": "admin",
    "_id": "5accf93ee84a94175bca8e69"
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
//   console.log("OK");
