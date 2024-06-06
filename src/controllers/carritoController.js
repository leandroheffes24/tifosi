const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
const carritoServices = require("../services/carritoServices")

module.exports = {
    carrito: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const user = req.session.userLoggedIn
        const userId = user.id
        const carritoProducts = await carritoServices.getUserProducts(userId)

        const finalProducts = await Promise.all(
            carritoProducts.map(async product => {
                return await productsServices.getProductById(product.id_product)
            })
        )

        return await res.render("carrito", {finalProducts, categories})
    },

    carritoProcess: async (req, res) => {
        const user = req.session.userLoggedIn
        const userId = user.id
        const productId = req.params.productId

        carritoServices.addProductToCart(userId, productId)
        return res.redirect("/")
    },

    carritoDeleteProduct: async (req, res) => {
        const productIdToDelete = req.params.productId
        const user = req.session.userLoggedIn
        const userId = user.id
        carritoServices.deleteProductCart(productIdToDelete, userId)

        const categories = await categoriesServices.getAllCategories()
        const carritoProducts = await carritoServices.getUserProducts(userId)
        const finalProducts = await Promise.all(
            carritoProducts.map(async product => {
                return await productsServices.getProductById(product.id_product)
            })
        )
        return res.render("carrito", {categories, finalProducts})
    }
}