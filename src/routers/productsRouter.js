const {Router} = require("express")
const router = Router()
const productsController = require("../controllers/productsController")
const multerUpload = require("./multerConfigs/multerProductsConfig")
const crearProductsValidations = require("../validations/crearProductValidation")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.get("/crear/producto", adminMiddleware, productsController.crearProducto)
router.get("/crear/producto-subcategoria/:productId", adminMiddleware, productsController.crearProductoSubcategoria)
router.put("/crear/producto-subcategoria/:productId", adminMiddleware, productsController.crearProductoSubcategoriaProcess)
router.post("/crear/producto", multerUpload.single("image"), crearProductsValidations, adminMiddleware, productsController.crearProductoProcess)
router.get("/productos/:productId", productsController.productDetail)
router.get("/editar/producto/:productId", adminMiddleware, productsController.editarProducto)
router.put("/editar/producto/:productId", adminMiddleware, productsController.editarProductoProcess)
router.delete("/borrar/producto/:productId", adminMiddleware, productsController.borrarProducto)

module.exports = router