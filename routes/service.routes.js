const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');
const { verifyToken } = require('../middlewares/auth.middleware.js');

router.post('/category/:categoryId/service', verifyToken, serviceController.createService);
router.get('/category/:categoryId/services', verifyToken, serviceController.getServices);
router.put('/category/:categoryId/service/:serviceId', verifyToken, serviceController.updateService);
router.delete('/category/:categoryId/service/:serviceId', verifyToken, serviceController.deleteService);

module.exports = router;