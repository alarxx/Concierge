const dtoIncludes = require('./dto-includes');

module.exports = (model) => dtoIncludes(model, [
    'title',
    'body',
    'user',
    'file',
    'updatedAt'
]);