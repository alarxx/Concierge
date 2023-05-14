const orderDto = require("../order-dto");
module.exports = async function(model, user){
    const bookingsService = require("../../services/bookings/bookings-service");
    const {User} = require("../../models/models-manager");
    await bookingsService.populateBookings(model);
    const customer = await User.findById(model.customer);
    const customerDto = ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
    });
    /*logger.log("------", ({
        ...orderDto(o, user),
        customer: customerDto
    }));*/
    return ({
        ...orderDto(model, user),
        customer: customerDto
    });
}