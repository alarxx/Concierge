/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const messageDto = require('../../../dtos/chat/message-dto');

const logger = require('../../../log/logger')('message-observer');

async function notify(method, modelName, messageDoc){
    const io = require('../../socket-io').io;

    const conversationId = messageDoc.conversation;

    const { Participant } = require('../../../models/models-manager');

    // Должны отправить уведомление о создании или удалении админам и пользователям, имеющим отношение к order
    const participants = await Participant.find({ conversation: conversationId });

    participants.map(participant => {
        try{
            io.to(String(participant.user)).emit(`/${method}/${modelName}`, messageDto(messageDoc));
        }
        catch(e){
            logger.error(`failed to emit /${method}/${modelName} to user(${participant.user}) with message:`, messageDto(messageDoc));
        }
    });
}

module.exports = function(schema) {

    schema.post('save', async function(messageDoc, next){
        const modelName = (this.constructor.modelName).toLowerCase(); // Можно было бы и просто 'message' написать, а не так
        try{
            await notify('save', modelName, messageDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

    schema.post('findOneAndDelete', async function(messageDoc, next){
        const modelName = (document.constructor.modelName).toLowerCase(); // Можно было бы и просто 'message' написать, а не так
        try{
            await notify('delete', modelName, messageDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

};