/**
 * Идея в том, чтобы уведомлять пользователей о каких-то изменениях в базе данных.
 * Нужно админам и возможно менеджерам Concierge и партнерам об их клиентах.
 * */

const userDto = require('../../dtos/user-dto');

const logger = require('../../log/logger')('user-observer');

async function notify(method, user){
    const io = require('../socket-io').io;

    const { User } = require('../../models/models-manager');

    // Эта строка выполняется в auth-observer, здесь мы только админов уведомляем об изменении
    // io.to(String(user.id)).emit(`/${method}/user`, userDto(user));
    const admins = await User.find({ role: 'admin' });
    admins.map(admin => {
        if(admin.id == user.id){
            return;
        }
        io.to(String(admin.id)).emit(`/${method}/user`, userDto(user));
    });
}

module.exports = function(schema) {

    schema.post('save', async function(userDoc, next){
        try{
            await notify('save', userDoc);
            next();
        }catch(e){
            logger.log(e);
        }
    });

    schema.post('findOneAndDelete', async function(userDoc, next){
        try{
            await notify('delete', userDoc);
            next();
        }catch(e){
            logger.log(e);
        }
    });

};