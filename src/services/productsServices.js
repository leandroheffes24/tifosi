const {Products} = require("../../database/models")
const {Products_talles} = require("../../database/models")
const {Products_images} = require("../../database/models")
const {Products_prints} = require("../../database/models")
const {Print_price} = require("../../database/models")
const { Op } = require('sequelize');

const productsServices = {
    getAllProducts: () => {
        return Products.findAll({
            include: [{
                model: Products_images,
                as: 'images',
                attributes: ['image'],
                limit: 1
            }],
            limit: 48,
            order: [["created_at", "DESC"]]
        });
    },

    getCategoryProducts: async (categoryId) => {
        const products = await Products.findAll({
            include: [{
                model: Products_images,
                as: 'images',
                attributes: ['image'],
                limit: 1
            }]
        })
        const categoryProducts = await products.filter(product => product.category_id == categoryId)
        return categoryProducts
    },

    getLastProduct: () => {
        return Products.findOne({
            order: [["created_at", "DESC"]]
        })
    },

    getProductById: (productId) => {
        return Products.findByPk(productId, {
            include: [
                {
                    model: Products_images,
                    as: 'images',
                    attributes: ['image']
                },
                {
                    model: Products_prints,
                    as: 'prints',
                    attributes: ['print']
                }
            ]
        })
    },

    createProduct: (newProduct) => {
        return Products.create({
            price: newProduct.price,
            stock: newProduct.stock,
            product_name: newProduct.product_name,
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
            stock: newProduct.stock
        }, {
            where: {id: productToEditId}
        })
    },

    deleteProduct: (productToDeleteId) => {
        return Products.destroy({
            where: {id: productToDeleteId}
        })
    },

    deleteProductSizes: (productToDeleteId) => {
        return Products_talles.destroy({
            where: {product_id: productToDeleteId}
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
    },

    getProductsBySearch: (search) => {
        return Products.findAll({
            include: [{
                model: Products_images,
                as: 'images',
                attributes: ['image'],
                limit: 1
            }],
            where: {
                product_name: {
                    [Op.like]: `%${search}%`
                }
            }
        });
    },

    getAllProductsImages: () => {
        return Products_images.findAll()
    },

    createImageProduct: (productImage, lastProductId) => {
        return Products_images.create({
            product_id: lastProductId,
            image: productImage
        })
    },

    deleteProductImages: (productToDeleteId) => {
        return Products_images.destroy({
            where: {product_id: productToDeleteId}
        })
    },

    createProductPrint: (productPrint, lastProductId) => {
        return Products_prints.create({
            product_id: lastProductId,
            print: productPrint
        })
    },

    getPrintPrice: () => {
        return Print_price.findByPk(1)
    },

    editPrintPirce: (newPrintPrice) => {
        return Print_price.update({
            price: newPrintPrice
        }, {
            where: {id: 1}
        })
    }
}

module.exports = productsServices