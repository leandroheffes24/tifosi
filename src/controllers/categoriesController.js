const productsServices = require("../services/productsServices")
const categoriesServices = require("../services/categoriesServices")

module.exports = {
    categoryProducts: async (req, res) => {
        const categoryName = req.params.categoryName
        const categoryId = await categoriesServices.getCategoryId(categoryName)
        const categoryProducts = await productsServices.getCategoryProducts(categoryId)
        const categories = await categoriesServices.getAllCategories()
        return res.render("categoryPage", {categoryProducts: categoryProducts, categoryName: categoryName, categories: categories})
    }
}