const express = require('express');
const AssetsController = require('../controllers/assetsController.js');
const router = express.Router();

router.get('/assets', new AssetsController().getAssets);
router.post('/assets/create', new AssetsController().createAsset);
router.patch('/assets/update/:id', new AssetsController().updateAsset);
router.delete('/assets/delete/:id', new AssetsController().deleteAsset);

module.exports = router;