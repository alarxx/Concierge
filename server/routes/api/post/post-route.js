const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/post/post-controller');

const { createOne, findByQueryParams, updateOne, deleteOne } = controller;

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(findByQueryParams)
    .delete(deleteOne)

module.exports = Router;