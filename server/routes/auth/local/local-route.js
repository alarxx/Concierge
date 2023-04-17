const Router = require('express').Router();

const passport = require('passport');

const authController = require('../../../controllers/auth/auth-controller');

// Route to initiate authentication flow
Router.post('/signin',
    passport.authenticate('local', {
        failureRedirect: '/auth/failure',
        successRedirect: '/auth/success'
    })
);

// signup принимает токен и регистрирует /activation
Router.post('/activation', authController.activation);

// activation скидывает email /send-activation
Router.post('/send-activation', authController.sendActivationMail);

module.exports = Router;