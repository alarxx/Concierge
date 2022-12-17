
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
        return res.status(409).json({message: 'Hotel Class already exist'});

    try{
        // Здесь можно обойтись без setFields,
        // думаю поможет не забывать о нужности этого метода при update
        const hotelClass = new HotelClassModel({}).setFields(req.body);

        if(req.files?.logo){
            const image = await FileModel.createAndMove(req.files.logo, req.user.id);
            if(image.status === 'fail')
                return res.status(404).json({message: image.message});
            hotelClass.logo = image.doc.id;
        }

        return res.json(await hotelClass.save());
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
{id, multifile}
*/
module.exports.addImage = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.files?.image)
        return res.status(400).json({message: '\'image\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);
    if(!hotelClass)
        return res.status(404).json({message: 'Hotel Class not found'});

    const image = await FileModel.createAndMove(req.files.image, req.user.id);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    hotelClass.images.push(image.doc.id)

    res.json(await hotelClass.save());
}
/*
{id, image_id}
*/
module.exports.removeImage = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.body.image)
        return res.status(400).json({message: '\'image\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);
    if(!hotelClass)
        return res.status(404).json({message: 'Hotel Class not found'});

    const image = await FileModel.deleteAndRemoveById(req.body.image);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    // Удаляем объект из массива файлов поста
    const index = hotelClass.images.indexOf(req.body.image)
    hotelClass.images.splice(index, 1);

    res.json(await hotelClass.save());
}


/*
{id, logo: File}
*/
module.exports.setLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.files?.logo)
        return res.status(400).json({message: '\'image\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);
    if(!hotelClass)
        return res.status(404).json({message: 'Company not found'});

    // Удаляем старое лого
    if(hotelClass.logo) {
        const old = await FileModel.deleteAndRemoveById(hotelClass.logo);
        if (old.status === 'fail')
            return res.status(404).json({message: old.message});
    }

    const image = await FileModel.createAndMove(req.files.logo, req.user.id);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    hotelClass.logo = image.doc.id;

    res.json(await hotelClass.save());
}
/*
{ id }
*/
module.exports.removeLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const hotelClass = await HotelClassModel.findById(req.body.id);
    if(!hotelClass)
        return res.status(404).json({message: 'Company not found'});
    if(!hotelClass.logo)
        return res.status(400).json({message: 'The company doesn\'t have a logo'});

    const image = await FileModel.deleteAndRemoveById(hotelClass.logo);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    hotelClass.logo = null;

    res.json(await hotelClass.save());
}
