const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Conversation } = require('../../../models/models-manager');
const conversationDto = require('../../../dtos/chat/conversation-dto');

const logger = require('../../../log/logger')('conversation-service');

const adminService = AdminService(Conversation, conversationDto, { creatorField: 'creator' });

const modelService = new ModelService(Conversation);

module.exports = ({
    ...adminService,
});