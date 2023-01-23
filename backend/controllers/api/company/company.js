
const CompanyModel = require('../../../models/company/Company');
const CompanyController = require('../../controller')({Model: CompanyModel});

module.exports = CompanyController;
