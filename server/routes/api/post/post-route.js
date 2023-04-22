const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/post/post-controller');

const { createOne, findByQueryParams, updateOne, deleteOne, pagination } = controller;

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(pagination)
    .delete(deleteOne)

module.exports = Router;