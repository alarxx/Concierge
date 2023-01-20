/**
 * Полный CRUD
 * + add, remove to field images: Array
 * */

const express = require('express');

const Router = express.Router();


const controller = require('../../../controllers/api/hotel/hotel');

const {
    c, r, u, d,
    findOne, find,
    filesValidation
} = controller;

Router.route('/')
    .post(filesValidation, c)
    .get(find, r)
    .put(filesValidation, findOne, u)
    .delete(findOne, d);

Router.use('/service', require('./service/service'));
Router.use('/booking', require('./booking/booking'));

module.exports = Router;