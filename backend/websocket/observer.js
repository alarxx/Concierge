/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const { io } = require('../server');

module.exports = modelName => function(schema) {
    schema.post('save', function(document, next){
        next();
    });
    schema.post('remove', function(document, next){
        next();
    });
};

