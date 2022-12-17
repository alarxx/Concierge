
const CompanyModel = require('../../../models/Company');
const FileModel = require('../../../models/binaries/File');


const findCompany = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const company = await CompanyModel.findById(req.body.id);

    if(!company)
        return res.status(404).json({message: 'Company not found'});

    return company;
}


module.exports.permission = async (req, res, next) => {
    if(req.user.role !== 'manager')
        return res.status(403).json({message: 'Permission denied'});
    next();
}


module.exports.c = async (req, res) => {
    try{
        const company = await new CompanyModel({}).setFields(req.body).save();
        return res.json(company);
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.r = async (req, res) => res.json(await CompanyModel.find(req.query));


module.exports.u = async (req, res) => {
    const company = await findCompany(req, res);

    try{
        res.json(await company.setFields(req.body).save());
    } catch(err) {
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return res.status(500).json({message: errors});
    }
}


module.exports.d = async (req, res) => {
    const company = await findCompany(req, res);

    try{
        await Promise.all(company.images.map(async id => await FileModel.deleteAndRemoveById(id)));

        await company.delete();

        return res.json(company);
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

    const company = await CompanyModel.findById(req.body.id);
    if(!company)
        return res.status(404).json({message: 'Company not found'});

    const image = await FileModel.createAndMove(req.files.image, req.user.id);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    company.images.push(image.doc.id)

    res.json(await company.save());
}


/*
{id, image_id}
*/
module.exports.removeImage = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.body.image)
        return res.status(400).json({message: '\'image\' field not provided'});

    const company = await CompanyModel.findById(req.body.id);
    if(!company)
        return res.status(404).json({message: 'Company not found'});

    const image = await FileModel.deleteAndRemoveById(req.body.image);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    // Удаляем объект из массива файлов поста
    const index = company.images.indexOf(req.body.image)
    company.images.splice(index, 1);

    res.json(await company.save());
}


/*
{id, multifile}
*/
module.exports.setLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});
    if(!req.files?.logo)
        return res.status(400).json({message: '\'image\' field not provided'});

    const company = await CompanyModel.findById(req.body.id);
    if(!company)
        return res.status(404).json({message: 'Company not found'});

    // Удаляем старое лого
    if(company.logo) {
        const old = await FileModel.deleteAndRemoveById(company.logo);
        if (old.status === 'fail')
            return res.status(404).json({message: old.message});
    }

    const image = await FileModel.createAndMove(req.files.logo, req.user.id);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    company.logo = image.doc.id;

    res.json(await company.save());
}
/*
{ id }
*/
module.exports.removeLogo = async (req, res) => {
    if(!req.body.id)
        return res.status(400).json({message: '\'id\' field not provided'});

    const company = await CompanyModel.findById(req.body.id);
    if(!company)
        return res.status(404).json({message: 'Company not found'});
    if(!company.logo)
        return res.status(400).json({message: 'The company doesn\'t have a logo'});

    const image = await FileModel.deleteAndRemoveById(company.logo);
    if(image.status === 'fail')
        return res.status(404).json({message: image.message});

    company.logo = null;

    res.json(await company.save());
}
