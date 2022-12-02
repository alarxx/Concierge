const {Schema, model} = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator'); //for errors

const BillSchema = new Schema({
	price: {
		type: String,
		required: true,
	},
  file: { 
    type:
  }
});

BillSchema.plugin(uniqueValidator);

const Bill = model('Bill', BillSchema);

module.exports = Bill;
