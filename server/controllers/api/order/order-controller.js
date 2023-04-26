const ApiError = require("../../../exceptions/ApiError");

const orderService = require('../../../services/order-service');

const logger = require('../../../log/logger')('order-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(orderService);


async function createOne(req, res, next){
    try{
        const data = await orderService.createOne(req.body, req.files, req.user);
        res.json(data);
    }
    catch(e){
        next(e);
    }
}


async function findByQueryParams(req, res, next){
    try{
        const data = await orderService.find(req.query, req.user);
        res.json(data);
    }
    catch(err){
        next(err);
    }
}


async function updateOne(req, res, next){
    try{
        const data = await orderService.updateOne(req.body, req.files, req.user);
        res.json(data);
    }
    catch(err){
        next(err)
    }
}


async function deleteOne(req, res, next){
    try{
        const data = await orderService.deleteOne(req.body, req.user);
        res.json(data);
    }
    catch(err){
        next(err);
    }
}


module.exports = ({
    ...standardController,
});