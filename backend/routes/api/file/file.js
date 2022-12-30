const express = require('express');
const Router = express.Router();

const {r_id} = require('../../../controllers/api/file/file');
Router.get('/:id', r_id);
// Router.put('/', u);
// Router.delete('/:id', d);

module.exports = Router;
