const {body} = require("express-validator")

module.exports = [
    body("country").notEmpty().withMessage("Debes ingresar tu nombre"),
    body("province").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("city").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("address").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("cp").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("dni").notEmpty().withMessage("Debes ingresar tu número de documento"),
    body("phone").notEmpty().withMessage("Debes ingresar un número de contacto")
]