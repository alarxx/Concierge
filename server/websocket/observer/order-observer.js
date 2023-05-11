/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const orderDto = require('../../dtos/order-dto');
const ApiError = require("../../exceptions/ApiError");

const logger = require('../../log/logger')('order-observer');

async function notify(method, order){
    const io = require('../../websocket/socket-io').io;

    const { User, Order } = require('../../models/models-manager');

    const user = order.customer;
    if(!user){
        throw ApiError.ServerError('order-observer.js: Order must have a customer');
    }

    // Должны отправить уведомление о создании или удалении админам и пользователям, имеющим отношение к order
    const admins = await User.find({ role: 'admin' });
    admins.map(admin => {
        if(admin.id == user.id){
            return;
        }
        io.to(String(admin.id)).emit(`/${method}/user`, orderDto(order, admin));
    });
    io.to(String(user.id)).emit(`/${method}/user`, orderDto(order, user));
}

module.exports = function(schema) {
    schema.post('save', async function(orderDoc, next){
        try{
            await notify('save', orderDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });
    schema.post('findOneAndDelete', async function(orderDoc, next){
        try{
            await notify('delete', orderDoc);
            next();
        }
        catch(e){
            logger.log(e);
        }
    });
};