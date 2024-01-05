const express = require('express');
const CategoryController = require('../controllers/categoryController.js');
const router = express.Router();

router.get('/categories', new CategoryController().allCategories);
router.post('/create', new CategoryController().createCategory);
router.patch('/update/:id', new CategoryController().updateCategory);
router.delete('/delete/:id', new CategoryController().deleteCategory);

module.exports =  router;