
module.exports = socket => {
    const messageService = require('../../services/chat/message/message-service');

    socket.on('send-message', async (message, files) => {
        const { user } = socket.request;

        await messageService.sendMessage(message, files, user);
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