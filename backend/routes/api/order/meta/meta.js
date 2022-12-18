/**
 * Meta мы можем только читать и редактировать,
 * за создание и удаления отвечает Order.
 * */

const express = require('express');

const Router = express.Router();

const controller = require.main.require('./controllers/api/order/meta/meta');

Router.get('/', controller.r);

/** назначает field-ы */
/*
{
    id,
    ...primitive fields
}
*/
Router.put('/', controller.u);

/** Работа с массивом preferred_services */
/*
{
    id,
    ...Service
}
*/
Router.post('/preferred_services', controller.addService);
Router.delete('/preferred_services', controller.removeService);

module.exports = Router;
