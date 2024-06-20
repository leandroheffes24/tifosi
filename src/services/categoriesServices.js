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

    getLastCategory: () => {
        return Categories.findOne({
            order: [["created_at", "DESC"]]
        })
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
    },

    createCategory: (newCategory) => {
        return Categories.create({
            name: newCategory
        })
    },

    createSubcategory: (newSubcategoryName, categoryForNewSubcategoryId) => {
        return Subcategories.create({
            name: newSubcategoryName,
            category_id: categoryForNewSubcategoryId
        })
    },

    getCategoryById: (categoryId) => {
        return Categories.findByPk(categoryId)
    },

    getSubcategoryById: (subcategoryId) => {
        return Subcategories.findByPk(subcategoryId)
    },

    editCategory: (categoryToEditId, newCategoryName) => {
        return Categories.update({
            name: newCategoryName
        }, {
            where: {id: categoryToEditId}
        })
    },

    editSubcategory: (subcategoryToEditId, newSubcategoryName) => {
        return Subcategories.update({
            name: newSubcategoryName
        }, {
            where: {id: subcategoryToEditId}
        })
    },

    deleteCategory: (categoryToDeleteId) => {
        return Categories.destroy({
            where: {id: categoryToDeleteId}
        })
    },

    deleteSubcategory: (subcategoryToDeleteId) => {
        return Subcategories.destroy({
            where: {id: subcategoryToDeleteId}
        })
    },

    getCategoryNameById: async (categoryId) => {
        const category = await Categories.findByPk(categoryId)
        return category.name
    },

    getSubcategoryNameById: async (subcategoryId) => {
        const subcategory = await Subcategories.findByPk(subcategoryId)
        return subcategory.name
    },

    getCategorySubcategories: async (categoryId) => {
        return Subcategories.findAll({
            where: {category_id: categoryId}
        })
    }
}

module.exports = categoriesServices