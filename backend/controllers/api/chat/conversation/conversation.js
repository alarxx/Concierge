
const ConversationModel = require('../../../../models/chat/Conversation');
const ConversationController = require('../../../controller')(ConversationModel);

module.exports = ConversationController;
