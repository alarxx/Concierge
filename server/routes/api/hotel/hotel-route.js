const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/hotel/hotel-controller');

const checkAuthenticated = require('../../../middlewares/checkAuthenticated');
const checkAdminRole = require('../../../middlewares/checkAdminRole');

const { createOne, updateOne, deleteOne, findByQueryParams, pagination, findById } = controller;

Router.route('/')
    .post(checkAdminRole, createOne)
    .patch(checkAdminRole, updateOne)
    .get(findByQueryParams)
    .delete(checkAdminRole, deleteOne)

Router.route('/pagination')
    .get(checkAuthenticated, pagination);

Router.route('/:id')
    .get(checkAuthenticated, findById);

Router.use('/room', require('./room/hotel-room-route'));

module.exports = Router;