const express = require('express');
const Router = express.Router();

Router.use(require('../../auth/checkAuthenticated'));

Router.use('/order', require('./order/order'));
Router.use('/company', require('./company/company'))
Router.use('/file', require('./file/file'));

Router.use('/hotel', require('./hotel/hotel'));
Router.use('/booking', require('./booking/booking'));
Router.use('/service', require('./service/service'));

Router.use('/chat', require('./chat/chat'));

module.exports = Router;
