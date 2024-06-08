const {Router} = require("express")
const router = Router()
const productsController = require("../controllers/productsController")
const multerUpload = require("./multerConfigs/multerProductsConfig")
const crearProductsValidations = require("../validations/crearProductValidation")

router.get("/crear/producto", productsController.crearProducto)
router.get("/crear/producto-subcategoria/:productId", productsController.crearProductoSubcategoria)
router.put("/crear/producto-subcategoria/:productId", productsController.crearProductoSubcategoriaProcess)
router.post("/crear/producto", multerUpload.single("image"), crearProductsValidations, productsController.crearProductoProcess)
router.get("/productos/:productId", productsController.productDetail)

module.exports = router