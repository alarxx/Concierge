const dtoIncludes = require('./dto-includes');

module.exports = (model) => dtoIncludes(model, [
    'title',
    'body',
    'file',
    'creator',
    'createdAt',
    'updatedAt',
]);