const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/chat/chat-service');

const logger = require('../../../log/logger')('chat-controller');

async function firstLoad(req, res, next){
    try{
        const data = await service.firstLoad(req.user);
        res.json(data);
    }
    catch(e){
        next(e);
    }
}

module.exports = ({
    firstLoad,
});