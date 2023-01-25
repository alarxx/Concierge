const {Schema, model} = require('mongoose');

const modelName = 'Hotel';

const Company = require('../../company/Company');
const File = require('../../binaries/File');

const HotelSchema = new Schema({
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
    description: {
        type: String,
    },
    address: {
        type: String,
        // ref: 'Address'
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
    },
    logo: {
        type: Schema.Types.ObjectId,
        ref: 'File'
    },
    images: [{ // Как работать с массивами изображений?
        type: Schema.Types.ObjectId,
        ref: 'File',
    }],
    createdDate: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedDate: {
        type: Date,
        default: () => new Date(),
    }
});

HotelSchema.plugin(require('mongoose-unique-validator'));
HotelSchema.plugin(require('../../updatedDate'));
HotelSchema.plugin(require('../../logPlugin'));

const handlers = require('../../handlers');
const Hotel_Service = require('./Hotel_Service');
const colors = require("../../../logging/colors");

HotelSchema.statics.publicFiles = function(){
    // Наверное можно как-то прямо в схему это вписывать {type: Schema.Types.ObjectId, ref: 'File', private: false} типа так
    return ['logo'];
}

HotelSchema.methods.onCreate = async function({body}){
    const Offices = require('../../modelsManager').models.Office;

    const office = new Offices({
        company: body.company,
        type: 'hotel',
        hotel: this.id
    });
    this.office = office.id;
    await office.save();
    // Возможно нужна проверка существования отеля
}

HotelSchema.methods.deepDelete = async function(){
    //Еще надо удалить все Hotel/Service, которые принадлежат этому отелю
    const hotels = await Hotel_Service.find({hotel: this.id});
    // console.log(colors.red('services[]='), hotels);
    await Promise.all(hotels.map(async hotel => hotel.deepDelete()));


    // if(this.logo) await File.deepDeleteById(this.logo);
    await handlers.deleteModels(this, ['logo', 'office']);

    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));
    await handlers.deleteArraysOfModels(this, ['images']);

    await this.delete();
    return this;
}

module.exports = model(modelName, HotelSchema);
