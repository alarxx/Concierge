
const CrudService = require('../helpers/StandardService');
const { Order } = require('../../models/models-manager');
const orderDto = require('../../dtos/order-dto');

const logger = require('../../log/logger')('order-service');

const StandardService = require('../helpers/StandardService');
const standardService = StandardService(Order, orderDto, { creatorField: 'customer' });


module.exports = ({
    ...standardService,
});