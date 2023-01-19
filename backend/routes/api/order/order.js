const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/order/order');

const {
    c, r, u, d,
    access,
    findOne, find,
    addToArray, removeFromArray, arrayField,
    deleteAll
} = controller;

Router.route('/')
    .post(c)
    .get(find, r)
    // Нужна ли нам возможность изменять meta? Она ведь заполняется один раз во время flow.
    // Если будет нужна, то лучше переходить по /order/meta и изменять конкретно meta или нет?
    .put(access, findOne, u)
    .delete(access, findOne, d);


Router.delete('/all', access, deleteAll);

/** Работа с массивом bookings */
Router.post('/bookings', arrayField('bookings'), findOne, addToArray);
Router.delete('/bookings', arrayField('bookings'), findOne, removeFromArray);


Router.use('/meta', require('./meta/meta'));


module.exports = Router;