const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //for errors

const OrderSchema = new Schema({
	service_id: {
		type: ,
		required: true,
	},
	client_id: {
		type: ,
		required: true,
	},
	manager_id: {
		type: [],
    required: true,
	},
  status:{
    type: String,
    enum: ['', ''],
		required: true,
  },
	bill: {
		type: ,
	},
  files: {
    type: ,
  },
  images: {
    type: ,
  },
});

OrderSchema.plugin(uniqueValidator);

const Order = model('Order', OrderSchema);

module.exports = Order;
