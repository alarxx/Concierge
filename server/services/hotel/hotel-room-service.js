const ApiError = require("../../exceptions/ApiError");
const ModelService = require("../helpers/ModelService");
const AdminService = require('../helpers/AdminService');

const { Hotel_Room } = require('../../models/models-manager');
const roomDto = require('../../dtos/company-dto');

const logger = require('../../log/logger')('company-service');

const adminService = AdminService(Hotel_Room, roomDto, { creatorField: 'creator' });

const modelService = new ModelService(Hotel_Room);

const findByQueryParams = require('../helpers/openFindByQueryParams')(Hotel_Room, roomDto);
const pagination = require('../helpers/openPagination')(Hotel_Room, roomDto);

module.exports = ({
    ...adminService,
    findByQueryParams,
    pagination,
});