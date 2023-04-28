const colors = require("../log/colors");
const logger = require("../log/logger")('log-plugin')

// (modelName) =>
module.exports = function(schema) {
    schema.post('save', function(document, next){
        logger.log(colors.green('saved:'), {[this.constructor.modelName]: this});
        next();
    });
    schema.post('findOneAndDelete', function(document, next){
        logger.log(colors.red('removed:'), {[document.constructor.modelName]: document});
        next();
    });
};


