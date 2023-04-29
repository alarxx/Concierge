module.exports = (doc) => {
    if(doc._id){
        doc.id = doc._id;
        delete doc._id;
    }
    return doc;
}