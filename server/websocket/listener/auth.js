module.exports = socket => {
    socket.on('whoami', setUser => {
        const { user } = socket.request;

        const response = {
            id: user.id,
            name: user.name,
            email: user.email,
            entity: user.entity,
            role: user.role,
        }

        setUser(response);
    })

}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/