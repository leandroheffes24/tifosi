const {Router} = require("express")
const mainController = require("../controllers/mainController")
const router = Router()

router.get("/", mainController.index)
router.get("/crear", mainController.crear)

module.exports = router