const ApiError = require("../../exceptions/ApiError");
const checkNecessaryFields = require("./checkNecessaryFields");

module.exports = function(Model, dto) {

    return async function(filters, user) {

        if (!user) {
            throw ApiError.ServerError('user is missing')
        }

        checkNecessaryFields(filters, ['skip', 'limit']);

        const {skip, limit} = filters;
        // Все эти значения string, выглядеть будут примерно так -createdAt, потом нужно будет распарсить.
        // А что если сделать сортировку по несуществующему полю?
        // Потом нужно удалить из filters эти значения

        let sort;
        if (!filters.sort) {
            sort = {createdAt: -1}; // сначала новые?
        } else {
            const _sort = filters.sort;
            const fieldName = _sort.startsWith('-') ? _sort.slice(1) : _sort;
            const sortDirection = _sort.startsWith('-') ? -1 : 1;
            sort = {[fieldName]: sortDirection}
        }

        delete filters.skip;
        delete filters.limit;
        delete filters.sort;

        const items = await Model.find(filters)
            .sort(sort)
            .skip(skip)
            .limit(limit);

        return items.map(item => dto(item));
    }

}