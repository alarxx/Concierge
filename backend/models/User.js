const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); //for errors

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	roles: {
		type: [String],
		default: ['client'],
	},
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
