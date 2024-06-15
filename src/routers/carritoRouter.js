const {Router} = require("express")
const router = Router()
const carritoController = require("../controllers/carritoController")
const authMiddleware = require("../middlewares/authMiddleware")

router.get("/carrito", authMiddleware, carritoController.carrito)
router.post("/carrito/:productId", authMiddleware, carritoController.carritoProcess)
router.delete("/carrito/borrar/:productId", authMiddleware, carritoController.carritoDeleteProduct)

module.exports = router