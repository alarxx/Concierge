const {Schema, model} = require('mongoose');

const Company = require('./Company');

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
	company: {
		type: Schema.Types.ObjectId,
		ref: 'Company'
	},
	entity: {
		type: String,
		enum: ['individual', 'juridical'], // Может ли он делать какие то действия от лица компании или только пользоваться
		default: 'individual'
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
