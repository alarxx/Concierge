const logger = require('../log/logger')("passport-config");

const passport = require('passport');

const { User } = require('../models/models-manager');
const userDto = require('../dtos/user-dto');

module.exports = () => {
    passport.use(require('./azure-strategy')())
    passport.use(require('./local-strategy')())

    // Нужно добавить обработку ошибок. Здесь кажется не может быть ошибок.
    // Только при создании сессии, логин.
    // Срабатывает один раз, как init.
    passport.serializeUser((user, done)=>{
        logger.log(`serializeUser user(${userDto(user)}) -> id(${user.id})`);
        done(null, user.id);
    })

    // Нужна обработка ошибок. Done.
    // Каждый раз когда клиент делает запрос.
    // Срабатывает каждый раз, проверяет не удалился ли юзер из бд, например.
    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findById(id);
            logger.log(`deserializeUser id(${id}) -> user(`, userDto(user), ')');
            done(null, userDto(user));
        }
        catch(err){
            done(err)
        }
    })
}