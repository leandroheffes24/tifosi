function selectedShipmentMiddleware(req, res, next){
    if(!req.session.shipmentPriceSelected) {
        return res.redirect("/carrito")
    }
    next();
}

module.exports = selectedShipmentMiddleware