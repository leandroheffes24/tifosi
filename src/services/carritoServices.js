const {Shopping_cart} = require("../../database/models")

const carritoServices = {
    getUserProducts: (userId) => {
        return Shopping_cart.findAll({
            where: {id_user: userId}
        })
    },

    addProductToCart: (userId, productId) => {
        return Shopping_cart.create({
            id_user: userId,
            id_product: productId
        })
    },

    deleteProductCart: (productIdToDelete, userId) => {
        return Shopping_cart.destroy({
            where: {
                id_user: userId,
                id_product: productIdToDelete
            }
        })
    }
}

module.exports = carritoServices