/**
 * Я не знаю почему не получается сделать через class, ошибка в this выходит
 * */

module.exports = (service) => ({
    async createOne(req, res, next){
        try{
            const data = await service.createOne(req.body, req.files, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
        }
    },

    async findByQueryParams(req, res, next){
        try{
            const data = await service.find(req.query, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
        }
    },

    async updateOne(req, res, next){
        try{
            const data = await service.updateOne(req.body, req.files, req.user);
            res.json(data);
        }
        catch(err){
            next(err)
        }
    },

    async deleteOne(req, res, next){
        try{
            const data = await service.deleteOne(req.body, req.user);
            res.json(data);
        }
        catch(err){
            next(err);
        }
    },
});

