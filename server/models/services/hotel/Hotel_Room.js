const {Schema, model} = require('mongoose');


const RoomSchema = new Schema(
    {
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

RoomSchema.index({ createdAt: 1 });

RoomSchema.plugin(require('mongoose-unique-validator'));
RoomSchema.plugin(require('../../log-plugin'))
// ServiceSchema.plugin(require('../../websocket/observer/hotel-room-observer'));

RoomSchema.statics.privateFiles = function(){
    return [];
}

module.exports = model('Hotel/Room', RoomSchema);
