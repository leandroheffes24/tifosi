const {Router} = require("express")
const usersController = require("../controllers/usersController")
const router = Router()
const registerValidations = require("../validations/registerValidations")

router.get("/registro", usersController.registro)
router.post("/registro", registerValidations, usersController.registroProcess)
router.get("/ingresar", usersController.ingresar)
router.post("/ingresar", usersController.ingresarProcess)

module.exports = router