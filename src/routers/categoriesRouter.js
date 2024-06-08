const {Router} = require("express")
const categoriesController = require("../controllers/categoriesController")
const router = Router()

router.get("/categories/:categoryName", categoriesController.categoryProducts)
router.get("/crear/categoria", categoriesController.crearCategoria)
router.post("/crear/categoria", categoriesController.crearCategoriaProcess)
router.get("/editar/categoria", categoriesController.editarCategoria)
router.get("/editar/categoria/:categoryId", categoriesController.editarCategoriaId)
router.put("/editar/categoria/:categoryId", categoriesController.editarCategoriaProcess)
router.get("/eliminar/categoria", categoriesController.eliminarCategoria)
router.delete("/eliminar/categoria/:categoryId", categoriesController.eliminarCategoriaProcess)
router.get("/crear/subcategoria", categoriesController.crearSubcategoria)
router.post("/crear/subcategoria", categoriesController.crearSubcategoriaProcess)

module.exports = router