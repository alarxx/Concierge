import {Schema} from "mongoose";

/**
 * По умолчанию еще будет иметь _id
 * */
const ServiceSchema = new Schema({
    type: {
        type: String,
        enum: ['hotel/room', 'flight/ticket', 'informal/booking'],
        immutable: true,
        required: true
    },
    'hotel/room': {
        type: Schema.Types.ObjectId,
        ref: 'Hotel/Room',
        immutable: true,
    },
    'flight/ticket': {
        type: Schema.Types.ObjectId,
        ref: 'Flight/Ticket',
        immutable: true,
    },
    'informal/booking': {
        type: Schema.Types.ObjectId,
        ref: 'Informal/Service',
        immutable: true,
    }
});

module.exports = ServiceSchema;