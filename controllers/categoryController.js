const { Category, Product } = require('../models');

class CategoryController {

    allCategories = async (req, res) => {
        try {
            const allCategories = await Category.findAll({
                include: [{
                    model: Product,
                    as: 'products'
                }]
            });
            if(allCategories === null) res.status(404).json({ message: 'Data not found' })
            res.status(200).json({
                data: allCategories
            })
        } catch (error) {
            res.status(500).json(error)
        }
    }

    createCategory = async (req, res) => {
        const { name } = req.body;
        try {
            const category = await Category.create({
                name: name
            })
            res.status(200).json({
                message: "Category created successfully!",
                data: category
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }

    updateCategory = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await Category.update({ 
                name: name 
            }, { where: {
                  id: id
                }
            });
            res.status(200).json({
                message : 'update data successfully'
            });
        } catch (error) {
            res.status(500).json(error);
        }
    }

    deleteCategory = async(req, res) => {
        try {
            const { id } = req.params;
            await Category.destroy({
                where: {
                  id: id
                }
              });
            res.status(200).json({
                message: 'delete data successfully'
            })
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports =  CategoryController;