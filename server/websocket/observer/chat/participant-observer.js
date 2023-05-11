/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const participantDto = require('../../../dtos/chat/participant-dto');
const {io} = require("../../socket-io");

const logger = require('../../../log/logger')('notification-observer');

async function notify(method, modelName, participantDoc){
    const io = require('../../socket-io').io;

    function __notify(userId){
        try{
            io.to(String(userId)).emit(`/${method}/${modelName}`, participantDto(participantDoc));
        }
        catch(e){
            logger.error(`failed to emit /${method}/${modelName} to user(${userId}) with message:`, participantDto(participantDoc));
        }
    }

    const { Participant } = require('../../../models/models-manager');

    // В participants может как входить, так и нет participantDoc.
    const participants = await Participant.find({ conversation: participantDoc.conversation });

    __notify(participantDoc.user);

    participants.map( participant => {
        if(participant.user == participantDoc.user){
            return;
        }
        __notify(participant.user);
    });
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
        const modelName = (document.constructor.modelName).toLowerCase();
        try{
            await notify('delete', modelName, doc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });

};