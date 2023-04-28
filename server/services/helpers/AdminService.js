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

            const model = new Model({...body, [opts.creatorField]: user.id});

            await modelService.saveWithFiles(model, files, { user });

            return dto(model);
        },


        /**
         * Скорее всего у разных моделей будет разный find.
         * Где-то нужно только одну модель найти, где-то по id-шке, где-то сразу по нескольким id-шкам.
         * Где-то нужно не по отдельности искать, а нужна пагинация массива документов.
         * */
        async findByQueryParams(filters, user) {
            // Нужно сделать так, чтобы выводило множество по нескольким id!!!
            if (!user) {
                throw ApiError.ServerError('user is missing')
            }
            if(user.role !== 'admin'){
                throw ApiError.Forbidden('Permission denied. Only for admins.');
            }
            if (!filters) {
                filters = {};
            }

            if (filters.id) {
                filters._id = filters.id;
                delete filters.id;
            }

            const models = await Model.find(filters);
            return models.map(m => dto(m));
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

            return dto(model);
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

            return dto(model);
        }

    });
}