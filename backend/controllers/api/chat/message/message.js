
const MessageModel = require('../../../../models/chat/Message');
const MessageController = require('../../../controller')({Model: MessageModel});

module.exports = MessageController;
