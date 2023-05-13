const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/hotel/hotel-room-service');

const logger = require('../../../../log/logger')('hotel-room-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);

async function findById(req, res, next){
    try{
        // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
        const data = await service.findById(req.params.id, req.user);
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