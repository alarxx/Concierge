const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:9000']
    },
});

io.on('connection', socket => {
    console.log(socket.id);
});