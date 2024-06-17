const {Products} = require("../../database/models")
const {Products_talles} = require("../../database/models")
const { Op } = require('sequelize');

const productsServices = {
    getAllProducts: () => {
        return Products.findAll({
            limit: 48,
            order: [["created_at", "DESC"]]
        })
    },

    getCategoryProducts: async (categoryId) => {
        const products = await Products.findAll()
        const categoryProducts = await products.filter(product => product.category_id == categoryId)
        return categoryProducts
    },

    getLastProduct: () => {
        return Products.findOne({
            order: [["created_at", "DESC"]]
        })
    },

    getProductById: (productId) => {
        return Products.findByPk(productId)
    },

    createProduct: (newProduct) => {
        return Products.create({
            id: newProduct.id,
            price: newProduct.price,
            discount: newProduct.discount,
            product_name: newProduct.product_name,
            image: newProduct.image,
            category_id: newProduct.category_id
        })
    },

    createProductSubcategory: (subcategory, productId) => {
        return Products.update({
            subcategory_id: subcategory
        }, {
            where: {id: productId}
        })
    },

    updateProduct: (productToEditId, newProduct) => {
        return Products.update({
            product_name: newProduct.product_name,
            price: newProduct.price,
            discount: newProduct.discount
        }, {
            where: {id: productToEditId}
        })
    },

    deleteProduct: (productToDeleteId) => {
        return Products.destroy({
            where: {id: productToDeleteId}
        })
    },

    getFilterProducts: async (talles, minPrice, maxPrice, categoryId) => {
        const categoryProducts = await productsServices.getCategoryProducts(categoryId)
        const filterPriceProducts = categoryProducts.filter(product => product.price >= minPrice && product.price <= maxPrice)
    },

    crearProductosTalles: (productId, talleId) => {
        return Products_talles.create({
            product_id: productId,
            talle_id: talleId
        })
    },

    getProductTalles: (productId) => {
        return Products_talles.findAll({
            where: {product_id: productId}
        })
    },

    getSubcategoriesProducts: async (subcategories) => {
        return Products.findAll({
            where: {
                subcategory_id: {
                    [Op.in]: subcategories
                }
            }
        })
    }
}

module.exports = productsServices