/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const log = require("../../../logging/log");
const colors = require("../../../logging/colors");

async function notify(method, participant){
    const io = require('../../../websocket/socket.io').io;

    const Conversations = require('../../../models/modelsManager').models.Conversation;
    const Participants = require('../../../models/modelsManager').models.Participant;

    log(colors.cyan(`--- NOTIFY Participant.${method}() ---`), participant);


    /* Скидываем самому юзеру, о том, что он теперь участник */
    const conversation = await Conversations.findById(participant.conversation);
    try{
        log(colors.cyan(`send myself ${participant.user}`));
        io.to(String(participant.user)).emit(`/${method}/participant`, participant, conversation);
    }catch(e){
        console.log(e)
        log(colors.red(`failed to emit /${method}/participant to user(${participant.user}) with participant:`), participant);
    }

    /* Скидываем остальным уведомление о прибавлении нового юзера */
    const participants = await Participants.find({conversation: participant.conversation});
    log(colors.cyan(`subscribers(${participants.length}):`), participants);

    participants.map(
        p => {
            try{
                // Скидываем conversation как null, он не нужен клиенту, который уже сидит в беседе
                io.to(String(p.user)).emit(`/${method}/participant`, p, null);
            }catch(e){
                log(colors.red(`failed to emit /${method}/participant to user(${p.user}) with participant:`), p);
            }
        }
    )
}

module.exports = function(schema) {


    schema.post('save', async function(participant, next){
        await notify('save', participant)
        next();
    });


    /**
     * Если у нас удаляется юзер из беседы, то уведомляется об этом сам юзер и все остальные участники беседы.
     * Замечание!!: Если у нас удаляется сама беседа то, у нас по очереди удаляется каждый участник и это превратиться в сложную операцию.
     * O(n^2), 1000 участников удалятся и каждый из них уведомит всех остальных. 1000х1000
     * */
    schema.post('remove', async function(participant, next){
        await notify('delete', participant)
        next();
    });
};

