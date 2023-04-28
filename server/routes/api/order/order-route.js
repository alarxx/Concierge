const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/order/order-controller');

const { createOne, updateOne, deleteOne, findByQueryParams } = controller;

Router.use(require('../../../middlewares/checkAuthenticated'));

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(findByQueryParams)
    .delete(deleteOne)

module.exports = Router;