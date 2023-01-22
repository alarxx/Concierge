/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const Participants = require('../../../models/chat/Participant');

const io = require('../../../websocket/socket.io').io;

module.exports = function(schema) {
    schema.post('save', function(document, next){
        next();
    });
    schema.post('remove', function(document, next){
        next();
    });
};

