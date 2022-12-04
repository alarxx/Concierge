const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //for errors

const ServiceSchema = new Schema({
	type: {
		type: String,
    enum: ['hotel', 'car', 'ship', 'airplane'],
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	bill: {
		type: ,
	},
	partner: {
		type: ,
	},
  files: {
    type: ,
  },
  images: {
    type: ,
  },
});

ServiceSchema.plugin(uniqueValidator);

const Service = model('User', ServiceSchema);

module.exports = Service;
