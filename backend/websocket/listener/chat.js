module.exports = socket => {
    socket.on("join-conversation", async conversation => {
        const { user } = socket.request;

        const Conversations = require('../../models/modelsManager').models.Conversation;
        const Participants = require('../../models/modelsManager').models.Participant;

        // const c = await Conversations.findById(conversation.id);

        const p = new Participants({
            conversation: conversation.id,
            user: user.id,
        });

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

        const m = new Messages({
            sender: user.id,
            ...message,
        });

        const n = new Notifications({
            type: 'message',
            message: m.id,
            user: user.id,
        });

        try{
            await m.save();
            await n.save();
        }catch(e){
            console.log(e);
        }

        console.log(`socket(${socket.id}) send message(${message})`);
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