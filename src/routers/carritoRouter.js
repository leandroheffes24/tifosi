const {Router} = require("express")
const router = Router()
const carritoController = require("../controllers/carritoController")
const authMiddleware = require("../middlewares/authMiddleware")
const shipmentDataMiddleware = require("../middlewares/shipmentDataMiddleware")

router.get("/carrito", authMiddleware, carritoController.carrito)
router.post("/carrito/:productId", authMiddleware, carritoController.carritoProcess)
router.delete("/carrito/borrar/:productId/:productTalle", authMiddleware, carritoController.carritoDeleteProduct)
router.post("/carrito/compra/transferencia/:userId/:totalPrice", authMiddleware, shipmentDataMiddleware, carritoController.carritoGenerateOrder)

router.get("/create-order", (req, res) => res.send("creating order"))
router.get("/success", (req, res) => res.send("success"))
router.get("/webhook", (req, res) => res.send("webhook"))

module.exports = router