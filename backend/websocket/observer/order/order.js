/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const log = require('../../../logging/log');
const colors = require('../../../logging/colors');

const io = require('../../../websocket/socket.io').io;

const User = require('../../../models/User');

async function findSubscribersOf(order){
    const customer = {_id: order.customer};//await User.findOne({id: document.customer});
    const subscribers = await User.find({role: 'manager'});
    subscribers.push(customer);
    return subscribers;
}

module.exports = function(schema) {

    schema.post('save', async function(order, next){

        log(colors.cyan("Order.save() notify"), order);

        const subscribers = await findSubscribersOf(order)
        log(colors.cyan(`subscribers(${subscribers.length}):`), subscribers);

        subscribers.map(
            user => {
                try{
                    io.to(user._id).emit("/save/order", order);
                }catch(e){
                    log(colors.red(`failed to emit /save/order to user(${user.email}) with order:`), order);
                }
            }
        )

        next();
    });
    schema.post('remove', async function(order, next){
        log(colors.cyan("Order.delete() notify"), order);

        const subscribers = await findSubscribersOf(order)
        log(colors.cyan(`subscribers(${subscribers.length}):`), subscribers);

        subscribers.map(
            user => {
                try{
                    io.to(user._id).emit("/delete/order", order);
                }catch(e){
                    log(colors.red(`failed to emit /delete/order to user(${user.email}) with order:`), order);
                }
            }
        )
        next();
    });
};

