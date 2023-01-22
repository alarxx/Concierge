/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */
const log = require("../../../logging/log");
const colors = require("../../../logging/colors");

async function notify(method, notification){
    const io = require('../../../websocket/socket.io').io;

    log(colors.cyan(`--- NOTIFY Notification.${method}() ---`), notification);
    log(colors.cyan(`subscriber:`), notification.user);

    try{
        io.to(String(notification.user)).emit(`/${method}/notification`, notification);
    }catch(e){
        log(colors.red(`failed to emit /${method}/notification to user(${notification.user}) with notification:`), notification);
    }

}

module.exports = function(schema) {

    schema.post('save', async function(notification, next){
        await notify('save', notification)
        next();
    });

    schema.post('remove', async function(notification, next){
        await notify('delete', notification)
        next();
    });

};
