function authMiddleware(req, res, next){
    if(!req.session.userLoggedIn) {
        return res.redirect("/ingresar")
    }
    next();
}

module.exports = authMiddleware