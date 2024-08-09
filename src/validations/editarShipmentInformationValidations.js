const {body} = require("express-validator")

module.exports = [
    body("country").notEmpty().withMessage("Debes ingresar tu país"),
    body("city").notEmpty().withMessage("Debes ingresar tu ciudad"),
    body("address").notEmpty().withMessage("Debes ingresar tu dirección"),
    body("cp").notEmpty().withMessage("Debes ingresar tu código postal"),
    body("dni").notEmpty().withMessage("Debes ingresar tu número de documento"),
    body("phone").notEmpty().withMessage("Debes ingresar un número de contacto")
]