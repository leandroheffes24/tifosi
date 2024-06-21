function error404(req, res, next){
    if(res.status(404)){
        res.render("error404")
    }

    next()
}

module.exports = error404