const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
const tallesServices = require("../services/tallesServices")
const {validationResult} = require("express-validator")

module.exports = {
    index: async (req, res) => {
        const products = await productsServices.getAllProducts()
        const categories = await categoriesServices.getAllCategories()
        return res.render("index", {products: products, categories: categories})
    },

    crear: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("crear", {categories})
    },
    
    crearProducto: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("productCreate", {categories})
    },

    crearProductoSubcategoria: async (req, res) => {
        const productId = req.params.productId
        const categories = await categoriesServices.getAllCategories()
        const subcategories = await categoriesServices.getAllSubcategories()
        return res.render("productCreateSubcategory", {subcategories: subcategories, categories: categories, productId: productId})
    },

    crearCategoria: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryCreate", {categories})
    },

    crearTalle: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("talleCreate", {categories})
    },

    crearProductoProcess: async (req, res) => {
        let errors = validationResult(req)
        const categories = await categoriesServices.getAllCategories()

        if(errors.errors.length > 0){
            return res.render("productCreate", {errors: errors.mapped(), oldData: req.body, categories: categories})
        }

        let lastProduct = await productsServices.getLastProduct()
        let categoryName = req.body.category
        let categoryId = await categoriesServices.getCreateProductCategoryId(categoryName)

        let newProduct = {
            id: (lastProduct.id) + 1,
            product_name: req.body.product_name,
            price: req.body.price,
            discount: req.body.discount,
            image: req.file.filename,
            category_id: categoryId
        }

        productsServices.createProduct(newProduct)
        return res.redirect("/crear/producto-subcategoria/" + newProduct.id)
    },

    crearProductoSubcategoriaProcess: async (req, res) => {
        const productId = req.params.productId
        const subcategorySelected = req.body.subcategory
        const subcategorySelectedId = await categoriesServices.getCreateProductSubcategoryId(subcategorySelected)
        productsServices.createProductSubcategory(subcategorySelectedId, productId)
        return res.redirect("/")
    },

    crearCategoriaProcess: async (req, res) => {
        const newCategory = req.body.newCategory
        const lastCategory = await categoriesServices.getLastCategory()
        const newCategoryId = lastCategory.id + 1
        categoriesServices.createCategory(newCategory, newCategoryId)
        return res.redirect("/")
    },

    crearTalleProcess: async (req, res) => {
        const newTalle = req.body.newTalle
        const lastTalle = await tallesServices.getLastTalle()
        const newTalleId = lastTalle.id + 1
        tallesServices.createTalle(newTalle, newTalleId)
        return res.redirect("/")
    }
}