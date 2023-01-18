
const ConversationModel = require('../../../../models/chat/Conversation');
const ConversationController = require('../../../controller')({Model: ConversationModel});

module.exports = ConversationController;
