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
    filesValidation, roleAccess, changeAccess, readAccess,
} = controller;

Router.route('/')
    .post(roleAccess, filesValidation, c)
    .get(find, readAccess, r)
    .put(roleAccess, filesValidation, findOne, changeAccess, u)
    .delete(roleAccess, findOne, changeAccess, d);

Router.use('/class', require('./class/class'));
Router.use('/booking', require('./booking/booking'));

module.exports = Router;