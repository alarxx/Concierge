/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */


const log = require("../../../logging/log");
const colors = require("../../../logging/colors");

async function notify(method, conversation){
    const io = require('../../../websocket/socket.io').io;

    const Participants = require('../../../models/modelsManager').models.Participant;

    log(colors.cyan(`--- NOTIFY Conversation.${method}() ---`), conversation);

    const participants = await Participants.find({conversation: conversation._id})
    log(colors.cyan(`subscribers(${participants.length}):`), participants);

    participants.map(
        participant => {
            try{
                io.to(String(participant.user)).emit(`/${method}/conversation`, conversation);
            }catch(e){
                log(colors.red(`failed to emit /${method}/conversation to user(${participant.user}) with conversation:`), conversation);
            }
        }
    )
}

module.exports = function(schema) {

    schema.post('save', async function(conversation, next){
        await notify('save', conversation)
        next();
    });


    schema.post('remove', async function(conversation, next){
        await notify('delete', conversation)
        next();
    });

};

