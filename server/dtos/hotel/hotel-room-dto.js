const mongoose = require("mongoose");
module.exports = (doc, user) => {
    const _doc = doc instanceof mongoose.Model ? doc.toObject() : doc;
    if(_doc._id){
        _doc.id = _doc._id;
    }
    return _doc;
}