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
/**
 * Возвращает сообщения, беседы, уведомления и участников, дополненных информацией о user.
 * Самое простое решение было бы сделать participant.populate('user'), но нельзя populate-ить пользователя без dto.
 * Решил просто дополнить {...participant, name: user.name}
 * */
Router.route('/first-load')
    .get(checkAuthenticated, firstLoad)

module.exports = Router;
