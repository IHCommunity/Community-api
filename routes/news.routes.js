const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const idMiddleware = require('../middleware/id.middleware');
const secureMiddleware = require('../middleware/secure.middleware');

router.get('/', secureMiddleware.isAuthenticated, newsController.list);
router.get('/checked', secureMiddleware.isAuthenticated, newsController.listChecked);
router.get('/unchecked', secureMiddleware.isAuthenticated, newsController.listUnchecked);
router.get('/:id', idMiddleware.checkValidId, newsController.get);
router.post('/', secureMiddleware.isAuthenticated, newsController.create);
router.put('/:id', secureMiddleware.isAuthenticated, newsController.edit);
router.put('/:id/check', secureMiddleware.isAuthenticated, newsController.check);
router.delete('/:id', secureMiddleware.isAuthenticated, idMiddleware.checkValidId, newsController.delete);

module.exports = router;
