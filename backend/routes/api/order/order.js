const express = require('express');

const Router = express.Router();

/*Router.get('/create', (req, res)=>{
    try{
        res.sendFile(absPath('views/order/CreateOrder.html'));
    }catch (e){
        res.send(e.message);
    }
});*/

Router.use('/meta', require('./meta/meta'));
Router.use('/block', require('./block/block'));

const controller = require.main.require('./controllers/api/order/order');

/** Просто создает новый Order и Meta */
Router.post('/', controller.c_one);

/** Возвращает все order-а клиента */
Router.get('/', controller.r_all);
/** Возвращает order of id,
 * но только если он принадлежит клиенту */
Router.get('/:id', controller.r_id)

/**  */
Router.put('/', controller.u);

/** Глубокое удаление Order-а */
Router.delete('/:id', controller.d);


/** Работа с массивом bookings */
/*
{
    order: id,
    ...[Bookings]
}
*/
Router.post('/bookings', controller.addBookings);
Router.delete('/bookings', controller.removeBookings);

module.exports = Router;