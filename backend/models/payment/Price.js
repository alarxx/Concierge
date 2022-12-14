const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
	price: {
		type: Number, // or String?
		required: true,
	},
	discount: {
		type: Number,
		min: 0,
		max: 100,
		required: true,
	}
});

UserSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('User', UserSchema);
