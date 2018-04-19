const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const upload = require('../configs/multer.config');
const secureMiddleware = require('../middleware/secure.middleware');

router.post('/', secureMiddleware.isAuthenticated, usersController.create);
router.get('/', secureMiddleware.isAuthenticated, usersController.list);
router.post('/check', secureMiddleware.isAuthenticated, usersController.check);
router.get('/:id', secureMiddleware.isAuthenticated, usersController.get);
router.put('/:id', secureMiddleware.isAuthenticated, usersController.edit);
router.post('/:id', secureMiddleware.isAuthenticated, upload.single('avatar'), usersController.edit);
router.put('/:id/latch', secureMiddleware.isAuthenticated, usersController.pairLatch);
router.get('/:id/latch', secureMiddleware.isAuthenticated, usersController.unpairLatch);

module.exports = router;
