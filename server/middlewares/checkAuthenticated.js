const ApiError = require("../exceptions/ApiError");

module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    else {
        // return res.status(401).json({ message: 'Unauthorized' });
        throw ApiError.UnauthorizedError('Unauthorized')
    }
}