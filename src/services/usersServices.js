const {Users} = require("../../database/models")

const productsServices = {
    findUserEmail: (email) => {
        return Users.findOne({
            where: {email: email}
        })
    },

    createUser: (newUser) => {
        return Users.create({
            id: newUser.id,
            name: newUser.name,
            last_name: newUser.last_name,
            email: newUser.email,
            password: newUser.password,
            rank: newUser.rank
        })
    }
}

module.exports = productsServices