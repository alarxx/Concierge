const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/user/user');

const {
    c, r, u, d,
    access,
    findOne, find,
    addToArray, removeFromArray, arrayField, findById,
    deleteAll
} = controller;

Router.route('/')
    .post(access, c)
    .get(access, find, r)
    .put(access, findOne, u)
    .delete(access, findOne, d);

module.exports = Router;