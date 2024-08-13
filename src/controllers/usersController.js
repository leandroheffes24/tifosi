const {validationResult} = require("express-validator")
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcryptjs")
const usersServices = require("../services/usersServices")
const categoriesServices = require("../services/categoriesServices")

async function getProvinces() {
    try {
        const res = await fetch("https://apis.datos.gob.ar/georef/api/provincias")
        if(res.ok){
            const json = await res.json()
            return json
        } else {
            throw new Error("Error al obtener las provincias")
        }
    } catch (error) {
        console.error("Error en la solicitud", error);
        return null
    }
}

module.exports = {
    registro: (req, res) => {
        return res.render("registro")
    },

    ingresar: (req, res) => {
        return res.render("ingresar")
    },

    profile: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("profile", {categories})
    },

    editProfilePersonalInformation: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("editProfilePersonalInformation", {categories})
    },

    editPassword: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("editPassword", {categories})
    },

    editShipment: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()

        const provincias = await getProvinces()
        const provinces = provincias.provincias
        
        return res.render("editProfileShipmentInformation", {categories, provinces})
    },

    registroProcess: async (req, res) => {
        let errors = validationResult(req)

        if(errors.errors.length > 0){
            return res.render("registro", {errors: errors.mapped(), oldData: req.body})
        }

        let userInDB = await usersServices.findUserEmail(req.body.email)

        if(userInDB){
            return res.render("registro", {errors: {email: {msg: "El mail ingresado ya está en uso"}}, oldData: req.body})
        }

        let newUser = {
            id: uuidv4(),
            name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            rank: "user"
        }

        usersServices.createUser(newUser)
        return res.redirect("/ingresar")
    },

    ingresarProcess: async (req, res) => {
        const userInDB = await usersServices.findUserEmail(req.body.email);

        if (!userInDB) {
            return res.render("ingresar", {errors: {email: {msg: "Mail no registrado"}}});
        }

        if (req.cookies.cookiesAccepted === "true" && req.body.remember != undefined) {
            res.cookie("remember", req.body.email, {maxAge: 60*60*24*365});
        } else {
            res.clearCookie("remember");
        }

        if (!bcrypt.compareSync(req.body.password, userInDB.password)) {
            return res.render("ingresar", {errors: {password: {msg: "Contraseña incorrecta"}}, oldData: req.body});
        } else {
            req.session.userLoggedIn = userInDB;
            if (userInDB.rank == "admin") {
                req.session.admin = true;
            }
            if(userInDB.province != null){
                const shipmentInformation = await usersServices.findShipmentInformation(userInDB.province)
                const shipmentPrices = [shipmentInformation.home_shipment, shipmentInformation.home_express_shipment, shipmentInformation.branch_shipment, shipmentInformation.branch_express_shipment]
                req.session.shipmentPrices = shipmentPrices
            }
            return res.redirect("/");
        }
    },

    editProfilePersonalInformationProcess: async (req, res) => {
        let errors = validationResult(req)
        const categories = await categoriesServices.getAllCategories()

        if(errors.errors.length > 0){
            return res.render("editProfilePersonalInformation", {errors: errors.mapped(), categories})
        }

        let userId = req.params.userId
        let userEdited = {
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email
        }

        usersServices.editProfilePersonalInformation(userId, userEdited)
        req.session.userLoggedIn.name = userEdited.name;
        req.session.userLoggedIn.last_name = userEdited.lastName;
        req.session.userLoggedIn.email = userEdited.email;
        return res.redirect("/perfil")
    },

    editPasswordProcess: async (req, res) => {
        let errors = validationResult(req)
        const categories = await categoriesServices.getAllCategories()

        if(errors.errors.length > 0){
            return res.render("editPassword", {errors: errors.mapped(), categories})
        }

        let userId = req.params.userId
        let passwordEdited = bcrypt.hashSync(req.body.password, 10)
        usersServices.editPassword(userId, passwordEdited)
        return res.redirect("/perfil")
    },

    logout: (req, res) => {
        req.session.destroy();

        if (req.cookies.cookiesAccepted === "true" && req.cookies.remember) {
            res.clearCookie("remember");
        }

        return res.redirect("/");
    },

    editShipmentProcess: async (req, res) => {
        let errors = validationResult(req)
        const categories = await categoriesServices.getAllCategories()
        const provincias = await getProvinces()
        const provinces = provincias.provincias

        if(errors.errors.length > 0){
            return res.render("editProfileShipmentInformation", {errors: errors.mapped(), categories, provinces})
        }

        let userId = req.params.userId
        let newShipmentInfo = {
            country: req.body.country,
            province: req.body.province,
            city: req.body.city,
            address: req.body.address,
            cp: req.body.cp,
            dni: req.body.dni,
            phone: req.body.phone
        }

        usersServices.editProfileShipmentInformation(userId, newShipmentInfo)
        req.session.userLoggedIn.country = newShipmentInfo.country;
        req.session.userLoggedIn.province = newShipmentInfo.province;
        req.session.userLoggedIn.city = newShipmentInfo.city;
        req.session.userLoggedIn.address = newShipmentInfo.address;
        req.session.userLoggedIn.cp = newShipmentInfo.cp;
        req.session.userLoggedIn.dni = newShipmentInfo.dni;
        req.session.userLoggedIn.phone = newShipmentInfo.phone;
        const shipmentInformation = await usersServices.findShipmentInformation(newShipmentInfo.province)
        const shipmentPrices = [shipmentInformation.home_shipment, shipmentInformation.home_express_shipment, shipmentInformation.branch_shipment, shipmentInformation.branch_express_shipment]
        req.session.shipmentPrices = shipmentPrices
        
        return res.redirect("/perfil")
    },

    ordenes: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const user = req.session.userLoggedIn
        const userId = user.id
        const orders = await usersServices.getOrders()
        const userOrders = await usersServices.getUserOrders(userId)
        return res.render("ordenes", {categories, userOrders, orders})
    },

    editOrderStatus: async (req, res) => {
        const orderId = req.params.orderId
        const newStatus = req.params.newStatus
        usersServices.editOrderStatus(orderId, newStatus)
        return res.redirect("/")
    }
}