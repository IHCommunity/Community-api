const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, meetingsController.list);
router.get('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, meetingsController.get);
router.post('/', secureMiddleware.isAuthenticated, meetingsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, meetingsController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, meetingsController.deleteMeeting);
router.delete('/agreements/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, meetingsController.deleteAgreement);

module.exports = router;