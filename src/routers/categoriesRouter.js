const {Router} = require("express")
const categoriesController = require("../controllers/categoriesController")
const router = Router()

router.get("/categories/:categoryName", categoriesController.categoryProducts)

module.exports = router