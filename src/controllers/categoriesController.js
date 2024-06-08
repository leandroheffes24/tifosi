const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")

module.exports = {
    categoryProducts: async (req, res) => {
        const categoryName = req.params.categoryName
        const categoryId = await categoriesServices.getCategoryId(categoryName)
        const categoryProducts = await productsServices.getCategoryProducts(categoryId)
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryPage", {categoryProducts: categoryProducts, categoryName: categoryName, categories: categories})
    },

    crearCategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryCreate", {categories})
    },

    crearSubcategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("subcategoryCreate", {categories})
    },

    editarCategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryEdit", {categories})
    },

    editarSubcategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const subcategories = await categoriesServices.getAllSubcategories()
        return res.render("subcategoryEdit", {categories, subcategories})
    },

    eliminarCategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryDelete", {categories})
    },

    crearCategoriaProcess: async (req, res) => {
        const newCategory = req.body.newCategory
        const lastCategory = await categoriesServices.getLastCategory()
        const newCategoryId = lastCategory.id + 1
        categoriesServices.createCategory(newCategory, newCategoryId)
        return res.redirect("/")
    },

    crearSubcategoriaProcess: async (req, res) => {
        const newSubcategoryName = req.body.newSubcategory
        const categoryForNewSubcategory = req.body.categoryForSubcategory
        const categoryForNewSubcategoryId = await categoriesServices.getCreateProductCategoryId(categoryForNewSubcategory)
        const lastSubcategory = await categoriesServices.getLastSubCategory()
        const newSubcategoryId = lastSubcategory.id + 1
        categoriesServices.createSubcategory(newSubcategoryId, newSubcategoryName, categoryForNewSubcategoryId)
        return res.redirect("/")
    },

    editarCategoriaId: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const categoryToEditId = req.params.categoryId
        const categoryToEdit = await categoriesServices.getCategoryById(categoryToEditId)
        return res.render("categoryEditForm", {categories: categories, categoryToEdit: categoryToEdit})
    },

    editarSubcategoriaId: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const subcategoryToEditId = req.params.subcategoryId
        const subcategoryToEdit = await categoriesServices.getSubcategoryById(subcategoryToEditId)
        return res.render("subcategoryEditForm", {categories, subcategoryToEdit})
    },

    editarCategoriaProcess: (req, res) => {
        const categoryToEditId = req.params.categoryId
        const newCategoryName = req.body.newCategoryName
        categoriesServices.editCategory(categoryToEditId, newCategoryName)
        return res.redirect("/")
    },

    editarSubcategoriaProcess: (req, res) => {
        const subcategoryToEditId = req.params.subcategoryId
        const newSubcategoryName = req.body.newSubcategoryName
        categoriesServices.editSubcategory(subcategoryToEditId, newSubcategoryName)
        return res.redirect("/")
    },

    eliminarCategoriaProcess: (req, res) => {
        const categoryToDeleteId = req.params.categoryId
        categoriesServices.deleteCategory(categoryToDeleteId)
        return res.redirect("/")
    }
}