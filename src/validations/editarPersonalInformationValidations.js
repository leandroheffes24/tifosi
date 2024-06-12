const {body} = require("express-validator")

module.exports = [
    body("name").notEmpty().withMessage("Debes ingresar tu nombre"),
    body("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("email").notEmpty().withMessage("Debes ingresar tu mail").isEmail().withMessage("Debes ingresar un mail válido")
]