/**
 *
 * */

const express = require('express');

const Router = express.Router();


const controller = require('../../../controllers/api/company/company');

const {
    c, r, u, d,
    findOne, find, findByQueryIds,
    filesValidation,
    addToArray, removeFromArray, arrayField
} = controller;

Router.route('/')
    .post(filesValidation, c)
    .get(findByQueryIds, r)
    .put(filesValidation, findOne, u)
    .delete(findOne, d);


// Router.post('/images', addImage);
// Router.delete('/images', removeImage);


module.exports = Router;