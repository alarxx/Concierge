const express = require('express');
const Router = express.Router();

const { r_id, download_id } = require('../../controllers/file/file-controller');

Router.get('/:id', r_id);
Router.get('/d/:id', download_id);

module.exports = Router;
