const emit = require('../emit');

const Logger = require('../../../log/logger');
const logger = Logger('message-emitter');

const messageDto = require("../../../dtos/chat/message-dto");

module.exports = function messagesUpsert(userId, messageModels){
    const dtos = messageModels.map(message => messageDto(message));
    emit('/upsert/message', userId, dtos);
}

