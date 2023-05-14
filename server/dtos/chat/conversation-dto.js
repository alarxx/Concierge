const mongoose = require("mongoose");
module.exports = (doc, user) => {
    const _doc = doc instanceof mongoose.Model ? doc.toObject() : doc;
    if(_doc._id){
        _doc.id = _doc._id;
    }
    // в зависимости от того, кто спрашивает можно открывать или же закрывать некоторые поля.
    return _doc;
}