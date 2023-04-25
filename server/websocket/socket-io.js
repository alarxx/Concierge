const passport = require('passport');
const { Server } = require("socket.io");

const auth_listener = require('./listener/auth-listener');

const logger = require('../log/logger')('socket-io')

let socket_io = {
    initialize: null,
    io: null
};

socket_io.initialize = function({ server, sessionMiddleware }){
    const io_opt = {}
    if(process.env.NODE_ENV === 'development') {
        io_opt.cors = {
            // origin: '*',
            origin: ['http://localhost:9000'],
            // methods: ["GET", "POST"],
            credentials: true,
            // нужно добавить storage для комнат
        };
    }
    const io = new Server(server, io_opt);

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
        logger.log(`connected socket(${socket.id}):`, user.email)
        next();
    });

    /* запускается только если пользователь авторизован */
    io.on('connection', socket => {
        // auth_listener(socket);
    });

    socket_io.io = io;
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