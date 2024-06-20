const {Users} = require ("../../database/models");

let rememberMiddleware = async (req, res, next) => {
    // res.locals.userLoggedIn = false

    if (req.cookies.remember){
        let userFromCookie = await Users.findOne({
            where : {email: req.cookies.remember}
        })
        req.session.userLoggedIn = userFromCookie
        if(userFromCookie.rank === "admin"){
            req.session.admin = true
        }
    }

    if (req.session.userLoggedIn) {
        res.locals.userLoggedIn = req.session.userLogged
    }

    return next ()
}

module.exports = rememberMiddleware