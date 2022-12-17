const {Schema, model} = require('mongoose');

const Company = require('../../Company');
const File = require('../../binaries/File');

const HotelSchema = new Schema({
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
    },
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
});

HotelSchema.plugin(require('mongoose-unique-validator'));

HotelSchema.methods.setFields = function(data){
    if(data) {
        if (data.company) this.company = data.company;
        if (data.name) this.name = data.name;
        if (data.address) this.address = data.address;
        if (data.stars) this.stars = data.stars;
        // if(data.images) this.images = data.images; // опасно
    }
    return this;
}

HotelSchema.methods.deepDelete = async function(){
    await Promise.all(this.images.map(async id => await File.deleteAndRemoveById(id)));
    await this.delete();
    return this;
}

module.exports = model('Hotel', HotelSchema);
