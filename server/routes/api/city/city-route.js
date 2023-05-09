const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/city/city-controller');

const checkAuthenticated = require('../../../middlewares/checkAuthenticated');
const checkAdminRole = require('../../../middlewares/checkAdminRole');

const { createOne, deleteOne, findByQueryParams } = controller;

Router.route('/')
    .post(checkAdminRole, createOne)
    .delete(checkAdminRole, deleteOne)
    .get(checkAuthenticated, findByQueryParams)

module.exports = Router;