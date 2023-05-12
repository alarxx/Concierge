const Router = require('express').Router();

Router.use('/auth', require('./auth/auth-route'));
Router.use('/file', require('./file/file-route'));

// не все апишки требуют аутентификации
Router.use('/api', require('./api/api-route'));

module.exports = Router;