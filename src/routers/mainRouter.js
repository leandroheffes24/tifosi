const {Router} = require("express")
const router = Router()
const mainController = require("../controllers/mainController")
const adminMiddleware = require("../middlewares/adminMiddleware")

router.get("/", mainController.index)
router.get("/crear", adminMiddleware, mainController.crear)

module.exports = router