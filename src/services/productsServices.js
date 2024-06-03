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
}

module.exports = productsServices