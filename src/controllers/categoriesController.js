const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
const tallesServices = require("../services/tallesServices")

module.exports = {
    categoryProducts: async (req, res) => {
        const categoryName = req.params.categoryName
        const categoryId = await categoriesServices.getCategoryId(categoryName)
        const categoryProducts = await productsServices.getCategoryProducts(categoryId)
        const categories = await categoriesServices.getAllCategories()
        const talles = await tallesServices.getAllTalles()
        const categorySubcategories = await categoriesServices.getCategorySubcategories(categoryId)
        return res.render("categoryPage", {categoryProducts, categoryName, categories, talles, categorySubcategories})
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

    eliminarSubcategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const subcategories = await categoriesServices.getAllSubcategories()
        return res.render("subcategoryDelete", {categories, subcategories})
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
        categoriesServices.createSubcategory(newSubcategoryName, categoryForNewSubcategoryId)
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
    },

    eliminarSubcategoriaProcess: (req, res) => {
        const subcategoryToDeleteId = req.params.subcategoryId
        categoriesServices.deleteSubcategory(subcategoryToDeleteId)
        return res.redirect("/")
    },

    categoryFilterProducts: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const allTalles = await tallesServices.getAllTalles()
        const categoryName = req.params.categoryName;
        const categoryId = await categoriesServices.getCategoryId(categoryName)
        const categorySubcategories = await categoriesServices.getCategorySubcategories(categoryId)
        const { subcategories, talles, minPrice, maxPrice } = req.query;
        
        let products = [];

        if (subcategories != undefined) {
            products = await productsServices.getSubcategoriesProducts(subcategories);
        }

        if (talles != undefined) {
            const productsByTalles = await tallesServices.getProductsFilteredByTalle(talles);
            products = products.filter(product => productsByTalles.some(talleProduct => talleProduct.id === product.id));
        }

        if (minPrice != "") {
            products = products.filter(product => product.price >= minPrice);
        }

        if (maxPrice != "") {
            products = products.filter(product => product.price <= maxPrice);
        }

        return res.render("categoryPage", {categoryProducts: products, categoryName, categories, talles: allTalles, categorySubcategories})

        // console.log("productos filtrados por subcategorias => ", productsFilteredBySubcategories);
        // console.log("subcategorias => ", subcategories);
        // console.log("talles => ", talles);
        // console.log("minPrice => ", minPrice);
        // console.log("maxPrice => ", maxPrice);
        // console.log("cateogry name => ", categoryName);
    }
}