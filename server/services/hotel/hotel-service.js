const ApiError = require("../../exceptions/ApiError");
const ModelService = require("./../helpers/ModelService");
const AdminService = require('./../helpers/AdminService');

const { Hotel } = require('../../models/models-manager');
const hotelDto = require('../../dtos/hotel/hotel-dto');

const logger = require('../../log/logger')('hotel-service');

const adminService = AdminService(Hotel, hotelDto, { creatorField: 'creator' });

const modelService = new ModelService(Hotel);

const findByQueryParams = require('../helpers/openFindByQueryParams')(Hotel, hotelDto);
const pagination = require('../helpers/openPagination')(Hotel, hotelDto);


module.exports = ({
    ...adminService,
    findByQueryParams,
    pagination,
});