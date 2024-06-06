const categoriesServices = require("../services/categoriesServices")
const productsServices = require("../services/productsServices")
const {validationResult} = require("express-validator")

module.exports = {
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

    crearProductoSubcategoriaProcess: async (req, res) => {
        const productId = req.params.productId
        const subcategorySelected = req.body.subcategory
        const subcategorySelectedId = await categoriesServices.getCreateProductSubcategoryId(subcategorySelected)
        productsServices.createProductSubcategory(subcategorySelectedId, productId)
        return res.redirect("/")
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
    }
}