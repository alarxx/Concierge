const express = require('express');
const Router = express.Router();

const {r_id, download_id} = require('../../controllers/file/file');
Router.get('/:id', r_id);
Router.get('/download/:id', download_id);

module.exports = Router;
