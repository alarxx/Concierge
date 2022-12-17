
const HotelClassModel = require('../../../../../models/services/hotel/Hotel_Class');
const FileModel = require('../../../../../models/binaries/File');


module.exports.permission = async (req, res, next) => {
    if(req.user.role === 'client')
        return res.status(403).json({message: 'Permission denied'});
    next();
}


module.exports.c = async (req, res) => {
    const exist = await HotelClassModel.findOne(req.body)
    if(exist)
        return res.status(409).json(exist);

    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const hotelClass = await new HotelClassModel({}).setFields(req.body).save();
        return res.json(hotelClass);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.r = async (req, res) => res.json(await HotelClassModel.find(req.query));


module.exports.u = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);

    if(!hotelClass)
        return res.status(404).json({message: 'Hotel Class not found'});

    try{
        res.json(await hotelClass.setFields(req.body).save());
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.d = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);

    if(!hotelClass)
        return res.status(404).json({message: 'Hotel Class not found'});

    try{
        // Удалить Price

        await hotelClass.deepDelete();

        return res.json(hotelClass);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}


/*
{company, image}
*/
module.exports.addImage = async (req, res) => {
    if(!req.body.hotelClass)
        res.status(400).json({message: '\'hotelClass\' field not provided'});
    if(!req.body.image)
        res.status(400).json({message: '\'image\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.hotelClass);
    const image = await FileModel.findById(req.body.image);

    if(!hotelClass)
        res.status(404).json({message: 'Hotel Class not found'});
    if(!image)
        res.status(404).json({message: 'Image file not found'});

    // как нибудь добавлять image и уведомлять об этом пользователя
}
module.exports.removeImage = async (req, res) => {
}