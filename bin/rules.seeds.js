const mongoose = require('mongoose');
require('../configs/db.config');
const Rule = require('../models/rule.model');

const rules = [
  {
    "title": "Containers",
    "description": "Remove all roll-out containers from the streets on the same day as pick-up"
  },
  {
    "title": "Special pickups",
    "description": "Arrange for special bulk pick-up for any items you place on the street"
  },
  {
    "title": "Pets",
    "description": "Clean up after your pets"
  },
  {
    "title": "Fans - Air conditioners",
    "description": "No fans or air conditioners are allowed in windows on front or side of units."
  },
  {
    "title": "Keep your area clean",
    "description": "Keep area behind your enclosure clean. This includes all construction waste and refuse"
  },
  {
    "title": "Pay attention to children",
    "description": "No children are allowed to play in parking areas"
  },
  {
    "title": "Commercial vehicles forbidden",
    "description": "Commercial vehicles are not allowed in residential parking lots"
  }
];

Rule.create(rules)
  .then(() => {
    console.info("Seeds success:", rules);
    mongoose.connection.close();
  })
  .catch(error => {
    console.error("Seeds error:", rules);
    mongoose.connection.close();
  });
