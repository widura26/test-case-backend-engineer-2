const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const uploadFile = require('../middleware/multer.js');
const router = express.Router();



router.get('/products', new ProductController().allProducts);
router.get('/product/:id', new ProductController().getProduct);
router.post('/products/create', uploadFile.array('assets', 10), new ProductController().createProduct);
router.patch('/products/update/:id', new ProductController().updateProduct);
router.delete('/products/delete/:id', new ProductController().deleteProduct);

module.exports =  router;