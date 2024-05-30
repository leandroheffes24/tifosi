const {Router} = require("express")
const usersController = require("../controllers/usersController")
const router = Router()

router.get("/registro", usersController.registro)
router.get("/ingresar", usersController.ingresar)

module.exports = router