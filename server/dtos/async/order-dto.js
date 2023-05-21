const orderDto = require("../order-dto");
const logger = require('../../log/logger')('async-order-dto');

function userDto(user){
    if(!user){
        return ({
            id: '',
            name: '',
            email: '',
            phone: '',
        });
    }
    return ({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
    });
}

module.exports = async function asyncOrderDto(model, user){
    const bookingsService = require("../../services/bookings/bookings-service");

    await Promise.all([
        await bookingsService.populateBookings(model),
        await model.populate('customer'),
        await model.populate('manager')
    ])

    const customerDto = userDto(model.customer);
    const managerDto = userDto(model.manager);

    // logger.log("------", ({
    //     order: orderDto(model, user),
    //     customer: model.customer,
    //     manager: model.manager,
    // }));

    return ({
        ...orderDto(model, user),
        customer: customerDto,
        manager: managerDto,
    });
}