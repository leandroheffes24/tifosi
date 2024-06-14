const categoriesServices = require("../services/categoriesServices")
const productsServices = require("../services/productsServices")
const tallesServices = require("../services/tallesServices")
const {validationResult} = require("express-validator")

module.exports = {
    crearProducto: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const talles = await tallesServices.getAllTalles()
        return res.render("productCreate", {categories, talles})
    },

    crearProductoSubcategoria: async (req, res) => {
        const productId = req.params.productId
        const categories = await categoriesServices.getAllCategories()
        const subcategories = await categoriesServices.getAllSubcategories()
        return res.render("productCreateSubcategory", {subcategories: subcategories, categories: categories, productId: productId})
    },

    editarProducto: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const productToEditId = req.params.productId
        const product = await productsServices.getProductById(productToEditId)
        return res.render("productEditForm", {product, categories})
    },

    productDetail: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const productId = req.params.productId
        const product = await productsServices.getProductById(productId)
        const productCategoryId = product.category_id
        const productSubcategoryId = product.subcategory_id
        const productTalles = await productsServices.getProductTalles(productId)
        let tallesNames = []
        await productTalles.forEach(async talle => {
            let talleSearched = await tallesServices.getTalleById(talle.talle_id)
            let talleName = talleSearched.name
            return tallesNames.push(talleName)
        })
        const categoryName = await categoriesServices.getCategoryNameById(productCategoryId)
        const subcategoryName = await categoriesServices.getSubcategoryNameById(productSubcategoryId)
        return res.render("productDetail", {categories, product, categoryName, subcategoryName, tallesNames})
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
        const talles = await tallesServices.getAllTalles()

        if(errors.errors.length > 0){
            return res.render("productCreate", {errors: errors.mapped(), oldData: req.body, categories, talles})
        }

        let lastProduct = await productsServices.getLastProduct()
        let categoryName = req.body.category
        let categoryId = await categoriesServices.getCreateProductCategoryId(categoryName)

        let newProduct = {
            id: (lastProduct.id) + 1,
            product_name: req.body.product_name,
            price: req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            image: req.file.filename,
            category_id: categoryId
        }

        let productsTalles = req.body.talles

        productsServices.createProduct(newProduct)
        productsTalles.forEach(async talle => {
            let talleId = await tallesServices.getTalleId(talle)
            console.log("talle id => ", talleId);
            await productsServices.crearProductosTalles(newProduct.id, talleId)
        });
        return res.redirect("/crear/producto-subcategoria/" + newProduct.id)
    },

    editarProductoProcess: (req, res) => {
        const productToEditId = req.params.productId
        const newProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            discount: req.body.discount
        }
        console.log("nuevo producto => ", newProduct);
        productsServices.updateProduct(productToEditId, newProduct)
        return res.redirect("/")
    },

    borrarProducto: (req, res) => {
        const productToDeleteId = req.params.productId
        productsServices.deleteProduct(productToDeleteId)
        return res.redirect("/")
    }
}