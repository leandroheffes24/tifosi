const {Talles} = require("../../database/models")
const {Products_talles} = require("../../database/models")
const {Products} = require("../../database/models")

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

    createTalle: (newTalle) => {
        return Talles.create({
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
    },

    getProductsFilteredByTalle: async (talles) => {
        try {
            const products = await Products_talles.findAll({
                where: {
                    talle_id: talles
                },
                include: [{
                    model: Products,
                    as: 'product'
                }]
            });
            return products.map(productTalle => productTalle.product);
        } catch (error) {
            console.error("Error fetching products by talles: ", error);
            throw error;
        }
    }
}

module.exports = tallesServices