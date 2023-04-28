const ApiError = require("../exceptions/ApiError");
const ModelService = require("./helpers/ModelService");
const AdminService = require('./helpers/AdminService');

const { Company } = require('../models/models-manager');
const companyDto = require('../dtos/company-dto');

const logger = require('../log/logger')('company-service');

const adminService = AdminService(Company, companyDto, { creatorField: 'creator' });

const modelService = new ModelService(Company);

const findByQueryParams = require('./helpers/openFindByQueryParams')(Company, companyDto);
const pagination = require('./helpers/openPagination')(Company, companyDto);

module.exports = ({
    ...adminService,
    findByQueryParams,
    pagination
});