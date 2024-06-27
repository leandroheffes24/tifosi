const cookieConsentMiddleware = (req, res, next) => {
    const cookieConsent = req.cookies.cookieConsent;

    if (cookieConsent === 'rejected') {
        req.cookies = {}; // Elimina todas las cookies del request si el usuario las rechazó
    }

    next();
};

module.exports = cookieConsentMiddleware;