const {Router} = require("express")
const router = Router()
const carritoController = require("../controllers/carritoController")
const authMiddleware = require("../middlewares/authMiddleware")
const shipmentDataMiddleware = require("../middlewares/shipmentDataMiddleware")

router.get("/carrito", authMiddleware, carritoController.carrito)
router.post("/carrito/:productId", authMiddleware, carritoController.carritoProcess)
router.delete("/carrito/borrar/:productId/:productTalle", authMiddleware, carritoController.carritoDeleteProduct)
router.post("/carrito/compra/transferencia/:userId/:totalPrice", authMiddleware, shipmentDataMiddleware, carritoController.carritoGenerateOrder)
router.post("/carrito/compra/creditodebito/:userId/:totalPrice", authMiddleware, shipmentDataMiddleware, carritoController.createOrder)

router.get("/success", (req, res) => res.send("success"))
router.get("/failure", (req, res) => res.send("failure"))
router.get("/pending", (req, res) => res.send("pending"))
router.post("/webhook", carritoController.reciveWebhook)

module.exports = router