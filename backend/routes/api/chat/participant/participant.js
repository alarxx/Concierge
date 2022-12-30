/**
 * CRD
 * */

const express = require('express');

const Router = express.Router();

const controller = require('../../../../controllers/api/chat/participant/participant');

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

module.exports = Router;