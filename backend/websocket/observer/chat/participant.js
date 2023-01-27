/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const log = require("../../../logging/log");
const colors = require("../../../logging/colors");
const { io } = require("../../socket.io");

async function notify(method, participant){
    const io = require('../../../websocket/socket.io').io;

    const Conversations = require('../../../models/modelsManager').models.Conversation;
    const Participants = require('../../../models/modelsManager').models.Participant;
    const Messages = require('../../../models/modelsManager').models.Message;

    log(colors.cyan(`--- NOTIFY Participant.${method}() ---`), participant);

    const participants = await Participants.find({conversation: participant.conversation});
    log(colors.cyan(`subscribers(${participants.length}):`), participants);

    const conversation = await Conversations.findById(participant.conversation);
    // Не проверки на существование. У этого конечно есть причина. В контроллере Conversation мы создаем participant раньше, чем создается сам Conversation.
    if(conversation){ // Означает что это не впервые созданный conversation.
        io.to(String(participant.user)).emit(`/${method}/conversation`, conversation);
        // Нужно отослать participant-у все сообщения.
        const last_messages = await Messages.find({conversation: participant.conversation});
        last_messages.map(message => {
            io.to(String(participant.user)).emit(`/${method}/message`, message);
        });

    }

    participants.map(
        p => {
            try{
                io.to(String(p.user)).emit(`/${method}/participant`, p);
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

