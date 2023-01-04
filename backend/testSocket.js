const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:9000']
    },
});

io.on('connection', socket => {
    console.log(`connected socket ${socket.id}`);
    socket.on('chat-message', (msg, room) => {
        if(room){
            socket.broadcast.to(room).emit('chat-message', `received a message(${msg}) from a socket(${socket.id}) on room(${room})`);
        }
    });

    socket.on('join-room', (room)=>{
        socket.join(room);
    });
});