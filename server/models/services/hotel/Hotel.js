const {Schema, model} = require('mongoose');


const HotelSchema = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
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
        rate: {
            type: Number,
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
        main_image: {
            type: Schema.Types.ObjectId,
            ref: 'File',
        },
        images: [{ // Как работать с массивами изображений?
            type: Schema.Types.ObjectId,
            ref: 'File',
        }],
    },
    {
        timestamps: true,
        strict: true,
    }
);

HotelSchema.index({ createdAt: -1 });

HotelSchema.plugin(require('mongoose-unique-validator'));
HotelSchema.plugin(require('../../log-plugin'));
// HotelSchema.plugin(require('../../websocket/observer/hotel-observer'));

HotelSchema.statics.privateFiles = function(){
    // Наверное можно как-то прямо в схему это вписывать {type: Schema.Types.ObjectId, ref: 'File', private: false} типа так
    return [];
}


module.exports = model('Hotel', HotelSchema);
