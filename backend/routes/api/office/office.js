/**
 * Работа с Office моделью
 * */

const express = require('express');

const Router = express.Router();

const {searchAndPopulate} = require('../../../controllers/api/service/service');

/** Возвращает все совпавшие с req.query */
Router.get('/extended', searchAndPopulate);

module.exports = Router;