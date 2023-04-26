const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/company/company-controller');

const { createOne, updateOne, deleteOne, findByQueryParams } = controller;

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(findByQueryParams)
    .delete(deleteOne)

module.exports = Router;