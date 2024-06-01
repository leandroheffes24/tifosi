function userLoggedInMiddleware (req, res, next) {
    if(req.session && req.session.userLoggedIn){
        let user = req.session.userLoggedIn
        res.locals.userLoggedIn = user
    } else {
        res.locals.userLoggedIn = false
    }
    next()
}

module.exports = userLoggedInMiddleware