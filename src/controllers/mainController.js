const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")

module.exports = {
    index: async (req, res) => {
        const products = await productsServices.getAllProducts()
        const categories = await categoriesServices.getAllCategories()
        return res.render("index", {products: products, categories: categories})
    },

    crear: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("crear", {categories})
    }
}