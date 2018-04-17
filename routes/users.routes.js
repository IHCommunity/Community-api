const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.post('/', usersController.create);
router.get('/', usersController.list);
router.post('/check', usersController.check);
router.get('/:id', usersController.get);
router.put('/:id', usersController.edit);
router.put('/:id/latch', usersController.pairLatch);
router.get('/:id/latch', usersController.unpairLatch);

module.exports = router;
