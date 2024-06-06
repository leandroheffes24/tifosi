const {Router} = require("express")
const router = Router()
const carritoController = require("../controllers/carritoController")

router.get("/carrito", carritoController.carrito)
router.post("/carrito/:productId", carritoController.carritoProcess)
router.delete("/carrito/borrar/:productId", carritoController.carritoDeleteProduct)

module.exports = router