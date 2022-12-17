/**
 * returns a special model of service*_booking
 * */

const express = require('express');

const Router = express.Router();


const {c, r, d} = require('../../../../controllers/api/services/booking/booking');

/*{
    type: 'service*_booking',
    service*_booking: id
}*/
Router.post('/', c)

/** Возвращает все совпавшие с req.query */
/*{
    id: id
    type: String,
    service*_booking: id
}*/
Router.get('/', r);

/** Удаляет один booking и service*_booking совпавший с req.body */
/*{
    id: id
    type: String,
    service*_booking: id
}*/
Router.delete('/', d)

module.exports = Router;