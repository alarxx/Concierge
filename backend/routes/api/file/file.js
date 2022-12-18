const express = require('express');
const Router = express.Router();

const {r} = require('../../../controllers/api/file/file');
Router.get('/:id', r);

module.exports = Router;
