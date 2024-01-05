'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductAssets extends Model {
    static associate(models) {
      ProductAssets.belongsTo(models.Product, {
        as: 'product',
        foreignKey: "product_id",
      });
      // Product.hasMany(models.ProductAssets, {
      //   as: 'assets',
      //   foreignKey: 'product_id',
      // });
    }
  }
  ProductAssets.init({
    product_id: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductAssets',
  });
  return ProductAssets;
};