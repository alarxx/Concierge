/**
 * Я хотел реализовать этот стандартный контроллер так:
 * class MyController extends Controller {
 *     constructor(service) {
 *         super(service);
 *     }
 * }
 * Проблема в том, что почему-то service становится undefined, точнее сама сущность класса не сохраняется, а работает потом как static.
 * В таком случае зачем путать и использовать типа класс, если на самом деле там все статично.
 *
 * В такой реализации service будет static, как если бы мы изначально жестко вписывали какой сервис применять типа:
 * const myService = require('...');
 * */

const ApiError = require("../exceptions/ApiError");


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
            const data = await service.find(req.query, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
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