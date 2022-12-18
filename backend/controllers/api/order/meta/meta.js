
const OrderMetaModel = require('../../../../models/order/Order_Meta');
const OrderModel = require('../../../../models/order/Order');
const ServiceModel = require('../../../../models/services/Service');

module.exports.r = async (req, res) => {
    // Не знаю нормально ли так сделать, я нигде так больше не делал
    // if(req.query.id){
    //     const meta = await OrderMetaModel.findById(req.query.id);
    //     if(!meta) return res.status(404).json({message: 'Order Meta not found'});
    //     await meta.populate('order');
    //     return res.json(meta);
    // }
    // else {
        const obj = {...req.query};
        if(req.query.id) obj._id = req.query.id;
        const metaModels = await OrderMetaModel.find(obj);
        await Promise.all(metaModels.map(async meta => meta.populate('order')));
        console.log(metaModels);
        const accessible = metaModels.filter(meta => meta.order.customer == req.user.id);
        return res.json(accessible);
    // }
}


/** Наверное рекомендую использовать только {id, ...fields}
 *  Не использовать order */
module.exports.u = async (req, res) => {
    if(!req.body.id && !req.body.order)
        return res.status(400).json({message: '\'id\' or \'order\' field not provided'});

    const obj = {}
    if(req.body.id) obj.id = req.body.id;
    if(req.body.order) obj.order = req.body.order;
    const meta = await OrderMetaModel.findOne(obj);

    if(!meta)
        return res.status(404).json({message: 'Order Meta not found'});

    await meta.populate('order');

    if(req.user.role === 'client' && meta.order.customer != req.user.id)
        return res.status(403).json({message: 'Permission denied'});

    try{
        res.json(await meta.setFields(req.body).save());
    } catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


/*{
    id,
    service
}*/
module.exports.addService = async (req, res) => {
    const {id, service} = req.body;

    if(!id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!service)
        return res.status(400).json({message: '\'service\' field not provided'});

    const serviceFound = await ServiceModel.findById(service);
    if(!serviceFound)
        return res.status(404).json({message: 'Service not found. You are trying to place a service that doesn\'t exist'});

    const meta = await OrderMetaModel.findById(id);
    if(!meta)
        return res.status(404).json({message: 'Order Meta not found'});

    const index = meta.preferred_services.indexOf(service)
    if(index > -1)
        return res.status(400).json({message: `The service of id(${service}) is already in the order.preferred_services array`});

    try{
        meta.preferred_services.push(service)
        res.json(await meta.save());
    }
    catch(err){
        res.json({message: err.message});
    }
}


module.exports.removeService = async (req, res) => {
    const {id, service} = req.body;

    if (!id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if (!service)
        return res.status(400).json({message: '\'service\' field not provided'});

    const meta = await OrderMetaModel.findById(id);
    if (!meta)
        return res.status(404).json({message: 'Order Meta not found'});

    // Удаляем объект из массива файлов поста
    const index = meta.preferred_services.indexOf(service)
    if (index === -1)
        return res.status(404).json({message: 'Service is not in the order.preferred_services array'});

    try {
        meta.preferred_services.splice(index, 1);
        res.json(await meta.save());
    }catch(e){
        res.json(500).json({message: e.message});
    }
}
