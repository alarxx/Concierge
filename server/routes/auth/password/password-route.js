const Router = require('express').Router();

const authController = require('../../../controllers/auth/auth-controller');

Router.post('/reset', authController.resetPassword);
Router.post('/send-reset', authController.sendResetPasswordMail);

module.exports = Router;