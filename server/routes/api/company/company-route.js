const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/company/company-controller');

const { createOne, updateOne, deleteOne, findByQueryParams, pagination } = controller;

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(findByQueryParams)
    .delete(deleteOne)

Router.route('/pagination')
    .get(pagination);

module.exports = Router;