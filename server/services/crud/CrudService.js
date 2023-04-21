
const ApiError = require("../../exceptions/ApiError");
const modelService = require("../model/model-service");
const Logger = require('../../log/logger');
const {Post} = require("../../models/models-manager");
const postDto = require("../../dtos/post-dto");

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
module.exports = class CrudService {

    constructor(Model, dto=f=>f, opts={ creatorField: 'creator' }) {
        this.modelName = Model.collection.modelName;

        // логировать от имени модели
        this.logger = Logger(`${this.modelName}-Service`)

        this.Model = Model;

        this.fileFields = modelService.getFileFields(Model);
        this.uniqueFields = modelService.getUniqueFields(Model);
        this.privateFiles = modelService.getPrivateFiles(Model);

        this.dto = dto;

        this.opts = opts;
    }


    async createOne(body, files, user){
        if(!files){
            files = {};
        }
        if(!user){
            this.logger.log({ body, files, user });
            throw ApiError.ServerError('Some required arguments are missing')
        }

        // Нужно найти unique поля?
        // Можно просто засетить полностью и попытаться сохранить с файлами

        const model = new this.Model({ ...body, [this.opts.creatorField]: user.id });

        await modelService.saveWithFiles(model, files, this.fileFields, this.privateFiles, { user });

        return this.dto(model);
    }


    /**
     * Скорее всего у разных моделей будет разный find.
     * Где-то нужно только одну модель найти, где-то по id-шке, где-то сразу по нескольким id-шкам.
     * Где-то нужно не по отдельности искать, а нужна пагинация массива документов.
     * */
    async find(filters, user){
        // Нужно сделать так, чтобы выводило множество по нескольким id!!!

        if(!user){
            throw ApiError.ServerError('Some required arguments are missing')
        }
        if(!filters){
            filters = {};
        }

        if(user.role === 'admin'){
            const models = await this.Model.find(filters);
            return models.map(m => this.dto(m));
        }

        /*
        // why not?
        if(Object.keys(filters).length === 0){
            throw ApiError.BadRequest("Empty request params");
        }*/

        if(filters.id){
            filters._id = filters.id;
            delete filters.id;
        }

        const models = await this.Model.find({ ...filters, [this.opts.creatorField]: user.id });

        return models.map(m => this.dto(m));
    }

    /**
     * Не пользоваться!!! Это просто пример.
     * Нужно сделать пагинацию по времени и по другим параметрам, как сделать.
     * */
    async paginate(query, skip, limit){ // query

        const items = await this.Model.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

        return items.map(item => postDto(item));
    }


    async updateOne(body, files, user){
        if(!files) files = {};

        if(!body) body = {};

        if(!user){
            throw ApiError.ServerError('Some required arguments are missing')
        }
        if(Object.keys(body).length + Object.keys(files).length < 2){
            throw ApiError.BadRequest("Empty request body or too few fields");
        }

        const pkey = modelService.get_pkey(body, this.uniqueFields);

        const model = await this.Model.findOne({ [(pkey === 'id' ? '_id' : pkey)]: body[ pkey ] });
        if(!model){
            throw ApiError.NotFound(`${this.modelName} not found`)
        }
        if(user.role !== 'admin' && model[this.opts.creatorField] != user.id){
            throw ApiError.Forbidden('Permission denied');
        }

        /*
        * Здесь нужна проверка есть ли строка файла, но там нет файла
        * Это нужно, чтобы удалять файлы.
        * */
        /* Следующие 2 строчки можно объединить и назвать set */
        await modelService.deleteInvalidFileFields(body, model, this.fileFields);
        model.set(body);

        await modelService.saveWithFiles(model, files, this.fileFields, this.privateFiles, { user });

        return this.dto(model);
    }


    async deleteOne(body, user){
        if(!body || !user){
            throw ApiError.ServerError('Some required arguments are missing')
        }
        if(Object.keys(body).length === 0){
            throw ApiError.BadRequest("Empty request body");
        }

        const pkey = modelService.get_pkey(body, this.uniqueFields);

        /* нужно удалять все что связанно с моделью и должны быть удалено вместе с пользователем, например аватарку */
        const model = await this.Model.findOne({ [(pkey === 'id' ? '_id' : pkey)]: body[ pkey ] });
        if(!model){
            throw ApiError.NotFound(`${this.modelName} not found`);
        }
        if(user.role !== 'admin' && model[this.opts.creatorField] != user.id){
            throw ApiError.Forbidden('Permission denied');
        }

        await this.Model.findOneAndDelete({ [(pkey === 'id' ? '_id' : pkey)]: body[ pkey ] });

        await modelService.deleteAttachedFiles(model, this.fileFields);

        return this.dto(model);
    }

}