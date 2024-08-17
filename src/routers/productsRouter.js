const {Router} = require("express")
const router = Router()
const productsController = require("../controllers/productsController")
const multerUpload = require("./multerConfigs/multerProductsConfig")
const crearProductsValidations = require("../validations/crearProductValidation")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.get("/crear/producto", adminMiddleware, productsController.crearProducto)
router.get("/crear/producto-subcategoria/:productId", adminMiddleware, productsController.crearProductoSubcategoria)
router.put("/crear/producto-subcategoria/:productId", adminMiddleware, productsController.crearProductoSubcategoriaProcess)
router.post("/crear/producto", multerUpload.fields([
    {name: 'image1', maxCount: 1},
    {name: 'image2', maxCount: 1},
    {name: 'image3', maxCount: 1},
    {name: 'image4', maxCount: 1},
    {name: 'image5', maxCount: 1},
    {name: 'image6', maxCount: 1},
    {name: 'image7', maxCount: 1},
    {name: 'image8', maxCount: 1},
    {name: 'image9', maxCount: 1},
    {name: 'image10', maxCount: 1}
]), crearProductsValidations, adminMiddleware, productsController.crearProductoProcess)
router.get("/productos/:productId", productsController.productDetail)
router.get("/editar/producto/:productId", adminMiddleware, productsController.editarProducto)
router.put("/editar/producto/:productId", adminMiddleware, productsController.editarProductoProcess)
router.delete("/borrar/producto/:productId", adminMiddleware, productsController.borrarProducto)
router.get("/busqueda", productsController.searchProductsProcess)
router.get("/editar/precio-estampado", adminMiddleware, productsController.editPrintPrice)
router.put("/editar/precio-estampado", adminMiddleware, productsController.editPrintPriceProcess)

module.exports = router