const {Router} = require("express")
const usersController = require("../controllers/usersController")
const router = Router()
const registerValidations = require("../validations/registerValidations")
const authMiddleware = require("../middlewares/authMiddleware")
const guestMiddleware = require("../middlewares/guestMiddleware")

router.get("/registro", guestMiddleware, usersController.registro)
router.post("/registro", guestMiddleware, registerValidations, usersController.registroProcess)
router.get("/ingresar", guestMiddleware, usersController.ingresar)
router.post("/ingresar", guestMiddleware, usersController.ingresarProcess)
router.get("/perfil", authMiddleware, usersController.profile)

module.exports = router