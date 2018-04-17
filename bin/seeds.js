// const mongoose = require('mongoose');
// require('../configs/db.config');
// const User = require('../models/user.model');
require('dotenv').config();
const latch = require('latch-sdk');

latch.init({ appId: process.env.LATCH_APP_ID, secretKey: process.env.LATCH_SECRET_KEY});
// const users = [
//   {
//     "email": "juancuesta@gmail.com",
//     "password": "tubandolero2018",
//     "name": "Juan",
//     "surname": "Cuesta",
//     "phone": "909090",
//     "apt": "2do A",
//     "role": "admin",
//     "_id": "5accf93ee84a94175bca8e67"
//   },
//   {
//     "email": "pablo.svb4@gmail.com",
//     "password": "tubandolero2018",
//     "name": "Pablo",
//     "surname": "Laso",
//     "phone": "909090",
//     "apt": "2do A",
//     "role": "admin",
//     "_id": "5accf93ee84a94175bca8e68"
//   },
//   {
//     "email": "berrakutin@gmail.com",
//     "password": "tubandolero2018",
//     "name": "Marco",
//     "surname": "Monzon",
//     "phone": "909090",
//     "apt": "2do A",
//     "role": "admin",
//     "_id": "5accf93ee84a94175bca8e69"
//   }
// ];
// User.create(users)
//   .then(() => {
//     console.info("Seeds success:", users);
//     mongoose.connection.close();
//   })
//   .catch(error => {
//     console.error("Seeds error:", users);
//     mongoose.connection.close();
//   });
//   console.log("OK");

latch.unpair("LVTkndDMW3zWMzg9gPHJeptmHZhpEnEw9igzngQFCKMFQfLtfBQtnsmmJHpMkXad", function() {
  console.log("OK");
});
