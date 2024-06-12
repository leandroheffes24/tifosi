const {validationResult} = require("express-validator")
const {v4: uuidv4} = require("uuid")
const bcrypt = require("bcryptjs")
const usersServices = require("../services/usersServices")
const categoriesServices = require("../services/categoriesServices")

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
        const userInDB = await usersServices.findUserEmail(req.body.email)

        if(!userInDB){
            return res.render("ingresar", {errors: {email: {msg: "Mail no registrado"}}})
        }

        if(!bcrypt.compareSync(req.body.password, userInDB.password)){
            return res.render("ingresar", {errors: {password: {msg: "Contraseña incorrecta"}}, oldData: req.body})
        } else {
            req.session.userLoggedIn = userInDB
            return res.redirect("/")
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
        req.session.destroy()
        return res.redirect("/")
    }
}