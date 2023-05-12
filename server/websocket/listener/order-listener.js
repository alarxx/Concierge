
const Logger = require('../../log/logger');
const logger = Logger('order-listener');

module.exports = socket => {
    const orderService = require('../../services/order/order-service');

    socket.on('take-order', async (order) => {
        const { user } = socket.request;
        // change status of order, join conversation.
        try{
            logger.log("takeOrder:", {order, user});
            await orderService.takeOrder(order, user);
        }
        catch(e){
            logger.error(e);
        }
    })

}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/