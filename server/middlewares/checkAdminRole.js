const ApiError = require("../exceptions/ApiError");

module.exports = function(req, res, next){
    if(!req.isAuthenticated()){
        throw ApiError.UnauthorizedError('Unauthorized')
    }

    if(req.user?.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }

    next();
}