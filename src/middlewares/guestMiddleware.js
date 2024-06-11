function guetsMiddleware(req, res, next){
    if(req.session.userLoggedIn) {
        return res.redirect("/perfil")
    }
    next();
}

module.exports = guetsMiddleware