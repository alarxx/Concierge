/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const log = require("../../../logging/log");
const colors = require("../../../logging/colors");
const object2string = require("../../../logging/object2string");

async function notify(method, message){
    const io = require('../../../websocket/socket.io').io;
    const Participants = require('../../../models/modelsManager').models.Participant;

    log(colors.cyan(`--- NOTIFY Message.${method}() ---`), message);

    const participants = await Participants.find({conversation: message.conversation})
    log(colors.cyan(`subscribers(${participants.length}):`), participants);

    if(method === 'save'){
        if(message.type === 'choice'){
            await message.choice.populate('services');
            await Promise.all(message.choice.services.map(async service => {
                await service.populate(service.type);
            }))
        }
        console.log(colors.red('save'), object2string(message));
    }

    participants.map(
        participant => {
            try{
                io.to(String(participant.user)).emit(`/${method}/message`, message);
            }catch(e){
                log(colors.red(`failed to emit /${method}/message to user(${participant.user}) with message:`), message);
            }
        }
    )

}

module.exports = function(schema) {

    schema.post('save', async function(message, next){
        await notify('save', message)
        next();
    });


    schema.post('remove', async function(message, next){
        await notify('delete', message)
        next();
    });

};

