const {body} = require("express-validator")

module.exports = [
    body("password").notEmpty().withMessage("Debes ingresar una contraseña").isLength({min: 6}).withMessage("Debe contener al menos 6 caracteres"),
    body("passwordConfirmation").notEmpty().withMessage("Debes confirmar la contraseña").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Las contraseñas no coinciden");
        }
        return true;
    })
]