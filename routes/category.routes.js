const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middlewares/auth.middleware.js');

router.post('/category', verifyToken, categoryController.createCategory);
router.get('/categories', verifyToken, categoryController.getCategories);
router.put('/category/:categoryId', verifyToken, categoryController.updateCategory);
router.delete('/category/:categoryId', verifyToken, categoryController.deleteCategory);

module.exports = router