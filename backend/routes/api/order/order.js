const express = require('express');

const Router = express.Router();

const controller = require('../../../controllers/api/order/order');

const {
    c, r, u, d,
    findOne, find,
    roleAccess, populateMetas, setMeta,
    addToArray, removeFromArray, arrayField
} = controller;

Router.route('/')
    .post((req, res, next)=>{
        console.log({body: req.body})
        next();
    }, c)
    .get(find, r)
    // Нужна ли нам возможность изменять meta? Она ведь заполняется один раз во время flow.
    // Если будет нужна, то лучше переходить по /order/meta и изменять конкретно meta или нет?
    .put(findOne, roleAccess, u)
    .delete(findOne, roleAccess, d);


Router.delete('/all', controller.deleteAll);


/** Работа с массивом bookings */
Router.post('/bookings', arrayField('bookings'), findOne, addToArray);
Router.delete('/bookings', arrayField('bookings'), findOne, removeFromArray);


Router.use('/meta', require('./meta/meta'));


module.exports = Router;