const {Schema, model} = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); //for errors

const RateSchema = new Schema({
	user_id: {
		type: String,
		required: true,
	},
	rating: {
		type: String,
		unique: true,
		required: true,
	},
});

RateSchema.plugin(uniqueValidator);

const Rate = model('Rating', RateSchema);

module.exports = Rate;
