/**
 * returns a special model of service*_booking
 * */

const express = require('express');

const Router = express.Router();


const {searchAndPopulate, findByQueryIds, r} = require('../../../controllers/api/booking/booking');

// Router.get('/', searchAndPopulate);
Router.get('/', findByQueryIds, r);


module.exports = Router;