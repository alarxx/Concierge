const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Notification } = require('../../../models/models-manager');
const notificationDto = require('../../../dtos/chat/notification-dto');

const logger = require('../../../log/logger')('notification-service');

const adminService = AdminService(Notification, notificationDto, { creatorField: 'creator' });

const modelService = new ModelService(Notification);

async function deleteNotifications(notification_ids, user){
    const notifications = await Notification.find({_id: { $in: notification_ids }});
    await Promise.all(notifications.map(async notification => {
        if(notification.user != user.id){
            return;
        }
        await Notification.findOneAndDelete({ _id: notification.id })
            .catch(logger.log);
    }))
}

module.exports = ({
    ...adminService,
    deleteNotifications
});