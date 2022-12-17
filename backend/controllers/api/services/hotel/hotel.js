
const HotelModel = require('../../../../models/services/hotel/Hotel');
const FileModel = require('../../../../models/binaries/File');


module.exports.permission = async (req, res, next) => {
    if(req.user.role === 'client')
        return res.status(403).json({message: 'Permission denied'});
    next();
}


module.exports.c = async (req, res) => {
    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const hotel = await new HotelModel({}).setFields(req.body).save();
        return res.json(hotel);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.r = async (req, res) => res.json(await HotelModel.find(req.query));


module.exports.u = async (req, res) => {
    try{
        if(!req.body.id)
            return res.status(400).json({message: '\'id\' field not provided'});

        const hotel = await HotelModel.findById(req.body.id);

        if(!hotel)
            return res.status(404).json({message: 'Hotel not found'});

        res.json(await hotel.setFields(req.body).save());
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.d = async (req, res) => {
    try{
        if(!req.body.id)
            return res.status(400).json({message: '\'id\' field not provided'});

        const hotel = await HotelModel.findById(req.body.id);

        if(!hotel)
            return res.status(404).json({message: 'Hotel not found'});

        await hotel.deepDelete();

        return res.json(hotel);
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
}


/*
{company, image}
*/
module.exports.addImage = async (req, res) => {
    if(!req.body.hotel)
        res.status(400).json({message: '\'hotel\' field not provided'});
    if(!req.body.image)
        res.status(400).json({message: '\'image\' field not provided'});

    const hotel = await HotelModel.findById(req.body.hotel);
    const image = await FileModel.findById(req.body.image);

    if(!hotel)
        res.status(404).json({message: 'Hotel not found'});
    if(!image)
        res.status(404).json({message: 'Image file not found'});

    // как нибудь добавлять image и уведомлять об этом пользователя
}
module.exports.removeImage = async (req, res) => {
}