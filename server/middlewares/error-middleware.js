const ApiError = require('../exceptions/ApiError');
const colors = require("../log/colors");
const mongoose = require("mongoose");
const logger = require('../log/logger')('error-middleware');

module.exports = function (err, req, res, next){
    if (err instanceof mongoose.Error.ValidationError) { // mongoose error
        const errors = Object.keys(err.errors).map(key => ({[key]: err.errors[key].message}));
        res.status(400).json({
            message: 'Validation Error',
            errors: errors
        });
    }
    else if(err instanceof ApiError){
        res.status(err.status).json({
            message: err.message,
            errors: err.errors
        });
    }
    else {
        logger.error(colors.red('Unexpected Error'), err);
        res.status(500).json({
            message: 'Unhandled unexpected error'
        });
    }
}