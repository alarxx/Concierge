/**
 * Полный CRUD
 * + add, remove to field images: Array
 * */

const express = require('express');

const Router = express.Router();


const controller = require('../../../../controllers/api/services/hotel/hotel');

const {c, r, u, d} = controller;
Router.post('/', c);
Router.get('/', r)
Router.put('/', u)
Router.delete('/', d);

const {addImage, removeImage} = controller;
Router.put('/images', addImage);
Router.delete('/images', removeImage);

Router.use('/class', require('./class/class'));
Router.use('/booking', require('./booking/booking'));

module.exports = Router;