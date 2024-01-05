const { Product, Category, ProductAssets } = require('../models');
const category = require('../models/category');
const product = require('../models/product');

class ProductController {
  getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findOne({
          include: [
            { model: Category, as:'category'},
            { model: ProductAssets, as: 'assets' }
          ],
          where: { id: id }
        })

        if(product === null) res.status(404).json({ message: 'data not found'});
        
        res.status(200).json({
          data: product
        });
    } catch (error) {
      res.status(500).json(error);
    }
  }
  allProducts = async (req, res) => {
    const { property, sorting  } = req.query;
    try {
      const products = await Product.findAll({
        order: [
          [property, sorting],
        ],
        include: [
          { model: Category, as: 'category' },
          { model: ProductAssets, as: 'assets' }
        ]
      })
      if(products === null) res.status(404).json({
        message: "Data Not Found"
      })
      res.status(200).json({
        data: products
      });
    } catch (error) {
      res.status(500).json(error);
    }
  } 

  createProduct = async (req, res) => {
    const assets = req.files;
    const { category_id, name, price} = req.body;
    const slug = name.replace(/[^\w\s]/gi, ' ').replace(/\s+/g, '-').toLowerCase();
    try {
      const createproduct = await Product.create({
        category_id: category_id,
        name: name,
        slug: slug,
        price: price,
      });
      await this.uploadfile(assets, createproduct);
      res.status(200).json({
        message: 'Add data successfully',
        data: createproduct
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  uploadfile = async (assets, createproduct) => {
    let allAssets = [];
    assets.forEach(asset => {
      const obj = {
        product_id: createproduct.dataValues.id,
        image: asset.originalname
      }
      allAssets.push(obj);
    })
    await ProductAssets.bulkCreate(allAssets);
  }

  updateProduct = async (req, res) => {
    const { id } = req.params;
    const { category_id, name, price } = req.body;
    const slug = name.split(" ").join("-").toLowerCase();
    try {
      const update = await Product.update({
        category_id: category_id,
        name: name,
        slug: slug,
        price: price
      }, {
        where:{
          id: id
        }
      })
      const updatedProduct = await Product.findOne({
        where: {
            id: id
        }
    });
      res.status(200).json({
        message: 'update data successfully',
        data: updatedProduct
      })
    } catch (error) {
      res.status(500).json(error);
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await Product.destroy({
          include: [ProductAssets],
          where: {
            id: id
          }
        });
      res.status(200).json({
          message: 'delete data product successfully'
      })
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = ProductController;