const {Schema, model} = require('mongoose');


const ServiceSchema = new Schema({
    flight: {
        type: Schema.Types.ObjectId,
        ref: 'Flight',
        required: true,
        immutable: true,
    },

    class: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    description: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    isActive: Boolean, // Например, поменяли цену
});


ServiceSchema.plugin(require('mongoose-unique-validator'));
ServiceSchema.plugin(require('../../log-plugin'))


ServiceSchema.statics.privateFiles = function(){
    return [];
}


/*ServiceSchema.methods.onCreate = async function({res, req, body, user}){
    const Services = require('../../modelsManager').models.Service;
    const Flights = require('../../modelsManager').models.Flight;

    // Creating service

    const service = new Services({
        type: 'flight/service',
        'flight/service': this.id
    })
    this.service = service.id; // Обязательно должно быть раньше this.validate()

    if(!body.flight) {
        await this.validate();
    }

    const flight = await Flights.findById(body.flight);
    if(!flight){
        return res.status(400).json({error: "Flight not found"});
    }

    service.office = flight.office;

    await service.save();

    // flight сетится в контроллере
}*/

/*ServiceSchema.methods.deepDelete = async function(){
    await handlers.deleteModels(this, ['logo', 'service']);
    await handlers.deleteArraysOfModels(this, ['images']);

    const Flight_Bookings = require('../../modelsManager').models.Flight_Booking;
    //Должен удалить service, прикрепленный к нему, и все букинги, которые отсылаются на него
    const bookings = await Flight_Bookings.find({'flight/service': this.id});
    // console.log(colors.red('bookings[]='), bookings);
    await Promise.all(bookings.map(async booking => await booking.deepDelete()));

    await this.delete();

    return this;
}*/

module.exports = model('Flight/Service', ServiceSchema);
