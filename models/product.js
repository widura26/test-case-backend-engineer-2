'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'category_id',
      });
      Product.hasMany(models.ProductAssets, {
        as: 'assets',
        foreignKey: 'product_id',
      });
    }
  }
  Product.init({
    category_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};