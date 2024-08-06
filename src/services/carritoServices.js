const {Shopping_cart} = require("../../database/models")
const {Products_images} = require("../../database/models")
const {Products} = require("../../database/models")
const {Orders} = require("../../database/models")

const carritoServices = {
    getUserProducts: (userId) => {
        return Shopping_cart.findAll({
            include: [
                {
                    model: Products,
                    as: 'product',
                    include: [{
                        model: Products_images,
                        as: 'images',
                        attributes: ['image'],
                        limit: 1
                    }]
                }
            ],
            where: {id_user: userId}
        })
    },

    addProductToCart: (userId, productId, productToCart, quantity, talle, print) => {
        return Shopping_cart.create({
            id_user: userId,
            id_product: productId,
            product_name: productToCart.product_name,
            product_price: productToCart.price,
            products_total_price: productToCart.price * quantity,
            product_discount: productToCart.discount,
            product_print: print,
            quantity: quantity,
            talle: talle
        })
    },

    deleteProductCart: (productIdToDelete, userId, talle) => {
        return Shopping_cart.destroy({
            where: {
                id_user: userId,
                id_product: productIdToDelete,
                talle: talle
            }
        })
    },

    createOrder: (userId, totalPrice, userName, userLastName, orderDetail, userCountry, userProvince, userCity, userAddress, userCp, userDni, userPhone) => {
        return Orders.create({
            user_id: userId,
            total_price: totalPrice,
            status: "pendiente",
            user_name: `${userName} ${userLastName}`,
            detail: orderDetail,
            country: userCountry,
            province: userProvince,
            city: userCity,
            address: userAddress,
            cp: userCp,
            dni: userDni,
            phone: userPhone
        })
    }
}

module.exports = carritoServices