const { ProductAssets, Product } = require('../models');

class AssetsController {
    allAssets = async (req, res) => {
        try {
            const allAssets = await ProductAssets.findAll({
                include: {
                    model: Product,
                    as: 'product',
                    attributes: ['name']
                }
            })

            res.status(200).json({
                data: allAssets
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    getAsset = async (req, res) => {
        const { id } = req.params;
        try {
            const getAsset = await ProductAssets.findOne({
                include: {
                    model: Product,
                    attributes: ['name']
                },
                where: { id },
            });
            res.status(200).json({
                data: getAsset
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }

    createAsset = async (req, res) => {
        const images = req.files;
        const { product_id } =  req.body;
        let allAssets = [];
        images.forEach(asset => {
            const file = asset.originalname.split('.');
            const filename = file[0];
            const extension = file[1];
            const obj = {
                product_id: product_id, 
                image: `${filename.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '-').toLowerCase()}.${extension}` 
            }
            allAssets.push(obj);
        })
        try {
            const assets = await ProductAssets.bulkCreate(allAssets);
            res.status(200).json({
                message: 'add data successfully',
                data: assets
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updateAsset = async (req, res) => {
        const { id } = req.params;
        const { product_id } = req.body;
        const image = req.file;
        
        try {
            const file = image.originalname.split('.');
            const filename = file[0];
            const extension = file[1];
            await ProductAssets.update({
                product_id: product_id,
                image: `${filename.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '-').toLowerCase()}.${extension}`
            }, {
                where: { 
                    id: id
                }
            })
            const updatedAsset = await ProductAssets.findOne({
                where: {
                    id: id
                }
            });
            res.status(200).json({
                message : 'update data successfully',
                data: updatedAsset
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    deleteAsset = async (req, res) => {
        try {            
            const { id } = req.params;
            await ProductAssets.destroy({
                where: {
                    id : id
                }
            });
            res.status(200).json({
                message : 'delete data successfully'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    createAssetByProductId = async (req, res) => {
        const { product_id } = req.params;
        const images = req.files;
        let allAssets = [];
        images.forEach(asset => {
            const obj = {
                product_id: product_id, 
                image: asset.originalname 
            }
            allAssets.push(obj);
        })
        try {
            const assets = await ProductAssets.bulkCreate(allAssets);
            res.send(assets);
        } catch (error) {
            res.send(error);
        }
    }
}

module.exports = AssetsController;