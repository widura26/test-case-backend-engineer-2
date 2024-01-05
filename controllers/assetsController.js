const { ProductAssets, Product } = require('../models');

class AssetsController {
    getAssets = async (req, res) => {
        try {
            const allAssets = await ProductAssets.findAll({
                include: {
                    model: Product,
                    // as: 'product',
                    attributes: ['name']
                }
            })

            res.send(allAssets);
        } catch (error) {
            res.send(error);
        }
    }
    createAsset = async (req, res) => {
        const { product_id, image } =  req.body;
        try {
            const assets = await ProductAssets.create({
                product_id: product_id,
                image: image
            })
            res.send(assets);
        } catch (error) {
            res.send(error);
        }
    }

    updateAsset = async (req, res) => {
        const { id } = req.params;
        const { product_id, image } = req.body;
        
        try {
            const update = await ProductAssets.update({
                product_id: product_id,
                image: image
            }, {
                where: { 
                    id: id
                }
            })
            res.send('Berhasil diupdate');
        } catch (error) {
            res.send(error);
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
            res.send("Sukses menghapus data");
        } catch (error) {
            res.send(error);
        }

    }
}

module.exports = AssetsController;