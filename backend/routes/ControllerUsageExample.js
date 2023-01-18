const express = require('express');

const Router = express.Router();

const controller = require('../controllers/api/order/order');

const {
    c, r, u, d,
    findOne, find,
    filesValidation, roleAccess, changeAccess, readAccess,
    addToArray, removeFromArray, arrayField
} = controller;

Router.route('/')
    .post(roleAccess, filesValidation, c)
    .get(find, readAccess, r)
    .put(roleAccess, filesValidation, findOne, changeAccess, u)
    .delete(roleAccess, findOne, changeAccess, d);


/** Работа с массивом bookings */
Router.post('/bookings', arrayField('bookings'), findOne, addToArray);
Router.delete('/bookings', arrayField('bookings'), findOne, removeFromArray);


module.exports = Router;