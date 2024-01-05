const { Category } = require('../models');

class CategoryController {

    allCategories = async (req, res) => {
        try {
            const allCategories = await Category.findAll();
            res.send(allCategories);
        } catch (error) {
            res.send(error);
        }
    }

    createCategory = async (req, res) => {
        const { name } = req.body;
        try {
            const category = await Category.create({
                name: name
            })
            res.send(category);
        } catch (error) {
            console.log(error);
        }
    }

    updateCategory = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        try {
            const category = await Category.update({ 
                    name: name 
                }, {
                where: {
                  id: id
                }
            });
            res.send('Berhasil diupdate');
        } catch (error) {
            res.send(error)
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
            res.send({
                message: 'delete data category successfully'
            })
        } catch (error) {
            res.send('sorry, something went wrong');
        }
    }
}

module.exports =  CategoryController;