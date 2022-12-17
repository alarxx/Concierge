
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


module.exports.addImage = async (req, res) => {

}
module.exports.removeImage = async (req, res) => {
}


/*
{id, logo: File}
*/
module.exports.setLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.files?.logo)
        return res.status(400).json({message: '\'image\' field not provided'});

    const hotel = await HotelModel.findById(req.body.id);
    if(!hotel)
        return res.status(404).json({message: 'Hotel not found'});

    // Удаляем старое лого
    if(hotel.logo) {
        const old = await FileModel.deleteAndRemoveById(hotel.logo);
        if (old.status === 'fail')
            return res.status(404).json({message: old.message});
    }

    const image = await FileModel.createAndMove(req.files.logo, req.user.id);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    hotel.logo = image.doc.id;

    res.json(await hotel.save());
}
/*
{ id }
*/
module.exports.removeLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotel = await HotelModel.findById(req.body.id);
    if(!hotel)
        return res.status(404).json({message: 'Company not found'});
    if(!hotel.logo)
        return res.status(400).json({message: 'The company doesn\'t have a logo'});

    const image = await FileModel.deleteAndRemoveById(hotel.logo);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    hotel.logo = null;

    res.json(await hotel.save());
}