
const OfficeModel = require('../../../models/services/Office');

const officeController = require('../../controller')({Model: OfficeModel});

module.exports = officeController;
