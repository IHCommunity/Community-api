const express = require('express');
const router = express.Router();
const rulesController = require('../controllers/rules.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', rulesController.list);
router.get('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, rulesController.get);
router.post('/', secureMiddleware.isAuthenticated, rulesController.create);
router.put('/:id', secureMiddleware.isAuthenticated, rulesController.edit);
router.delete('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, rulesController.delete);

module.exports = router;