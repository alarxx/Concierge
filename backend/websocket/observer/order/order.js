/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const { io } = require('../../../websocket/socket.io');

module.exports = function(schema) {
    schema.post('save', function(document, next){
        console.log(document);

        next();
    });
    schema.post('remove', function(document, next){

        console.log(document);
        next();
    });
};

