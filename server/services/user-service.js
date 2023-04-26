
const ApiError = require("../exceptions/ApiError");
const Validator = require("../validator/Validator");
const ModelService = require('./helpers/ModelService');

const bcrypt = require("bcrypt");

const userDto = require("../dtos/user-dto");

const { User } = require('../models/models-manager');
const logger = require('../log/logger')('user-service');
const modelService = new ModelService(User);


async function hashPassword(password){
    return await bcrypt.hash(password, 10);
}


async function createUser(body, files){
    const { email, password, name } = body;

    if(await User.findOne({ email })){
        throw ApiError.Conflict('User already exists');
    }

    const validator = new Validator(body);

    validator
        // .validateString('name')
        .validateEmail('email')
        .validatePassword('password');

    if(!validator.isEmpty()){
        logger.error("validation is not empty", validator.errors)
        throw ApiError.ValidationError(validator.errors);
    }

    const hash = await hashPassword(password);

    const user = new User({
        ...body,
        password: hash,
        identity_provider: 'local',
    });

    await modelService.saveWithFiles(user, files, { user });

    return userDto(user);
}


async function findUsers(filters){
    if(filters.id){
        filters._id = filters.id;
        delete filters.id;
    }
    const users = await User.find(filters);
    return users.map(u => userDto(u));
}


async function updateUser(body, files){
    if(!body || Object.keys(body).length === 0){
        throw ApiError.BadRequest("Empty request body");
    }

    const pkey = modelService.get_pkey(body);

    const user = await User.findOne({ [(pkey === 'id' ? '_id' : pkey)]: body[ pkey ] });
    if(!user){
        throw ApiError.NotFound("User not found")
    }

    if(body.password){
        const validator = new Validator(body);

        validator.validatePassword('password');

        if(!validator.isEmpty()){
            logger.error("validation is not empty", validator.errors)
            throw ApiError.ValidationError(validator.errors);
        }

        body.password = await hashPassword(body.password);
    }

    /*
    * Здесь нужна проверка есть ли строка файла, но там нет файла
    * Это нужно, чтобы удалять файлы.
    * */
    /* Следующие 2 строчки можно объединить и назвать set */
    await modelService.deleteInvalidFileFields(body, user);
    user.set(body);

    await modelService.saveWithFiles(user, files, { user });

    return userDto(user);
}


async function deleteUser(body){
    if(!body || Object.keys(body).length === 0){
        throw ApiError.BadRequest("Empty request body");
    }

    const pkey = modelService.get_pkey(body);

    /* нужно удалять все что связанно с моделью и должны быть удалено вместе с пользователем, например аватарку */
    const user = await User.findOneAndDelete({ [(pkey === 'id' ? '_id' : pkey)]: body[ pkey ] });
    if(!user){
        throw ApiError.NotFound("User not found")
    }

    await modelService.deleteAttachedFiles(user);

    return userDto(user);
}


module.exports = ({
    createUser,
    findUsers,
    updateUser,
    deleteUser
});