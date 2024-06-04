const {Talles} = require("../../database/models")

const productsServices = {
    getLastTalle: () => {
        return Talles.findOne({
            order: [["created_at", "DESC"]]
        })
    },

    createTalle: (newTalle, newTalleId) => {
        return Talles.create({
            id: newTalleId,
            name: newTalle
        })
    }
}

module.exports = productsServices