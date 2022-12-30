const ServiceModel = require('../../../models/services/Service');

module.exports.permission = (req, res, next)=>{
    if(req.user.role === 'client')
        res.status(403).json({message: 'Permission denied'});
    return next();
}

/** Создать может любой */
/*{
    type: 'service*_booking',
    service*_booking: id
}*/
module.exports.c = async (req, res) => {
    const exist = await ServiceModel.findOne(req.query)
    if(exist)
        return res.status(409).json(exist);

    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const service = await new ServiceModel({}).setFields(req.body).save();

        return res.json(service);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}

module.exports.r = async (req, res) => {
    const services = await ServiceModel.find(req.query);
    await Promise.all(services.map(async s => await s.populate(s.type)));
    res.json(services);
}

module.exports.d = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const service = await ServiceModel.findById(req.body.id);

    if(!service)
        return res.status(404).json({message: 'Service not found'});

    try{
        await service.deepDelete();

        return res.json(service);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}