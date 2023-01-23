module.exports = function(schema) {
    schema.pre('save', function(){
        this.updatedDate = new Date();
    });
};