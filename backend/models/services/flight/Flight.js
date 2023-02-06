const {Schema, model} = require('mongoose');

const FlightSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        immutable: true,
    },
    office: {
        type: Schema.Types.ObjectId,
        ref: 'Office',
        required: true,
        immutable: true,
    },

    name: {
        type: String,
        required: true,
    },
    placeOfArrival: {
        type: String, // Schema.Types.ObjectId or Number?
    },
    placeOfDeparture: {
        type: String,
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    }
});

FlightSchema.plugin(require('mongoose-unique-validator'));
FlightSchema.plugin(require('../../updatedDate'));
FlightSchema.plugin(require('../../logPlugin'));

const handlers = require('../../handlers');
const colors = require("../../../logging/colors");

FlightSchema.statics.publicFiles = function(){
    // Наверное можно как-то прямо в схему это вписывать {type: Schema.Types.ObjectId, ref: 'File', private: false} типа так
    return ['logo'];
}


FlightSchema.methods.onCreate = async function({body}){
    if(body.flight || body.type)
        return new Error(`You cannot manually enter the 'type' and specific '*service' fields`);

    const Offices = require('../../modelsManager').models.Office;

    const office = new Offices({
        company: body.company,
        type: 'flight',
        flight: this.id
    });

    this.office = office.id;
    await office.save();
}

FlightSchema.methods.deepDelete = async function(){
    await handlers.deleteModels(this, ['logo', 'office']);

    const Flight_Services = require('../../modelsManager').models.Flight_Service;
    //Еще надо удалить все Flight/Service, которые принадлежат этому отелю
    const flights = await Flight_Services.find({flight: this.id});
    // console.log(colors.red('services[]='), flights);
    await Promise.all(flights.map(async flight => await flight.deepDelete()));

    await this.delete();
    return this;
}

module.exports = model('Flight', FlightSchema);
