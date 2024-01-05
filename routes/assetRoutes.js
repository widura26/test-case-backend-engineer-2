const express = require('express');
const AssetsController = require('../controllers/assetsController.js');
const crypto = require('crypto');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const destinationPath = path.resolve(__dirname, '../uploads');
            cb(null, destinationPath);
        },
        filename: function (req, file, cb) {
            const fileOriginalName = file.originalname;
            const fileName = fileOriginalName.split('.')[0];
            const extension = fileOriginalName.split('.')[1];
            const slug = fileName.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '.').toLowerCase();
            const timeStamp = Date.now();
            cb(null, `${timeStamp}-${slug}.${extension}`);
        }
    }),
});

router.get('/assets', new AssetsController().allAssets);
router.get('/assets/asset/:id', new AssetsController().getAsset);
router.post('/assets/create', upload.array('images', 10), new AssetsController().createAsset);
router.patch('/assets/update/:id', upload.single('image'), new AssetsController().updateAsset);
router.delete('/assets/delete/:id', new AssetsController().deleteAsset);

router.post('/assets/create/:product_id', upload.array('images', 10), new AssetsController().createAssetByProductId);
module.exports = router;