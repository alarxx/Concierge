/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const notificationDto = require('../../../dtos/chat/notification-dto');

const logger = require('../../../log/logger')('notification-observer');

async function notify(method, modelName, notificationDoc){
    const io = require('../../socket-io').io;

    try{
        io.to(String(notificationDoc.user)).emit(`/${method}/${modelName}`, notificationDto(notificationDoc));
    }
    catch(e){
        logger.error(`failed to emit /${method}/${modelName} to user(${notificationDoc.user}) with message:`, notificationDto(notificationDoc));
    }
}

module.exports = function(schema) {

    schema.post('save', async function(doc, next){
        const modelName = (this.constructor.modelName).toLowerCase();
        try{
            await notify('save', modelName, doc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

    schema.post('findOneAndDelete', async function(doc, next){
        const modelName = (doc.constructor.modelName).toLowerCase();
        try{
            await notify('delete', modelName, doc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

};