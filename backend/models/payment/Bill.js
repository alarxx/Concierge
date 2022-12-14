const {Schema, model} = require('mongoose');

const PriceModel = require('./Price');
const UserModel = require('../User');
const FileModel = require("../binaries/File");

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

/**
 * Метод создает, сохраняет локально файл и добавляет его id в файлы пост
 * */
BillSchema.methods.addFile = async function(multifile, userId){
	// Метод полностью опирается на FileModel.createAndMove
	const res = await FileModel.createAndMove(multifile, userId);

	if(!this.files)
		this.files = [];

	if(res.status === 'success')
		this.files.push(res.doc.id);

	return res;
}

BillSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Bill', BillSchema);
