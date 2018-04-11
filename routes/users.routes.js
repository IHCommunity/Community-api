const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', usersController.create);
router.get('/', usersController.list);
router.post('/check', usersController.check);

module.exports = router;
