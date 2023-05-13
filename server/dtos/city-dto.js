module.exports = (doc, user) => {
    return ({
        id: doc._id ? doc._id : doc.id,
        name: doc.name
    });
}