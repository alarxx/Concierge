const ApiError = require("../../exceptions/ApiError");
const ModelService = require("./ModelService");

module.exports = function(Model, dto){

    const modelService = new ModelService(Model);

    return async function(filters, user) {
        if (!user) {
            throw ApiError.ServerError('user is missing')
        }

        if (!filters) {
            filters = {};
        }

        const pkeys = modelService.get_pkeys(filters);
        if(pkeys.length > 1){
            modelService.moreThanOnePkeyError();
        }

        // Нет pkeys, только какие-то фильтры.
        // При отсутствии фильтров будет выдавать все документы.
        if(pkeys.length < 1){
            const models = await Model.find(filters); // запрос на получение документов
            return models.map(m => dto(m));
        }

        // else pkeys.length = 1

        const pkey = pkeys[0];

        const values = filters[pkey].split(','); // разбиваем строку на массив

        delete filters[pkey];

        const models = await Model.find({ ...filters, [pkey==='id'?'_id':pkey]: { $in: values } }); // запрос на получение документов
        return models.map(m => dto(m));
    }

}
