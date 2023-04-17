/**
 * Идея в том, чтобы уведомлять пользователя о каких-то изменениях в базе данных
 * */

const userDto = require('../../dtos/user-dto');

async function notify(method, user){
    const {User} = require('../../models/models-manager');

    const io = require('../../websocket/socket-io').io;
    try{
        // Эта строка выполняется в auth-observer, здесь мы только админов уведомляем об изменении
        // io.to(String(user.id)).emit(`/${method}/user`, userDto(user));
        const admins = await User.find({ role: 'admin' });
        admins.map(admin => {
            if(admin.id === user.id){
                return;
            }
            io.to(String(admin.id)).emit(`/${method}/user`, userDto(user));
        });
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