const log = require("../log");
const colors = require("../colors");
module.exports = function(schema) {
    schema.post('save', function(document, next){
        log(colors.green('saved:'), {[this.constructor.modelName]: document});
        next();
    });
    schema.post('remove', function(document, next){
        log(colors.green('removed:'), {[this.constructor.modelName]: document});
        next();
    });
};