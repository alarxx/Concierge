/**
 * Meta мы можем только редактировать,
 * за создание и удаления отвечает Order.
 * */

const express = require('express');

const Router = express.Router();

const controller = require.main.require('./controllers/api/order/meta/meta');

/** назначает field-ы */
/*
{
    order: id,
    ...primitive fields
}
*/
Router.put('/', controller.u);

/** Работа с массивом preferred_services */
/*
{
    order: id,
    ...[Services]
}
*/
Router.post('/preferred_services', controller.addService);
Router.delete('/preferred_services', controller.removeService);

module.exports = Router;
