const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")
const carritoServices = require("../services/carritoServices")
const usersServices = require("../services/usersServices")
const mercadopago = require("mercadopago")
require('dotenv').config();

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

            console.log("print =>>>>>>> ", req.body.productPrint);
    
            carritoServices.addProductToCart(userId, productId, productToCart, req.body.productQuantity, req.body.productDetailSize, req.body.productPrint)
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
        const userProducts = await carritoServices.getUserProducts(userId)
        let orderDetail = ""
        await userProducts.map(product => {
            orderDetail = orderDetail.concat(" / " + product.product_name)
            orderDetail = orderDetail.concat(" - " + product.quantity)
            orderDetail = orderDetail.concat(" - " + product.talle)
            orderDetail = orderDetail.concat(" - " + product.product_print)
        })

        await carritoServices.createOrder(userId, totalPrice, user.name, user.last_name, orderDetail, user.country, user.province, user.city, user.address, user.cp, user.dni, user.phone)
        return res.redirect("/ordenes")
    },

    createOrder: async (req, res) => {
        const userId = req.params.userId
        const user = await usersServices.getUserById(userId)
        const totalPrice = parseFloat(req.params.totalPrice)
        const userProducts = await carritoServices.getUserProducts(userId)
        let orderDetail = ""
        await userProducts.map(product => {
            orderDetail = orderDetail.concat(" / " + product.product_name)
            orderDetail = orderDetail.concat(" - " + product.quantity)
            orderDetail = orderDetail.concat(" - " + product.talle)
            orderDetail = orderDetail.concat(" - " + product.product_print)
        })
        await carritoServices.createOrder(userId, totalPrice, user.name, user.last_name, orderDetail, user.country, user.province, user.city, user.address, user.cp, user.dni, user.phone)

        mercadopago.configure({
            access_token: process.env.MERCADOPAGO_TOKEN
        })

        const result = await mercadopago.preferences.create({
            items: [
                {
                    title: "COMPRA TIFOSI",
                    unit_price: totalPrice,
                    currency_id: "ARS",
                    quantity: 1,
                },
            ],
            back_urls: {
                success: "https://localhost:3999/success",
                failure: "https://localhost:3999/failure",
                pending: "https://localhost:3999/pending"
            },
            notification_url: "https://0c1e-181-31-151-23.ngrok-free.app/webhook"
        })

        res.redirect(result.body.init_point)
    },

    reciveWebhook: async (req, res) => {
        const payment = req.query

        if(payment.type == "payment"){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
        } else {
            console.log("ha ocurrido un error");
        }
    }
}