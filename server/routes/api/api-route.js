const express = require('express');
const Router = express.Router();

Router.use(require('../../middlewares/checkAuthenticated'));
Router.use('/user', require('./user/user-route'));
Router.use('/post', require('./post/post-route'));

module.exports = Router;
