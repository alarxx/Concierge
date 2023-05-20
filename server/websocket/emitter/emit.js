const Logger = require('../../log/logger');
const logger = Logger('emit');

module.exports = function emit(method, userId, object){
    const io = require('../../websocket/socket-io').io;
    try{
        io.to(String(userId)).emit(method, object);
    }catch(e){
        logger.error(`failed to emit ${method} to user(${userId}) with message:`, object);
    }
}