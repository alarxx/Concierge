/**
 * Почему не используем класс?
 * При использовании класса не очевидно, что каждая функция внутри статичная.
 *
 * */

const ApiError = require("../../exceptions/ApiError");
const Logger = require('../../log/logger');
const ModelService = require("../helpers/ModelService");

/**
 * Если классы не работают, используем замыкания.
 *
 * Пример как реализовывать CRUD API.
 * По умолчанию, предполагается, что этим сервисом будут пользоваться только админы.
 *
 * Create, Update, Delete в любом случае должны делать только аутентифицированные пользователи. В каком случае может быть не так?
 *
 * dto - data transfer object модели.
 * creatorField - поле куда вписываем id создателя: для постов это author, для заказов это customer и так далее.
 * */
module.exports = (Model, dto=f=>f, opts={ creatorField: 'creator' }) => {

    const modelService = new ModelService(Model);

    // логировать от имени модели
    const logger = Logger(`${modelService.modelName}-Service`);

    /**
     * Эта функция проверяет наличие обязательных полей в теле запроса body.
     * Если какие-то поля отсутствуют, то функция генерирует ошибку BadRequest с сообщением,
     * которое указывает на отсутствующие поля.
     * */
    function checkNecessaryFields(body={}, fields=['skip', 'limit']){
        const missingFields = fields.filter(field => !body[field]);
        if (missingFields.length) {
            throw ApiError.BadRequest(`Required fields missing: ${missingFields.map(field => `'${field}'`).join(', ')}`);
        }
    }

    return ({

        async createOne(body, files, user) {
            if (!files) {
                files = {};
            }
            if (!user) {
                logger.log({body, files, user});
                throw ApiError.ServerError('user is missing');
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
            }

            // Нужно найти unique поля?
            // Можно просто засетить полностью и попытаться сохранить с файлами
            await modelService.deleteInvalidFileFields(body);

            const model = new Model({...body, [opts.creatorField]: user.id});

            logger.log("createOne", {body, model});

            await modelService.saveWithFiles(model, files, { user });

            return model; // dto(model);
        },


        /**
         * Скорее всего у разных моделей будет разный find.
         * Где-то нужно только одну модель найти, где-то по id-шке, где-то сразу по нескольким id-шкам.
         * Где-то нужно не по отдельности искать, а нужна пагинация массива документов.
         * */
        async findByQueryParams(filters, user) {
            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
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
                return await Model.find(filters); // запрос на получение документов
            }

            // else pkeys.length = 1

            const pkey = pkeys[0];

            const values = filters[pkey].split(','); // разбиваем строку на массив

            delete filters[pkey];

            const models = await Model.find({ ...filters, [pkey==='id'?'_id':pkey]: { $in: values } }); // запрос на получение документов

            return models; // models.map(m => dto(m));
        },


        async pagination(filters, user){ //, skip, limit, sort) { // query
            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
            }

            checkNecessaryFields(filters, ['skip', 'limit']);

            const { skip, limit, sort } = filters;
            // Все эти значения string, выглядеть будут примерно так -createdAt, потом нужно будет распарсить.
            // А что если сделать сортировку по несуществующему полю?
            // Потом нужно удалить из filters эти значения

            delete filters.skip;
            delete filters.limit;

            const items = await Model.find(filters)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit);

            return items.map(item => dto(item));
        },


        async updateOne(body, files, user) {
            if(!files){
                files = {};
            }
            if(!body){
                body = {};
            }

            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
            }
            if (Object.keys(body).length + Object.keys(files).length < 2) {
                throw ApiError.BadRequest("Empty request body or too few fields");
            }

            const pkey = modelService.get_pkey(body);

            const model = await Model.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
            if (!model) {
                throw ApiError.NotFound(`${modelService.modelName} not found`)
            }

            /*
            * Здесь нужна проверка есть ли строка файла, но там нет файла
            * Это нужно, чтобы удалять файлы.
            * */
            /* Следующие 2 строчки можно объединить и назвать set */
            await modelService.deleteInvalidFileFields(body, model);
            model.set(body);

            await modelService.saveWithFiles(model, files, { user });

            return model; // dto(model);
        },


        async deleteOne(body, user) {
            if (!body || !user) {
                throw ApiError.ServerError('Some required arguments are missing')
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
            }
            if (Object.keys(body).length === 0) {
                throw ApiError.BadRequest("Empty request body");
            }

            const pkey = modelService.get_pkey(body);

            /* нужно удалять все что связанно с моделью и должны быть удалено вместе с пользователем, например аватарку */
            const model = await Model.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
            if (!model) {
                throw ApiError.NotFound(`${modelService.modelName} not found`);
            }
            /*if (user.role !== 'admin' && model[opts.creatorField] != user.id) {
                throw ApiError.Forbidden('Permission denied');
            }*/

            await Model.findOneAndDelete({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});

            await modelService.deleteAttachedFiles(model);

            return model; // dto(model);
        }

    });
}