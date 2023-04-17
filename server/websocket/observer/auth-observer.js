/**
 * */

const userDto = require('../../dtos/user-dto');
async function notify(method, user){
    const io = require('../../websocket/socket-io').io;
    try{
        io.to(String(user.id)).emit(`/${method}/auth`, userDto(user));
    }catch(e){
        console.log(e);
    }

}
module.exports = function(schema) {
    schema.post('save', async function(document, next){
        await notify('save', document)
        next();
    });
    schema.post('findOneAndDelete', async function(document, next){
        await notify('delete', document)
        next();
    });
};