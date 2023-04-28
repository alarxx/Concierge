/**
 * Я хотел реализовать этот стандартный контроллер так:
 *
 *  class MyController extends StandardController {
 *
 *     constructor(service) {
 *         super(service);
 *     }
 *
 *     myMethod(args){...}
 *
 * }
 *
 * Проблема в том, что почему-то service становится undefined, точнее сама сущность класса не сохраняется, а работает потом как static.
 * В таком случае зачем путать и использовать класс, если на самом деле там все статично.
 *
 * В такой реализации service будет static, как если бы мы изначально жестко вписывали какой сервис применять типа:
 * const myService = require('...');
 *
 * Если классы не работают, используем замыкания.
 *
 * */

const ApiError = require("../exceptions/ApiError");

/**
 * */
module.exports = (service) => ({

    async createOne(req, res, next){
        try{
            // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
            if(!req.isAuthenticated()){
                throw ApiError.UnauthorizedError('Unauthorized');
            }
            const data = await service.createOne(req.body, req.files, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
        }
    },

    async findByQueryParams(req, res, next){
        try{
            // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
            if(!req.isAuthenticated()){
                throw ApiError.UnauthorizedError('Unauthorized');
            }
            const data = await service.findByQueryParams(req.query, req.user);
            res.json(data);
        }
        catch(err){
            console.error("findByQueryParams:", err);
            next(err);
        }
    },

    async pagination(req, res, next){
        try{
            // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
            if(!req.isAuthenticated()){
                throw ApiError.UnauthorizedError('Unauthorized');
            }
            const data = await service.pagination(req.query, req.user);
            res.json(data);
        }
        catch(e){
            next(e);
        }
    },

    async updateOne(req, res, next){
        try{
            // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
            if(!req.isAuthenticated()){
                throw ApiError.UnauthorizedError('Unauthorized');
            }
            const data = await service.updateOne(req.body, req.files, req.user);
            res.json(data);
        }
        catch(err){
            next(err)
        }
    },

    async deleteOne(req, res, next){
        try{
            // Предполагается что, по умолчанию доступ к api доступен только для аутентифицированных пользователей
            if(!req.isAuthenticated()){
                throw ApiError.UnauthorizedError('Unauthorized');
            }
            const data = await service.deleteOne(req.body, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
        }
    },

});