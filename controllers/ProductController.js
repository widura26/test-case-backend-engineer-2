const { Product, Category, ProductAssets } = require('../models');
const category = require('../models/category');
const product = require('../models/product');

class ProductController {
  getProducts = async (req, res) => {
    const { property, sorting  } = req.query;
    try {
      const products = await Product.findAll({
        order: [
          [property, sorting],
        ],
        include: [
          {
            model: Category,
            as: 'category'
          },
          {
            model: ProductAssets,
            as: 'assets'
          }
        ]
      })
      res.send(products);
    } catch (error) {
      res.send(error);
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
        price: price
      });
      res.send(createproduct);
      // await this.uploadfile(assets, createproduct);
    } catch (error) {
      res.send(error);
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
      res.send('Berhasil diupdate')
    } catch (error) {
      res.send(error)
    }
  }

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      await Product.destroy({
          where: {
            id: id
          }
        });
      res.send({
          message: 'delete data product successfully'
      })
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = ProductController;