const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/hotel/hotel-service');

const logger = require('../../../log/logger')('hotel-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(service);

async function findById(req, res, next){
    try{
        const id = req.params.id;
        const user = req.user;
        const data = await service.findById(id, user);
        res.json(data);
    }
    catch(e){
        next(e);
    }
}

module.exports = ({
    ...standardController,
    findById
});