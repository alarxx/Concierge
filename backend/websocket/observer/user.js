/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

/* passport использует модель User, до инициализации socket.io, поэтому изначально он здесь null */
const io = require('../../websocket/socket.io').io;

module.exports = function(schema) {
    schema.post('save', function(document, next){
        next();
    });
    schema.post('remove', function(document, next){
        next();
    });
};

