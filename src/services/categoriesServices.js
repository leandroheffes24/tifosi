const {Categories} = require("../../database/models")
const {Subcategories} = require("../../database/models")

const categoriesServices = {
    getAllCategories: () => {
        return Categories.findAll()
    },

    getAllSubcategories: () => {
        return Subcategories.findAll()
    },

    getCategoryId: async (categoryName) => {
        const categories = await Categories.findAll()
        const categorySelected = categories.filter(category => category.name.toLowerCase().replace(" ", "-") == categoryName)
        if(categorySelected[0] === undefined){
            return undefined
        } else {
            return categorySelected[0].dataValues.id
        }
    },

    getCreateProductCategoryId: async (categoryName) => {
        const categories = await Categories.findAll()
        const categorySelected = categories.filter(category => category.name == categoryName)
        if(categorySelected[0] === undefined){
            return undefined
        } else {
            return categorySelected[0].dataValues.id
        }
    },

    getCreateProductSubcategoryId: async (subcategoryName) => {
        const subcategories = await Subcategories.findAll()
        const subcategorySelected = subcategories.filter(subcategory => subcategory.name == subcategoryName)
        if(subcategorySelected[0] === undefined){
            return undefined
        } else {
            return subcategorySelected[0].dataValues.id
        }
    }
}

module.exports = categoriesServices