const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/company-service');

const logger = require('../../../log/logger')('company-controller');

const AdminController = require('../../AdminController');
const adminController = AdminController(service);


module.exports = ({
    ...adminController,
});