const passport = require('passport');
const auth_listener = require('./listener/auth');

module.exports = ({server, sessionMiddleware, env, sessionStore}) => {
    const { Server } = require('socket.io');

    const io_opt={}
    if(env !== 'production') {
        io_opt.cors = {
            origin: ['http://localhost:9000'],
            credentials: true
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
        console.log(`connected socket(${socket.id}):`, socket.request.user.email)
        next();
    });

    /* запускается только если пользователь авторизован */
    io.on('connection', socket => {
        auth_listener(socket);

    });


    return io;
};

