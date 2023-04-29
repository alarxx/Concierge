const express = require('express');
const Router = express.Router();

Router.use('/user', require('./user/user-route'));
Router.use('/order', require('./order/order-route'));
Router.use('/company', require('./company/company-route'));
Router.use('/hotel', require('./hotel/hotel-route'));

module.exports = Router;
