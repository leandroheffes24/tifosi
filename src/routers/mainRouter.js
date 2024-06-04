const {Router} = require("express")
const router = Router()
const mainController = require("../controllers/mainController")
const crearProductsValidations = require("../validations/crearProductValidation")
const multerUpload = require("./multerConfigs/multerUsersConfig")

router.get("/", mainController.index)
router.get("/crear", mainController.crear)
router.get("/crear/producto", mainController.crearProducto)
router.get("/crear/producto-subcategoria/:productId", mainController.crearProductoSubcategoria)
router.put("/crear/producto-subcategoria/:productId", mainController.crearProductoSubcategoriaProcess)
router.post("/crear/producto", multerUpload.single("image"), crearProductsValidations, mainController.crearProductoProcess)

module.exports = router