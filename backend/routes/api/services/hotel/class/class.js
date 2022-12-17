/**
 * Полный CRUD
 * + add, remove to field images: Array
 * */

const express = require('express');

const Router = express.Router();

const controller = require('../../../../../controllers/api/services/hotel/class/class');

const {c, r, u, d} = controller;
Router.post('/', c);
Router.get('/', r)
Router.put('/', u)
Router.delete('/', d);

const {addImage, removeImage} = controller;
Router.put('/images', addImage);
Router.delete('/images', removeImage);

module.exports = Router;