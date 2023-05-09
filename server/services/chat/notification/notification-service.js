const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Notification } = require('../../../models/models-manager');
const notificationDto = require('../../../dtos/chat/notification-dto');

const logger = require('../../../log/logger')('notification-service');

const adminService = AdminService(Notification, notificationDto, { creatorField: 'creator' });

const modelService = new ModelService(Notification);

module.exports = ({
    ...adminService,
});