function shipmentDataMiddleware(req, res, next){
    const user = req.session.userLoggedIn
    if(user.country == null || user.province == null || user.city == null || user.address == null || user.cp == null){
        return res.redirect("/perfil")
    }
    next()
}

module.exports = shipmentDataMiddleware