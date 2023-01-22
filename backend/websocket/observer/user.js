/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

module.exports = function(schema) {
    schema.post('save', function(document, next){
        next();
    });
    schema.post('remove', function(document, next){
        next();
    });
};