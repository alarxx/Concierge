const mongoose = require("mongoose");

const Logger = require('../../log/logger');
const logger = Logger('hotel-dto');

module.exports = (doc, user) => {
    // logger.log("doc instanceof mongoose.Model", doc instanceof mongoose.Model);
    const _doc = doc instanceof mongoose.Model ? doc.toObject() : doc;
    if(_doc._id){
        _doc.id = _doc._id;
    }
    return _doc;
}