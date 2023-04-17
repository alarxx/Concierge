const ApiError = require('../exceptions/ApiError');
const colors = require("../log/colors");
const logger = require('../log/logger')('error-middleware');

module.exports = function (err, req, res, next){
    if(err instanceof ApiError){
        res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }
    else {
        logger.error(colors.red('UnexpectedError'), err);
        res.status(500).json({
            message: 'Unhandled unexpected error'
        });
    }
}