const {Router} = require("express")
const router = Router()
const carritoController = require("../controllers/carritoController")
const authMiddleware = require("../middlewares/authMiddleware")
const shipmentDataMiddleware = require("../middlewares/shipmentDataMiddleware")

router.get("/carrito", authMiddleware, carritoController.carrito)
router.post("/carrito/:productId", authMiddleware, carritoController.carritoProcess)
router.delete("/carrito/borrar/:productId/:productTalle", authMiddleware, carritoController.carritoDeleteProduct)
router.post("/carrito/compra/transferencia/:userId", authMiddleware, carritoController.carritoGenerateOrder)

module.exports = router