const {Products} = require("../../database/models")

const productsServices = {
    getAllProducts: () => {
        return Products.findAll()
    }
}

module.exports = productsServices