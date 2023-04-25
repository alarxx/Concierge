const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/user/user-controller');

const { createOne, findByQueryParams, updateOne, deleteOne } = controller;

Router.use(require('../../../middlewares/checkAuthenticated'));
Router.use(require('../../../middlewares/checkAdminRole'));

Router.route('/')
    .post(createOne)
    .patch(updateOne)
    .get(findByQueryParams)
    .delete(deleteOne)

module.exports = Router;