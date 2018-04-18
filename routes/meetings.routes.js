const express = require('express');
const router = express.Router();
const meetingsController = require('../controllers/meetings.controller');
const agreementsController = require('../controllers/agreements.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

// Agreements routes
router.delete('/agreements/:id', idMiddleware.checkValidId, agreementsController.delete);
router.get('/agreements/:id', idMiddleware.checkValidId, agreementsController.get);
router.get('/:id/agreements', idMiddleware.checkValidId, agreementsController.list);
router.post('/:id/agreements', idMiddleware.checkValidId, agreementsController.create);
router.put('/agreements/:id', idMiddleware.checkValidId, agreementsController.edit);

// Meetings routes
router.get('/', meetingsController.list);
router.get('/closest', meetingsController.getClosest);
router.post('/', meetingsController.create);
router.get('/resume', meetingsController.listResume);
router.get('/active', meetingsController.getActive);
router.get('/:id', idMiddleware.checkValidId, meetingsController.get);
router.put('/:id', meetingsController.edit);
router.delete('/:id', idMiddleware.checkValidId, meetingsController.delete);

module.exports = router;
