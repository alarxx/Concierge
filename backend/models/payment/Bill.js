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

BillSchema.static.createBill = async function(user){
	const price = await new PriceModel({}).save();
	return await new this({
		customer: user.id,
		price: price.id,
	}).save();
};

BillSchema.method.deleteBill = async function(){
	// const bill = await this.findById(id);
	// if(!bill) throw Error('No bill ');

	const price = await PriceModel.find({price: this.price});
	const file = await FileModel.find({file: this.file});

	await this.delete();
	if(price)
		await price.delete();
	if(file)
		await file.deleteAndRemove();

};

/**
 * Метод будет использоваться во время update
 * Метод нужен потому что не получается использовать распространение объекта
 * returns document itself
 * */
BillSchema.methods.setFields = async function(data){
	// line by line all fields if they exist
	if(data.isPaid)
		this.isPaid = data.isPaid;

	return this;
}

/**
 * Метод создает, сохраняет локально файл и добавляет его id в файлы пост
 * */
// BillSchema.static.addFile = async function(multifile, user_id){
// 	// Метод полностью опирается на FileModel.createAndMove
// 	const res = await FileModel.createAndMove(multifile, user_id);
//
// 	if(!this.files)
// 		this.files = [];
//
// 	if(res.status === 'success')
// 		this.files.push(res.doc.id);
//
// 	return res;
// }

BillSchema.plugin(require('mongoose-unique-validator'));

module.exports = model('Bill', BillSchema);
