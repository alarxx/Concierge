/**
 * В OAuth можно сразу регистрировать пользователя
 * */

const ApiError = require("../exceptions/ApiError");
const OIDCStrategy = require("passport-azure-ad").OIDCStrategy;
const { User } = require('../models/models-manager');
const logger = require('../log/logger')('azure-strategy');

/** Is this a service? Is it supposed to be in the /services folder? */
async function azure_authenticate(name, email){
    let user = await User.findOne({ email });

    if(!user){
        // throw ApiError.UnauthorizedError(`No user with ${email} email`);
        console.log("Create new user", {name, email, provider: 'azure'})
        user = new User({
            name,
            email,
            identity_provider: 'azure'
        });
        await user.save();
    }
    /*
    // Если пользователь есть, но стратегия аутентификации была другой
    // Зачем выдавать такую ошибку?
    // Если он подтвердил свою почту, это же достаточно, чтобы впустить его.
    // Тем более после аутентификации сразу редирект идет, а не JSON ответ.
    // else if(user.identity_provider !== 'azure') {
    //    throw ApiError.IdentityProviderMismatch(user.email, 'Microsoft Azure')
    // }
    */

    return user;
}

module.exports = () => new OIDCStrategy({
        allowHttpForRedirectUrl: true,
        identityMetadata: process.env.AZURE_IDENTITY_METADATA,
        clientID: process.env.AZURE_CLIENT_ID,
        clientSecret: process.env.AZURE_CLIENT_SECRET,
        responseType: process.env.AZURE_RESPONSE_TYPE,
        responseMode: process.env.AZURE_RESPONSE_MODE,
        redirectUrl: process.env.AZURE_REDIRECT_URL,
        passReqToCallback: false,
        validateIssuer: false,
        scope: ['email', 'profile'],
    },
    async (iss, sub, profile, accessToken, refreshToken, done)=> {
        const { email, name } = profile._json;

        try {
            let user = await azure_authenticate(name, email)
            logger.log('success:', {user});
            done(null, user);
        } catch (e) {
            logger.log('failure:', {email}, e);
            done(e, false);
        }
    }
);

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/
