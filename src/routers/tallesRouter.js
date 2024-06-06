const {Router} = require("express")
const router = Router()
const tallesController = require("../controllers/tallesController")

router.get("/crear/talle", tallesController.crearTalle)
router.post("/crear/talle", tallesController.crearTalleProcess)
router.get("/editar/talle", tallesController.editarTalle)
router.get("/editar/talle/:talleId", tallesController.editarTalleId)
router.put("/editar/talle/:talleId", tallesController.editarTalleProcess)
router.get("/eliminar/talle", tallesController.eliminarTalle)
router.delete("/eliminar/talle/:talleId", tallesController.eliminarTalleProcess)

module.exports = router