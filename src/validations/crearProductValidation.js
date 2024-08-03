const {body} = require("express-validator")
const path = require("path")

const validateImage = (fieldName) => {
    return body(fieldName).custom((value, {req}) => {
        if(req.file){
            let file = req.files['image2']
            let extensionFile = path.extname(file.originalname)
            let extencionesAceptadas = [".png", ".jpg", ".webp"]

            if(!extencionesAceptadas.includes(extensionFile)){
                throw new Error(`Las extensiones de archivo que se aceptan son: ${extencionesAceptadas.join(", ")}`)
            }
        }

        return true
    })
}

module.exports = [
    body("product_name").notEmpty().withMessage("Debes ingresar el nombre del producto"),
    body("price").notEmpty().withMessage("Debes ingresar el precio"),
    body("stock").notEmpty().withMessage("Debes ingresar el stock"),
    body("image1").custom((value, {req}) => {
        let file = req.files['image1'] ? req.files['image1'][0] : null
        let extencionesAceptadas = [".png", ".jpg", ".webp"]

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
    validateImage("image2"),
    validateImage("image3"),
    validateImage("image4"),
    validateImage("image5"),
    validateImage("image6"),
    validateImage("image7"),
    validateImage("image8"),
    validateImage("image9"),
    validateImage("image10")
]