const {Schema, model} = require('mongoose');

const PriceSchema = new Schema({
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
	currency: {
		enum: ['usd', 'kzt'],
		type: String,
		default: 'kzt'
	}
});

PriceSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Price', PriceSchema);
