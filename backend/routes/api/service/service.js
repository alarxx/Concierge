/**
 * returns a special model of service*_booking
 * */

const express = require('express');

const Router = express.Router();


const {r, d} = require('../../../controllers/api/service/service');

/** Возвращает все совпавшие с req.query */
Router.get('/', r);

/** Удаляет один booking и service*_booking совпавший с req.body */
Router.delete('/', d)

module.exports = Router;