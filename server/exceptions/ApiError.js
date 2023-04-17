const colors = require("../log/colors");
module.exports = class ApiError extends Error {
    status;
    errors;
    constructor(status, message, errors=[]) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError(message='Unauthorized error'){
        return new ApiError(401, message);
    }

    static Forbidden(message="Forbidden error"){ // Permission denied
        return new ApiError(403, message);
    }

    static NotFound(message='Not found'){
        return new ApiError(404, message);
    }

    static ServerError(message='Unexpected error', errors=[]){
        return new ApiError(500, message, errors);
    }

    static BadRequest(message, errors=[]){
        return new ApiError(400, message, errors)
    }

    static Conflict(message, errors=[]){
        return new ApiError(409, message, errors)
    }

    static ValidationError(errors=[]){
        return new ApiError(400, 'Validation Error', errors);
    }

    /*static IdentityProviderMismatch(email, identity_provider){
        return new ApiError(409, `You tried signing in as "${email}" via ${identity_provider}, which is not the authentication method you used during sign up. Try again using the authentication method you used during sign up.`, ["identity_provider_mismatch"])
    }*/

    static MongooseError(err){
        if (err.name === 'ValidationError') { // mongoose error
            const errors = Object.keys(err.errors).map(key => ({[key]: err.errors[key].message}));
            console.log({ name: 'ValidationError', errors });
            return new ApiError(400, 'Mongo Validation Error', errors);
        }
        else if (err.name === 'MongoServerError') { // mongoose error
            if(err.code === 11000){
                // const errors = Object.keys(err.errors).map(key => ({[key]: err.errors[key].message}));
                const field = Object.keys(err.keyPattern)[0]
                // return ApiError.ValidationError([{name: field, error: `${field} must be unique.`}]);
                return new ApiError(400, 'Mongo Validation Error', [{name: field, error: `expected ${field} to be be unique`}]);

            }
        }
        return ApiError.ServerError(err.message);
    }
}