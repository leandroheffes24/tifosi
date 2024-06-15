const {Talles} = require("../../database/models")

const tallesServices = {
    getAllTalles: () => {
        return Talles.findAll()
    },

    getLastTalle: () => {
        return Talles.findOne({
            order: [["created_at", "DESC"]]
        })
    },

    getTalleById: (talleId) => {
        return Talles.findByPk(talleId)
    },

    createTalle: (newTalle, newTalleId) => {
        return Talles.create({
            id: newTalleId,
            name: newTalle
        })
    },

    editarTalle: (talleToEditId, newTalleName) => {
        return Talles.update({
            name: newTalleName
        }, {
            where: {id: talleToEditId}
        })
    },

    deleteTalle: (talleToDeleteId) => {
        return Talles.destroy({
            where: {id: talleToDeleteId}
        })
    },

    getTalleId: async (talleName) => {
        let talles = await Talles.findAll()
        let talleSelected = talles.filter(talle => (talle.name.toLowerCase()) == talleName)
        return talleSelected[0].id
    }
}

module.exports = tallesServices