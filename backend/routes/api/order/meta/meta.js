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
    filesValidation,
    addToArray, removeFromArray, arrayField
} = controller;

Router.route('/')
    .post(filesValidation, c)
    .get(find, r)
    .put(filesValidation, findOne, u)
    .delete(findOne, d);

/** Работа с массивом preferred_services */
Router.post('/preferred_services', arrayField('preferred_services'), findOne, addToArray);
Router.delete('/preferred_services', arrayField('preferred_services'), findOne, removeFromArray);

module.exports = Router;
