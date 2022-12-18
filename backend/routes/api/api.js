const express = require('express');
const Router = express.Router();

Router.use(require.main.require('./auth/checkAuthenticated'));

Router.use('/order', require('./order/order'));
Router.use('/company', require('./company/company'))
Router.use('/services', require('./services/services'));
Router.use('/file', require('./file/file'));

module.exports = Router;
