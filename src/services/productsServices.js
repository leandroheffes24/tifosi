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
            order: [["creater_at", "DESC"]]
        })
    },

    createProduct: (newProduct) => {
        return Products.create({
            id: newProduct.id,
            price: newProduct.price,
            discount: newProduct.dicount,
            product_name: newProduct.product_name,
            image: newProduct.image,
            category_id: newProduct.categoryId
        })
    }
}

module.exports = productsServices