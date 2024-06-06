const categoriesServices = require("../services/categoriesServices")
const tallesServices = require("../services/tallesServices")

module.exports = {
    crearTalle: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        return res.render("talleCreate", {categories})
    },

    editarTalle: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const talles = await tallesServices.getAllTalles()
        return res.render("tallesEdit", {categories, talles})
    },

    eliminarTalle: async (req, res) =>{
        const categories = await categoriesServices.getAllCategories()
        const talles = await tallesServices.getAllTalles()
        return res.render("tallesDelete", {categories, talles})
    },

    editarTalleId: async (req, res) => {
        const categories = await categoriesServices.getAllCategories()
        const talleToEditId = req.params.talleId
        const talleToEdit = await tallesServices.getTalleById(talleToEditId)
        return res.render("talleEditForm", {categories, talleToEdit})
    },

    crearTalleProcess: async (req, res) => {
        const newTalle = req.body.newTalle
        const lastTalle = await tallesServices.getLastTalle()
        const newTalleId = lastTalle.id + 1
        tallesServices.createTalle(newTalle, newTalleId)
        return res.redirect("/")
    },

    editarTalleProcess: (req, res) => {
        const talleToEditId = req.params.talleId
        const newTalleName = req.body.newTalleName
        tallesServices.editarTalle(talleToEditId, newTalleName)
        return res.redirect("/")
    },

    eliminarTalleProcess: (req, res) => {
        const talleToDeleteId = req.params.talleId
        tallesServices.deleteTalle(talleToDeleteId)
        return res.redirect("/")
    }
}