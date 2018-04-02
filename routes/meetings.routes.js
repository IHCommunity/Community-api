const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings.controller');
const agreementsController = require('../controllers/agreements.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

// Agreements routes
router.delete('/agreements/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, agreementsController.delete);
router.get('/agreements/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, agreementsController.get);
router.get('/:id/agreements', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, agreementsController.list);
router.post('/:id/agreements', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, agreementsController.create);
router.put('/:idMeeting/agreements/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, agreementsController.edit);

// Meetings routes
router.get('/', secureMiddleware.isAuthenticated, meetingsController.list);
router.post('/', secureMiddleware.isAuthenticated, meetingsController.create);
router.get('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, meetingsController.get);
router.put('/:id', secureMiddleware.isAuthenticated, meetingsController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, meetingsController.delete);

module.exports = router;