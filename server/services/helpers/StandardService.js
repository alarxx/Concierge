
const ApiError = require("../../exceptions/ApiError");
const Logger = require('../../log/logger');
const ModelService = require("../helpers/ModelService");

/**
 * Пример как реализовывать CRUD API.
 * По умолчанию, предполагается, что доступ к api только аутентифицированным пользователям, но можно и нужно переназначать методы.
 * Create, Update, Delete в любом случае должны делать только аутентифицированные пользователи. В каком случае может быть не так?
 *
 * fileFields - все поля ObjectId, ref:'File', массив ключей.
 * uniqueFields - все поля с unique: true, массив ключей.
 * privateFiles - поля, которые возвращает статическая функция privateFiles() модели, массив ключей.
 * dto - data transfer object модели.
 * */
module.exports = (Model, dto=f=>f, opts={ creatorField: 'creator' }) => {

    const modelService = new ModelService(Model);

    // логировать от имени модели
    const logger = Logger(`${modelService.modelName}-Service`);

    return ({

        async createOne(body, files, user) {
            if (!files) {
                files = {};
            }
            if (!user) {
                logger.log({body, files, user});
                throw ApiError.ServerError('user is missing');
            }

            // Нужно найти unique поля?
            // Можно просто засетить полностью и попытаться сохранить с файлами

            const model = new Model({...body, [opts.creatorField]: user.id});

            await modelService.saveWithFiles(model, files, { user });

            return dto(model);
        },


        /**
         * Скорее всего у разных моделей будет разный find.
         * Где-то нужно только одну модель найти, где-то по id-шке, где-то сразу по нескольким id-шкам.
         * Где-то нужно не по отдельности искать, а нужна пагинация массива документов.
         * */
        async find(filters, user) {
            // Нужно сделать так, чтобы выводило множество по нескольким id!!!

            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if (!filters) {
                filters = {};
            }

            if (user.role === 'admin') {
                const models = await Model.find(filters);
                return models.map(m => dto(m));
            }

            /*
            // why not?
            if(Object.keys(filters).length === 0){
                throw ApiError.BadRequest("Empty request params");
            }*/

            if (filters.id) {
                filters._id = filters.id;
                delete filters.id;
            }

            const models = await Model.find({...filters, [opts.creatorField]: user.id});

            return models.map(m => dto(m));
        },

        /**
         * Не пользоваться!!! Это просто пример.
         * Нужно сделать пагинацию по времени и по другим параметрам, как сделать.
         * */
        async paginate(query, skip, limit) { // query

            const items = await Model.find(query)
                .sort({createdAt: -1})
                .skip(skip)
                .limit(limit);

            return items.map(item => dto(item));
        },


        async updateOne(body, files, user) {
            if (!files) files = {};

            if (!body) body = {};

            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if (Object.keys(body).length + Object.keys(files).length < 2) {
                throw ApiError.BadRequest("Empty request body or too few fields");
            }

            const pkey = modelService.get_pkey(body);

            const model = await Model.findOne({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});
            if (!model) {
                throw ApiError.NotFound(`${modelService.modelName} not found`)
            }
            if (user.role !== 'admin' && model[opts.creatorField] != user.id) {
                throw ApiError.Forbidden('Permission denied');
            }

            /*
            * Здесь нужна проверка есть ли строка файла, но там нет файла
            * Это нужно, чтобы удалять файлы.
            * */
            /* Следующие 2 строчки можно объединить и назвать set */
            await modelService.deleteInvalidFileFields(body, model);
            model.set(body);

            await modelService.saveWithFiles(model, files, { user });

            return dto(model);
        },


        async deleteOne(body, user) {
            if (!body || !user) {
                throw ApiError.ServerError('Some required arguments are missing')
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
            if (user.role !== 'admin' && model[opts.creatorField] != user.id) {
                throw ApiError.Forbidden('Permission denied');
            }

            await Model.findOneAndDelete({[(pkey === 'id' ? '_id' : pkey)]: body[pkey]});

            await modelService.deleteAttachedFiles(model);

            return dto(model);
        }

    });
}