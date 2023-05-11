const express = require('express');
const Router = express.Router();

Router.use('/conversation', require('./conversation/conversation-route'));
Router.use('/message', require('./message/message-route'));
Router.use('/notification', require('./notification/notification-route'));
Router.use('/participant', require('./participant/participant-route'));


const controller = require('../../../controllers/api/chat/chat-controller');

const checkAuthenticated = require('../../../middlewares/checkAuthenticated');
const checkAdminRole = require('../../../middlewares/checkAdminRole');

const { firstLoad } = controller;

// пагинация нужна именно на сообщениях
Router.route('/first-load')
    .get(checkAuthenticated, firstLoad)

module.exports = Router;
