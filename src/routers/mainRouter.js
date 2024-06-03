const {Router} = require("express")
const router = Router()
const mainController = require("../controllers/mainController")
const crearProductsValidations = require("../validations/crearProductValidation")

router.get("/", mainController.index)
router.get("/crear", mainController.crear)
router.get("/crear/producto", mainController.crearProducto)
router.post("/crear/producto", crearProductsValidations, mainController.crearProductoProcess)

module.exports = router