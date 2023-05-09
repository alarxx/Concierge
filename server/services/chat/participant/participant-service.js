const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Participant } = require('../../../models/models-manager');
const participantDto = require('../../../dtos/chat/participant-dto');

const logger = require('../../../log/logger')('participant-service');

const adminService = AdminService(Participant, participantDto, { creatorField: 'creator' });

const modelService = new ModelService(Participant);

module.exports = ({
    ...adminService,
});