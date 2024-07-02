const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
const carritoServices = require("../services/carritoServices")
const usersServices = require("../services/usersServices")

module.exports = {
    carrito: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const user = req.session.userLoggedIn
        const userId = user.id
        const carritoProducts = await carritoServices.getUserProducts(userId)
        let totalPrice = 0
        let totalProducts = 0

        carritoProducts.map(product => {
            totalPrice = totalPrice + product.products_total_price
            totalProducts = totalProducts + product.quantity
        })

        return await res.render("carrito", {carritoProducts, categories, totalPrice, totalProducts})
    },

    carritoProcess: async (req, res) => {
        const user = req.session.userLoggedIn
        if(user){
            const userId = user.id
            const productId = req.params.productId
            const productToCart = await productsServices.getProductById(productId)
    
            carritoServices.addProductToCart(userId, productId, productToCart, req.body.productQuantity, req.body.productDetailSize)
            return res.redirect("/")   
        } else {
            return res.redirect("/ingresar")
        }
    },

    carritoDeleteProduct: async (req, res) => {
        const productIdToDelete = req.params.productId
        const productTalle = req.params.productTalle
        const user = req.session.userLoggedIn
        const userId = user.id
        await carritoServices.deleteProductCart(productIdToDelete, userId, productTalle)
        let totalPrice = 0
        let totalProducts = 0

        const categories = await categoriesServices.getAllCategories()
        const carritoProducts = await carritoServices.getUserProducts(userId)

        if(carritoProducts.length > 0){
            await carritoProducts.map(product => {
                totalPrice = totalPrice + product.products_total_price
                totalProducts = totalProducts + product.quantity
            })
        } else {
            totalPrice = totalPrice
            totalProducts = totalProducts
        }

        return res.render("carrito", {categories, carritoProducts, totalPrice, totalProducts})
    },

    carritoGenerateOrder: async (req, res) => {
        const userId = req.params.userId
        const user = await usersServices.getUserById(userId)
        const totalPrice = req.params.totalPrice
        carritoServices.createOrder(userId, totalPrice, user.name, user.last_name)
        return res.redirect("/ordenes")
    }
}