const express = require('express');
const router = express.Router();
const secureMiddleware = require('../middleware/secure.middleware');
const sessionController = require('../controllers/session.controller');

module.exports = router;