
const OfficeModel = require('../../../models/services/Office');
const colors = require("../../../logging/colors");

const Model = OfficeModel;

const officeController = require('../../controller')({Model: OfficeModel});

officeController.findByQueryIds = async (req, res, next) => {
    // Вытаскиваем id из query и переименовываем на ids
    let {id: ids} = req.query;

    if(!ids && req.user.role === 'manager'){
        const models = await Model.find({});
        await Promise.all(models.map(async model => {
            await model.populate(model.type)
        }));
        res.locals.models = models;
        return next();
    }

    // Если ids null или []
    if(!ids || ids.length===0)
        return res.status(403).json({error: 'Required search parameter/parameters `id` not found'});

    // ids обязательно должен быть массивом
    if(!Array.isArray(ids))
        ids = [ids];

    try{
        /* Найти, проверить, отдать */
        const models = await Model.find({ '_id': { $in: ids } });//.select('-price -discount');

        // Если количество найденных элементов не совпадает с количеством требуемых, то сообщаем какие id не найдены
        if(models.length !== ids.length){
            let filteredIds = ids.reduce((filtered, id) => {
                if(models.some(model => model.id === id))
                    return filtered;
                filtered.push(id);
                return filtered
            }, []);
            return res.status(404).json({error: `[${filteredIds}] ids not found`});
        }

        // Нужно ли это делать здесь, вообще, где это теперь пригодится, я никогда не ищу по несколько id, а только сразу все у менеджера
        await Promise.all(models.map(async model => {
            await model.populate(model.type)
        }));

        res.locals.models = models;

    }
    catch(e){
        console.log(e);
        return res.status(400).json({error: e.message});
    }

    next();
}

module.exports = officeController;
