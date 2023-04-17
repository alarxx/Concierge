const ApiError = require("../exceptions/ApiError");

module.exports = function(req, res, next){
    if(req.user?.role === 'admin'){
        next();
    }
    else {
        throw ApiError.Forbidden('Permission denied');
    }
}