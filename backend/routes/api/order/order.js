const express = require('express');

const Router = express.Router();

const controller = require.main.require('./controllers/api/order/order');

/** Просто создает новый Order и Meta */
Router.post('/', controller.c);

/** Возвращает все order-а клиента */
Router.get('/', controller.r);

/**  */
Router.put('/', controller.u);

/** Глубокое удаление Order-а */
Router.delete('/', controller.d);


/** Работа с массивом bookings */
/*
{
    order: id,
    Booking
}
*/
Router.post('/bookings', controller.addBooking);
Router.delete('/bookings', controller.removeBooking);

Router.use('/meta', require('./meta/meta'));

module.exports = Router;