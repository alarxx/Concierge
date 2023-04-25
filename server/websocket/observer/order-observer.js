/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const userDto = require('../../dtos/user-dto');
const orderDto = require('../../dtos/order-dto');

async function notify(method, order){
    const { User, Order } = require('../../models/models-manager');

    const io = require('../../websocket/socket-io').io;

    try{
        // Должны отправить уведомление о создании или удалении админам и пользователям, имеющим отношение к order
    }
    catch(e){
        console.log(e);
    }

}
module.exports = function(schema) {
    schema.post('save', async function(order, next){
        await notify('save', order)
        next();
    });
    schema.post('findOneAndDelete', async function(order, next){
        await notify('delete', order)
        next();
    });
};