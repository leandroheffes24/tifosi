const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
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

    crearProductoProcess: async (req, res) => {
        let errors = validationResult(req)

        if(errors.errors.length > 0){
            return res.render("productCreate", {errors: errors.mapped(), oldData: req.body})
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
        return res.redirect("/")
    }
}