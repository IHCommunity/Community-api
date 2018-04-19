const express = require('express');
const router = express.Router();
const paymentsController = require('../controllers/payments.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, paymentsController.list);
router.get('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, paymentsController.get);
router.post('/', secureMiddleware.isAuthenticated, paymentsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, paymentsController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, paymentsController.delete);

module.exports = router;
