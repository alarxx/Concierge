const ServiceModel = require('../../../models/services/Service');

const Model = ServiceModel;

const serviceController = require('../../controller')({Model: ServiceModel});

/**
 * В некоторых местах bookings и services controller.searchAndPopulate схожи, но они все таки достаточно разные.
 * Service могут чекать все, кроме полей цены сервиса
 * */
serviceController.searchAndPopulate = async (req, res) => {
    // Вытаскиваем id из query и переименовываем на ids
    let {id: ids} = req.query;

    // Если ids null или []
    if(!ids || ids.length===0)
        return res.status(403).json({error: 'Required search parameter/parameters `id` not found'});

    // ids обязательно должен быть массивом
    if(!Array.isArray(ids))
        ids = [ids];

    /* Найти, Раскрыть, проверить, отдать */

    let models = await Model.find({ '_id': { $in: ids } });//.select('-price -discount');

    // Если количество найденных элементов не совпадает с количеством требуемых, то сообщаем какие id не найдены
    if(models.length != ids.length){
        let filteredIds = ids.reduce((filtered, id) => {
            if(models.some(model => model.id === id))
                return filtered;
            filtered.push(id);
            return filtered
        }, []);
        return res.status(404).json({error: `[${filteredIds}] ids not found`});
    }

    try{
        await Promise.all(models.map(async model => {
            if(req.user.role === 'manager')
                await model.populate(model.type);
            else // Удаляем price и discount поля, если user.role не manager
                await model.populate({path: model.type, select: '-price -discount'});

            // Если не удалось populate-нуть основной */service, значит */service документа больше нет и, наверное, нужно удалить и service тоже
            if (!model[model.type])
                throw new Error(`Does not exist ${model.type}(${model[model.type]})`);

            // Здесь нет проверки на принадлежность service-а пользователю, потому что сервисы вроде открыты всем, кроме их цены
        }))
    }
    catch(e){
        // По идее, извиняюсь за такую обработку ошибок, просто хз как еще выходить из асинхронщины
        if(e.message.startsWith('D'))
            return res.status(404).json({error: e.message})
        else
            return res.status(400).json({error: e.message})
    }

    return res.json(models)

}

module.exports = serviceController;