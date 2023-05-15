/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const conversationDto = require('../../../dtos/chat/conversation-dto');

const logger = require('../../../log/logger')('conversation-observer');

async function notify(method, modelName, conversationDoc){
    const io = require('../../socket-io').io;

    const { Participant } = require('../../../models/models-manager');

    // Должны отправить уведомление о создании или удалении админам и пользователям, имеющим отношение к order
    const participants = await Participant.find({ conversation: conversationDoc.id });

    participants.map(participant => {
        try{
            io.to(String(participant.user)).emit(`/${method}/${modelName}`, conversationDto(conversationDoc));
        }
        catch(e){
            logger.error(`failed to emit /${method}/${modelName} to user(${participant.user}) with message:`, conversationDto(conversationDoc));
        }
    });
}

module.exports = function(schema) {

    schema.post('save', async function(conversationDoc, next){
        const modelName = (this.constructor.modelName).toLowerCase();
        try{
            await notify('save', modelName, conversationDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

    schema.post('findOneAndDelete', async function(conversationDoc, next){
        const modelName = (conversationDoc.constructor.modelName).toLowerCase();
        try{
            await notify('delete', modelName, conversationDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

};