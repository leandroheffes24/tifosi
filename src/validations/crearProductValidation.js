const {body} = require("express-validator")

module.exports = [
    body("product_name").notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body("price").notEmpty().withMessage("Debes ingresar el precio"),
    body("discount").notEmpty().withMessage("Debes ingresar un descuento"),
    body("image").custom((value, {req}) => {
        let file = req.file
        let extencionesAceptadas = [".png", ".jpg", "webp"]

        if(!file){
            throw new Error("Tienes que subir una imagen")
        } else {
            let extensionFile = path.extname(file.originalname)

            if(!extencionesAceptadas.includes(extensionFile)){
                throw new Error(`Las extensiones de archivo que se aceptan son: ${extencionesAceptadas.join(", ")}`)
            }
        }

        return true
    }),
    body("category").notEmpty("Selecciona una categoría")
]