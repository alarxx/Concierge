module.exports = function(objects){
    return objects.map(obj => {
        obj.id = obj._id;
        delete obj._id;

        return obj;
    });
}