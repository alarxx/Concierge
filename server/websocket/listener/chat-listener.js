const messageService = require("../../services/chat/message/message-service");

module.exports = socket => {
    const messageService = require('../../services/chat/message/message-service');

    socket.on('send-message', async (message, files) => {
        const { user } = socket.request;

        await messageService.sendMessage(message, files, user);
    })

    socket.on('delete-notifications', async (notification_ids) => {
        const { user } = socket.request;

        console.log('delete-notifications', {notification_ids});
        // await messageService.sendMessage(message, files, user);
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