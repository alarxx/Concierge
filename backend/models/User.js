const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		minLength: 11,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},

	roles: {
		type: String,
		enum: ['client', 'manager', 'moderator', 'admin'],
		lowercase: true,
		default: 'client',
	},
});

UserSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('User', UserSchema);
