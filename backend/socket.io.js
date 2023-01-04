module.exports = (server, sessionMiddleware, env) => {
    const { Server } = require('socket.io');

    const io_opt={}
    if(env !== 'production') {
        io_opt.cors = {
            origin: ['http://localhost:9000']
        };
    }
    const io = new Server(server, io_opt);

    const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    io.use((socket, next)=>{
        // console.log(socket.request.session);
        next();
    });

    io.on('connection', socket => {
        // console.log(`connected socket ${socket.id}`);
    });

    return io;
};

