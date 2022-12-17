
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
{company, image}
*/
module.exports.addImage = async (req, res) => {
    if(!req.body.company)
        return res.status(400).json({message: '\'company\' field not provided'});
    if(!req.body.image)
        return res.status(400).json({message: '\'image\' field not provided'});

    const company = await CompanyModel.findById(req.body.company);
    const image = await FileModel.findById(req.body.image);

    if(!company)
        return res.status(404).json({message: 'Company not found'});
    if(!image)
        return res.status(404).json({message: 'Image file not found'});

    // как нибудь добавлять image и уведомлять об этом пользователя
}
module.exports.removeImage = async (req, res) => {
}
