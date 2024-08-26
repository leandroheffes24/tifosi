const usersServices = require("../services/usersServices")

const rememberCookie = async (req, res, next) => {
    if(req.session.userLoggedIn && req.session.shipmentPrices){
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
            if(userInDB.province){
                const shipmentInformation = await usersServices.findShipmentInformation(userInDB.province)
                const shipmentPrices = [shipmentInformation.home_shipment, shipmentInformation.home_express_shipment, shipmentInformation.branch_shipment, shipmentInformation.branch_express_shipment]
                req.session.shipmentPrices = shipmentPrices
            }

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