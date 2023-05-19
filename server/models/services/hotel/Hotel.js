const {Schema, model} = require('mongoose');

const HotelSchema = new Schema(
    {
        company: {
            type: Schema.Types.ObjectId,
            ref: 'Company',
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

        city: {
            type: String,
            required: true,
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

        cancellation_policy:{
            type: String,
        },
        check_in_time:{
            type: String,
        },
        check_out_time:{
            type: String,
        },
        food_type: {
            type: String,
        }
    },
    {
        timestamps: true,
        strict: true,
    }
);

HotelSchema.index({ createdAt: 1 });

HotelSchema.path('city').validate({
    isAsync: true,
    validator: async (city) => {
        const {City} = require('../../models-manager');
        const exist = await City.find({ name: city });
        return Boolean(exist);
    },
    message: "This city is not included in the database"
});

HotelSchema.plugin(require('mongoose-unique-validator'));
HotelSchema.plugin(require('../../log-plugin'));
// HotelSchema.plugin(require('../../websocket/observer/hotel-observer'));

HotelSchema.statics.privateFiles = function(){
    // Наверное можно как-то прямо в схему это вписывать {type: Schema.Types.ObjectId, ref: 'File', private: false} типа так
    return [];
}


module.exports = model('Hotel', HotelSchema);
