const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/hotel/hotel-controller');

const checkAdminRole = require('../../../middlewares/checkAdminRole');

const { createOne, updateOne, deleteOne, findByQueryParams, pagination } = controller;

Router.route('/')
    .post(checkAdminRole, createOne)
    .patch(checkAdminRole, updateOne)
    .get(findByQueryParams)
    .delete(checkAdminRole, deleteOne)

Router.route('/pagination')
    .get(pagination);

Router.use('/room', require('./room/hotel-room-route'));

module.exports = Router;