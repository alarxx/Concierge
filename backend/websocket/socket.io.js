const passport = require('passport');
const auth_listener = require('./listener/auth');
const chat_listener = require('./listener/chat');
const {model} = require("mongoose");

const socket_io = {
    io: null,
    initialize: null
};

socket_io.initialize = function({server, sessionMiddleware, env}) {
    const { Server } = require('socket.io');

    const io_opt={}
    if(env !== 'production') {
        io_opt.cors = {
            origin: ['http://localhost:9000'],
            credentials: true
        };
    }

    const io = new Server(server, io_opt);

    socket_io.io = io;

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));
    io.use(wrap(passport.initialize()));
    io.use(wrap(passport.session()));

    io.use((socket, next)=>{
        if(!socket.request.isAuthenticated()){
            return next(new Error('Unauthorized'))
        }
        const user = socket.request.user;
        socket.join(user.id);
        console.log(`connected socket(${socket.id}):`, user.email)
        next();
    });

    /* запускается только если пользователь авторизован */
    io.on('connection', socket => {
        auth_listener(socket);
        chat_listener(socket);
    });

    return io;
}

module.exports = socket_io;

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/