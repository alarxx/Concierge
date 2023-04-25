const jwt = require('jsonwebtoken');

const ApiError = require('../exceptions/ApiError');

const logger = require('../log/logger')('token-service');


async function generateToken(aud, payload={}) {
    if (!aud) throw ApiError.ServerError("Required arguments are missing");

    return new Promise((resolve, reject) => {
        jwt.sign({ ...payload, aud }, process.env.JWT_SECRET, {expiresIn: '15m'}, function (err, token) {
            if (err) {
                return reject(err);
            }
            resolve(token);
        });
    });
}


async function verifyToken(token, aud) {
    if (!token || !aud) {
        throw ApiError.ServerError("Required arguments are missing");
    }

    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, token_payload) => {
            if (err) {
                return reject(ApiError.BadRequest(`Invalid activation token, ${err.message}`));
            }
            if (token_payload.aud !== aud) {
                return reject(ApiError.BadRequest("Invalid activation token. Wrong jwt audience"));
            }
            resolve(token_payload)
        });
    });
}


module.exports = ({
    generateToken,
    verifyToken,
});