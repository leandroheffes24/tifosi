const {Categories} = require("../../database/models")

const categoriesServices = {
    getAllCategories: () => {
        return Categories.findAll()
    }
}

module.exports = categoriesServices