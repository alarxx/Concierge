const express = require('express');
const Router = express.Router();

const {r_id} = require('../../controllers/file/file');
Router.get('/:id', r_id);

module.exports = Router;
