const productsServices = require("../services/productsServices")

module.exports = {
    index: (req, res) => {
        return productsServices.getAllProducts().then(products => res.render("index", {products}))
    }
}