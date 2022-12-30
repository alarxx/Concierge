
const CompanyModel = require('../../../models/Company');
const CompanyController = require('../../controller')(CompanyModel);

module.exports = CompanyController;
