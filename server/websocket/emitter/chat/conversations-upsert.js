const emit = require('../emit');
const conversationDto = require("../../../dtos/chat/conversation-dto");
const Logger = require('../../../log/logger');
const logger = Logger('conversation-emitter');

module.exports = function conversationsUpsert(userId, conversationModels){
    const dtos = conversationModels.map(conversation => conversationDto(conversation));
    emit('/upsert/conversation', userId, dtos);
}

