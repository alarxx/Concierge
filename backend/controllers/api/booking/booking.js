const BookingModel = require('../../../models/services/Booking');

const Model = BookingModel;

/**
 * В некоторых местах bookings и services controller.searchAndPopulate схожи, но они все таки достаточно разные.
 * Booking-и могут читать только менеджера и люди прикрепленные к брони
 * */
module.exports.searchAndPopulate = async (req, res) => {
    // Вытаскиваем id из query и переименовываем на ids
    let ids = {...req.query}.id;

    // Если ids null или []
    if(!ids || !ids.length)
        return res.status(403).json({error: 'Required search parameter/parameters `id` not found'});

    // ids обязательно должен быть массивом
    if(!Array.isArray(ids))
        ids = [ids];

    /* Найти, Раскрыть, проверить, отдать */

    let models = await Model.find({ '_id': { $in: ids } });

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
            await model.populate(model.type);
            // Если не удалось populate-нуть основной */booking, значит */booking документа больше нет и, наверное, нужно удалить и booking тоже
            if(!model[model.type])
                throw new Error(`Does not exist ${model.type}(${model[model.type]})`);

            if (req.user.role !== 'manager' && model[model.type].customer != req.user.id)
                throw new Error(`Forbidden for Booking(${model.id})`);
        }))
    }
    catch(e){
        // По идее, извиняюсь за такую обработку ошибок, просто хз как еще выходить из асинхронщины
        if(e.message.startsWith('D'))
            return res.status(404).json({error: e.message});
        else if(e.message.startsWith('F'))
            return res.status(403).json({error: e.message});
        else
            return res.status(400).json({error: e.message});
    }

    return res.json(models);
}