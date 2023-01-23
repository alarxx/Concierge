module.exports = socket => {
    socket.on("join-conversation", async conversation => {
        const { user } = socket.request;

        const Participants = require('../../models/modelsManager').models.Participant;

        const info = {conversation: conversation.id, user: user.id};

        const exists = await Participants.findOne(info);
        if(exists)
            return console.log(`Participant already exists `, exists)

        const p = new Participants(info);

        try{
            await p.save();
        }catch(e){
            console.log(e)
        }

        console.log(`join socket(${socket.id}) to room`, conversation)
    })

    socket.on("send-message", async (message) => {
        const { user } = socket.request;

        const Messages = require('../../models/modelsManager').models.Message;
        const Notifications = require('../../models/modelsManager').models.Notification;
        const Participants = require('../../models/modelsManager').models.Participant;

        const m = new Messages({
            sender: user.id,
            ...message,
        });

        const ps = await Participants.find({conversation: message.conversation});

        try{
            await Promise.all(ps.map( async p => {
                return await new Notifications({
                    type: 'message',
                    message: m.id,
                    user: p.user,
                }).save();
            }))
            await m.save();
        }catch(e){
            console.log(e);
        }

        console.log(`socket(${socket.id}) send message(${message})`);
    })

    socket.on('delete-notifications', async (notifications) => {
        const Notifications = require('../../models/modelsManager').models.Notification;

        const ids = notifications.map(n => n.id);
        const ns = await Notifications.find({ '_id': { $in: ids } })

        await Promise.all(ns.map(async n => {
            await n.deepDelete();
        }))
    })
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/