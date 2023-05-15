/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const asyncParticipantDto = require('../../../dtos/async/chat/participant-dto');
const logger = require('../../../log/logger')('notification-observer');

async function notify(method, modelName, participantDoc){
    const io = require('../../socket-io').io;

    const { Participant } = require('../../../models/models-manager');

    const dto = await asyncParticipantDto(participantDoc, );

    async function __notify(userId){
        try{
            io.to(String(userId)).emit(`/${method}/${modelName}`, dto);
        }
        catch(e){
            logger.error(`failed to emit /${method}/${modelName} to user(${userId}) with message:`, participantDoc);
        }
    }

    // В participants может как входить, так и нет participantDoc.
    const participants = await Participant.find({ conversation: participantDoc.conversation });

    await __notify(participantDoc.user);

    await Promise.all(participants.map(async participant => {
        if(participant.user == participantDoc.user){
            return;
        }
        await __notify(participant.user);
    }));
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