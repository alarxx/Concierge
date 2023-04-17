/**
 * Паспорт local отвечает только за логин, без регистрации.
 * В OAuth можно сразу регистрировать пользователя.
 * */

const logger = require('../log/logger')("local-strategy");

const LocalStrategy = require('passport-local');

const authService = require('../services/auth-service');

module.exports = () => new LocalStrategy(
    {
        passReqToCallback: true,
        usernameField: "email",
    },
    async (req, email, password, done) => {
        try {
            const user = await authService.signin({ email, password });

            done(null, user);
        } catch (e) {
            console.log(e)
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