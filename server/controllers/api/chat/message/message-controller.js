const ApiError = require("../../../../exceptions/ApiError");

const service = require('../../../../services/chat/message/message-service');

const logger = require('../../../../log/logger')('message-controller');

const StandardController = require('../../../StandardController');
const standardController = StandardController(service);

async function sendMessage(req, res, next){
    try{
        const data = service.sendMessage(req.body, req.files, req.user);
        res.json(data);
    }
    catch(e){
        next(e);
    }
}

module.exports = ({
    ...standardController,
    sendMessage,
});