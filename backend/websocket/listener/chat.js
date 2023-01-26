async function createMessage(message, socket){
    const { user } = socket.request;

    const Messages = require('../../models/modelsManager').models.Message;
    const Notifications = require('../../models/modelsManager').models.Notification;
    const Participants = require('../../models/modelsManager').models.Participant;

    /**
     * Нужно не только тупое сохранение сделать, но и изменение
     * */

    let m = message.id ?
        await Messages.findById(message.id) :
        new Messages({
            sender: user.id,
            ...message
        });

    if(!m) return;

    try {
        if(m.type === 'text'){
            m.text = message.text;
        }
        else if(m.type === 'choice'){
            m.choice.selectedServices = message.choice.selectedServices;
            if(message.id)
                m.choice.submitted = true;
        }
        // А когда файл?
        await m.save();
    }catch(e){
        console.log(e);
    }

    const ps = await Participants.find({conversation: message.conversation});

    try {
        await Promise.all(ps.map(async p => {
            return await new Notifications({
                type: 'message',
                message: m.id,
                user: p.user,
            }).save();
        }))
    } catch (e) {
        console.log(e);
    }
}


module.exports = socket => {
    socket.on("join-conversation", async conversation => {

        const { user } = socket.request;

        console.log(`join socket(${socket.id}) to room`, conversation)

        const Participants = require('../../models/modelsManager').models.Participant;

        const info = {conversation: conversation.id, user: user.id};

        const exists = await Participants.findOne(info);
        if(exists)
            return console.log(`Participant already exists `, exists)

        if(user.role === 'manager'){
            const script_messages = [
                "Ваша заявка принята!",
                `Здравствуйте, меня зовут ${user.name}. Я ваш менеджер консультант `,
                "Данные о командировке, будут отображаться на главной странице и в окне информации чата"
            ]
            // Что будет если сокет выйдет в эти 9 секунд, я хз
            for(let i=0; i<script_messages.length; i++){
                setTimeout(()=>{
                    createMessage({
                        type: "text",
                        text: script_messages[i],
                        conversation: conversation.id
                    }, socket);
                    return;
                }, 3000*(i+1))
            }
        }

        const p = new Participants(info);

        try{
            await p.save();
        }catch(e){
            console.log(e)
        }

    })



    socket.on("send-message", async (message) => {
        console.log(`socket(${socket.id}) send message(${message}) of type ${message.type}`);

        await createMessage(message, socket)
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