/**
 * Meta мы можем только читать и редактировать,
 * за создание и удаления отвечает OrderArch.
 * */

const express = require('express');

const Router = express.Router();

const controller = require('../../../../controllers/api/order/meta/meta');

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

/** Работа с массивом preferred_services */
Router.post('/preferred_services', roleAccess, arrayField('preferred_services'), findOne, changeAccess, addToArray);
Router.delete('/preferred_services', roleAccess, arrayField('preferred_services'), findOne, changeAccess, removeFromArray);

module.exports = Router;
