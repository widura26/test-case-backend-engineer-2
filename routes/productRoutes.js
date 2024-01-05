const express = require('express');
const ProductController = require('../controllers/ProductController.js');
const multer = require('multer');
const crypto = require('crypto');
const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads')
        },
        filename: function (req, file, cb) {
            const mime = file.originalname.split('.')[1];
            const files = `${crypto.randomBytes(8).toString('hex')}.${mime}`
            cb(null, files)
        }
    }),
});

router.get('/products', new ProductController().getProducts);
router.post('/products/create', upload.array('assets', 10), new ProductController().createProduct);
router.patch('/products/update/:id', new ProductController().updateProduct);
router.delete('/products/delete/:id', new ProductController().deleteProduct);

module.exports =  router;