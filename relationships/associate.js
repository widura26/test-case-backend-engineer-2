const { Category, Product, sequelize } = require('../models');

const Category = sequelize.define("Category");
const Product = sequelize.define("Product");

Category.hasMany(Product);
Product.belongsTo(Category, {
    foreignKey: "category_id",
});