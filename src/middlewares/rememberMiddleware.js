const usersServices = require("../services/usersServices")

const rememberCookie = async (req, res, next) => {
    if(req.session.userLoggedIn){
        return next()
    }

    const rememberCookie = req.cookies.remember

    if(!rememberCookie){
        return next()
    }

    try {
        const userInDB = await usersServices.findUserEmail(rememberCookie)

        if(userInDB){
            req.session.userLoggedIn = userInDB

            if(userInDB.rank === "admin"){
                req.session.admin = true
            }
        }
    } catch (error) {
        console.log("Error al verificar la cookie remember: ", error);
    }

    next()
}

module.exports = rememberCookie