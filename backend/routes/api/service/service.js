/**
 * returns a special model of service*_booking
 * */

const express = require('express');

const Router = express.Router();


const {searchAndPopulate} = require('../../../controllers/api/service/service');

/** Возвращает все совпавшие с req.query */
Router.get('/', searchAndPopulate);

module.exports = Router;