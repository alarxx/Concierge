const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); //for errors

const FileSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	path: {
		type: String,
		unique: true,
		required: true,
	},
	date: {
		type: String,
	},
});

UserSchema.plugin(uniqueValidator);

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
