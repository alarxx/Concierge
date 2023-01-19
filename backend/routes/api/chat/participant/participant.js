/**
 * CRD
 * */

const express = require('express');

const Router = express.Router();

const controller = require('../../../../controllers/api/chat/participant/participant');

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

module.exports = Router;