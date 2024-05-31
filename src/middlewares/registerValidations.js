const {body} = require("express-validator")

module.exports = [
    body("name").notEmpty().withMessage("Debes ingresar tu nombre"),
    body("lastName").notEmpty().withMessage("Debes ingresar tu apellido"),
    body("email").notEmpty().withMessage("Debes ingresar tu mail").isEmail().withMessage("Debes ingresar un mail válido"),
    body("password").notEmpty().withMessage("Debes ingresar una contraseña").isLength({min: 6}).withMessage("Debe contener al menos 6 caracteres"),
    body("passwordConfirmation").notEmpty().withMessage("Debes confirmar la contraseña").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    })
]