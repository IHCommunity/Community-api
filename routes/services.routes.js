const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, serviceController.list);
router.post('/', secureMiddleware.isAuthenticated, serviceController.create);
router.get('/:id', secureMiddleware.isAuthenticated, serviceController.get);
router.delete('/:id', secureMiddleware.isAuthenticated, serviceController.delete);

module.exports = router;
