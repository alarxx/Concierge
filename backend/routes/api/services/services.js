const express = require('express');
const Router = express.Router();

Router.use('/hotel', require('./hotel/hotel'));
Router.use('/booking', require('./booking/booking'));
Router.use('/service', require('./service/service'));

module.exports = Router;
