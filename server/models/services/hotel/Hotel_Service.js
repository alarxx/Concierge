const {Schema, model} = require('mongoose');


const ServiceSchema = new Schema(
    {
        service: { // foreign/primary key как-будто
            type: Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
            immutable: true,
            unique: true,
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: true,
            immutable: true,
        },
        name: {
            type: String,
            required: true,
        },
        class: { // рандомная строка (A1, B1, VIP)
            type: String,
        },
        rate: {
            type: Number,
        },
        price: {
            type: Number, // or String?
            required: true,
        },
        discount: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        description: String,
        isActive: Boolean, // Например, поменяли цену, мы можем заменить напрямую цену?
        rooms_num: {
            type: Number,
        },
        logo: {
            type: Schema.Types.ObjectId,
            ref: 'File'
        },
        images: [{ //?
            type: Schema.Types.ObjectId,
            ref: 'File'
        }],
        contact_name: {
            type: String,
        },
        contact_phone:{
            type: String
        }
    },
    {
        timestamps: true,
        strict: true,
    }
);


ServiceSchema.plugin(require('mongoose-unique-validator'));
ServiceSchema.plugin(require('../../log-plugin'))


ServiceSchema.statics.privateFiles = function(){
    return [];
}

/*ServiceSchema.methods.onCreate = async function({res, req, body, user}){
    const service = new Service({
        type: 'hotel/service',
        'hotel/service': this.id
    })
    this.service = service.id

    const Hotels = require('../../modelsManager').models.Hotel;
    // Creating service
    if(!body.hotel) {
        await this.validate();
    }

    const hotel = await Hotels.findById(body.hotel);
    if(!hotel){
        return res.status(400).json({error: "Hotel not found"});
    }

    service.office = hotel.office;

    await service.save();
}*/

/*ServiceSchema.methods.deepDelete = async function(){
    await handlers.deleteModels(this, ['logo', 'service']);

    await handlers.deleteArraysOfModels(this, ['images']);

    //Должен удалить service, прикрепленный к нему, и все букинги, которые отсылаются на него
    const bookings = await Hotel_Booking.find({'hotel/service': this.id});
    // console.log(colors.red('bookings[]='), bookings);
    await Promise.all(bookings.map(async booking => await booking.deepDelete()));

    await this.delete();

    return this;
}*/


module.exports = model('Hotel/Service', ServiceSchema);
