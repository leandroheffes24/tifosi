const {Products} = require("../../database/models")

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
    }
}

module.exports = productsServices