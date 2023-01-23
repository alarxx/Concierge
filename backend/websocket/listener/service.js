/*
const colors = require("../../logging/colors");

module.exports = socket => {
    socket.on('/service/message', async (message, setServices) => {
        const Services = require('../../models/modelsManager').models.Service;

        if(!Array.isArray(ids))
            ids = [ids]

        const services = await Services.find({ '_id': { $in: ids } });

        await Promise.all(services.map(async service => {
            await service.populate(service.type);
        }))

        console.log(services)
        // setServices(services)
    })
}

/!*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*!/*/
