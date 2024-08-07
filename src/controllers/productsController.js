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
        const product = await productsServices.getProductById(productId)
        const subcategories = await categoriesServices.getCategorySubcategories(product.category_id)
        return res.render("productCreateSubcategory", {subcategories, categories, productId})
    },

    editarProducto: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const talles = await tallesServices.getAllTalles()
        const productToEditId = req.params.productId
        const product = await productsServices.getProductById(productToEditId)
        return res.render("productEditForm", {product, categories, talles})
    },

    productDetail: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const productId = req.params.productId
        const product = await productsServices.getProductById(productId)
        const productCategoryId = product.category_id
        const productSubcategoryId = product.subcategory_id
        const productTalles = await productsServices.getProductTalles(productId)
        const printPrice = await productsServices.getPrintPrice()
        
        let tallesNames = []
        await productTalles.forEach(async talle => {
            let talleSearched = await tallesServices.getTalleById(talle.talle_id)
            let talleName = talleSearched.name
            return tallesNames.push(talleName)
        })
        const categoryName = await categoriesServices.getCategoryNameById(productCategoryId)
        const subcategoryName = await categoriesServices.getSubcategoryNameById(productSubcategoryId)
        return res.render("productDetail", {categories, product, categoryName, subcategoryName, tallesNames, printPrice})
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

        let categoryName = req.body.category
        let categoryId = await categoriesServices.getCreateProductCategoryId(categoryName)

        let newProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock,
            category_id: categoryId
        }

        let productsTalles = req.body.talles

        await productsServices.createProduct(newProduct)

        let lastProduct = await productsServices.getLastProduct()
        let lastProductId = lastProduct.id
        
        for (let i = 1; i < 11; i++) {
            if (req.files[`image${i}`]) {
                await productsServices.createImageProduct(req.files[`image${i}`][0].filename, lastProductId)
            }

            if(req.body[`print${i}`] !== ""){
                await productsServices.createProductPrint(req.body[`print${i}`], lastProductId)
            }
        }

        await productsTalles.forEach(async talle => {
            let talleId = await tallesServices.getTalleId(talle)
            await productsServices.crearProductosTalles(lastProduct.id, talleId)
        });
        return res.redirect("/crear/producto-subcategoria/" + lastProductId)
    },

    editarProductoProcess: async (req, res) => {
        const productToEditId = req.params.productId

        const newProduct = {
            product_name: req.body.product_name,
            price: req.body.price,
            stock: req.body.stock
        }

        await productsServices.updateProduct(productToEditId, newProduct)
        return res.redirect("/")
    },

    borrarProducto: async (req, res) => {
        const productToDeleteId = req.params.productId
        productsServices.deleteProductSizes(productToDeleteId)
        productsServices.deleteProduct(productToDeleteId)
        productsServices.deleteProductImages(productToDeleteId)
        return res.redirect("/")
    },

    searchProductsProcess: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const search = req.query.busqueda
        const productsSearched = await productsServices.getProductsBySearch(search)
        return res.render("productsSearched", {categories, productsSearched})
    },
}