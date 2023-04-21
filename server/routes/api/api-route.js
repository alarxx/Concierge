const express = require('express');
const Router = express.Router();

Router.use('/post', require('./post/post-route'));
Router.use('/user', require('./user/user-route'));

module.exports = Router;
