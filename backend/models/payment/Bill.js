const {Schema, model} = require('mongoose');

const Price = require('./Price');
const User = require('../User');
const File = require('../binaries/File');

const BillSchema = new Schema({
	customer: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	price: {
		type: Schema.Types.ObjectId,
		ref: 'Price',
		required: true,
	},
	isPaid: {
		type: Boolean,
		default: false
	},
	file: {
		type: Schema.Types.ObjectId,
		ref: 'File',
	},
});

BillSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Bill', BillSchema);
