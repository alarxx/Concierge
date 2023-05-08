const bcrypt = require('bcrypt');

const { User } = require('../models/models-manager');

const ApiError = require('../exceptions/ApiError');
const Validator = require('../validator/Validator');

const userDto = require('../dtos/user-dto');

const logger = require('../log/logger')('auth-service');

const mailService = require('./mail-service');
const tokenService = require('./token-service');
const userService = require('./user-service');


async function signin({ email, password }){
    const user = await User.findOne({ email });

    logger.log("found user:", user)

    if(!user){
        logger.log("No such user", email);
        throw ApiError.BadRequest("No such user", [{email: 'No such user'}])
    }
    else if(user.identity_provider !== 'local' && !user.password) {
        // Если не local мы должны проверить наличие пароля, если его нет, дать ошибку и предложить пользователю поставить пароль. По сути тот же роут что и на /setpassword
        throw ApiError.Conflict(`You tried signing in as "${email}" via local authentication, which is not the authentication method you used during sign up. Try again using the authentication method you used during sign up. You can try assigning a password.`, [{email: "identity_provider_mismatch"}])
    }
    else if(!await bcrypt.compare(password, user.password)){
        throw ApiError.BadRequest("Passwords do not match", [{password: 'Passwords do not match'}])
    }

    return userDto(user);
}


async function sendActivationMail({ email }){
    const validator = new Validator({ email });

    validator.validateEmail('email');

    if(!validator.isEmpty()){
        throw ApiError.ValidationError(validator.errors);
    }

    // Проверить существует ли уже пользователь, если да, то не скидывать.
    // Скидываем эту хрень только если пользователя еще нет.
    if(await User.findOne({ email })){
        throw ApiError.Conflict('This email is already taken. Try another one.');
    }
    const aud = 'activation_token';
    const token = await tokenService.generateToken(aud, { email });
    const link = `${process.env.CLIENT_URL}?${aud}=${token}`;

    return await mailService.sendActivationMail(email, link);
}


async function activation({ activation_token, name, password } ){
    if(!activation_token){
        throw ApiError.BadRequest("Activation token is not provided");
    }

    const { email } = await tokenService.verifyToken(activation_token, 'activation_token');

    return await userService.createUser({ name, email, password });
}


async function setName({ user, name }){
    if(user.name){
        throw ApiError.Conflict("Name already exists");
    }
    else if(!name){
        throw ApiError.BadRequest("Name cannot be empty");
    }

    const userModel = await User.findById(user.id);
    userModel.name = name;
    await userModel.save();

    return userDto(userModel);
}


async function sendResetPasswordMail({ email }){
    const validator = new Validator({ email });

    validator.validateEmail('email');

    if(!validator.isEmpty()){
        throw ApiError.ValidationError(validator.errors);
    }

    // Проверить существует ли уже пользователь, если да, то не скидывать.
    // Скидываем эту хрень только если пользователя еще нет.
    if(!await User.findOne({ email })){
        throw ApiError.BadRequest('No user with this email was found');
    }
    const aud = 'reset_password_token';
    const token = await tokenService.generateToken(aud, { email });
    const link = `${process.env.CLIENT_URL}?${aud}=${token}`;
    return await mailService.sendResetPasswordMail(email, link);
}


async function resetPassword({ reset_password_token, password }){
    if(!reset_password_token){
        throw ApiError.BadRequest("Activation token is not provided");
    }

    const { email } = await tokenService.verifyToken(reset_password_token, 'reset_password_token');

    const user = await User.findOne({ email });

    if(!user){
        throw ApiError.BadRequest('No such user exists');
    }

    return await userService.updateUser({ email, password });
}


module.exports = ({
    signin,
    sendActivationMail,
    activation,
    setName,
    sendResetPasswordMail,
    resetPassword
});