const {Router} = require("express")
const router = Router()
const tallesController = require("../controllers/tallesController")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.get("/crear/talle", adminMiddleware, tallesController.crearTalle)
router.post("/crear/talle", adminMiddleware, tallesController.crearTalleProcess)
router.get("/editar/talle", adminMiddleware, tallesController.editarTalle)
router.get("/editar/talle/:talleId", adminMiddleware, tallesController.editarTalleId)
router.put("/editar/talle/:talleId", adminMiddleware, tallesController.editarTalleProcess)
router.get("/eliminar/talle", adminMiddleware, tallesController.eliminarTalle)
router.delete("/eliminar/talle/:talleId", adminMiddleware, tallesController.eliminarTalleProcess)

module.exports = router