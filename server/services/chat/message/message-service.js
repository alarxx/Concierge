const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Message } = require('../../../models/models-manager');
const messageDto = require('../../../dtos/chat/message-dto');

const logger = require('../../../log/logger')('message-service');

const adminService = AdminService(Message, messageDto, { creatorField: 'sender' });

const modelService = new ModelService(Message);

module.exports = ({
    ...adminService,
});