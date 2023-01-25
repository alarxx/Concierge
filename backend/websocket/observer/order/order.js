/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных.
 *
 * Менеджеру 2 раза будет приходить уведомление, если он создал ордер, но не должно меняться состояния ордеров в целом
 * */

const log = require('../../../logging/log');
const colors = require('../../../logging/colors');

async function findSubscribersOf(order){
    const Users = require('../../../models/modelsManager').models.User;

    const subscribers = await Users.find({role: 'manager'});

    const customer = {_id: order.customer};//await User.findOne({id: document.customer});
    subscribers.push(customer);

    return subscribers;
}

async function notify(method, order){
    const io = require('../../../websocket/socket.io').io;

    log(colors.cyan(`--- NOTIFY Order.${method}() ---`), order);

    const subscribers = await findSubscribersOf(order)
    log(colors.cyan(`subscribers(${subscribers.length}):`), subscribers);

    subscribers.map(
        user => {
            try{
                io.to(String(user._id)).emit(`/${method}/order`, order);
            }catch(e){
                log(colors.red(`failed to emit /${method}/order to user(${user._id}) with order:`), order);
            }
        }
    )
}

module.exports = function(schema) {

    schema.post('save', async function(order, next){
        await notify('save', order)
        next();
    });


    schema.post('remove', async function(order, next){
        await notify('delete', order)
        next();
    });


};

