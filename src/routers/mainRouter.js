const {Router} = require("express")
const router = Router()
const mainController = require("../controllers/mainController")

router.get("/", mainController.index)
router.get("/crear", mainController.crear)

module.exports = router