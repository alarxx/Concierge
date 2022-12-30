/**
 * Говно какое-то
 * */
const CompanyModel = require('../../models/Company');

module.exports = class CompanyController {

    constructor() {

    }

    permission(req, res, next){
        if(req.user.role !== 'manager')
            return res.status(403).json({message: 'Permission denied'});
        next();
    }


    filesValidation(req, res, next){
        // const fileValidationError = kek(req.files);
        // if(fileValidationError)
        //     return res.status(500).json({message: 'Unresolved file extension type'});
        next();
    }

    async #set(model, req, res){
        try{
            await model.set(req.body, req.user).validate();
        } catch(err){
            const errors = Object.keys(err.errors).map(key => err.errors[key].message);
            return res.status(400).json({message: errors});
        }

        try{
            // Отсюда могут выйти системные ошибки
            await model.setFiles(req.files, req.user);
        } catch(err){
            return res.status(500).json({message: err.message});
        }
    }

    async #findById(id, req, res){
        if(!req.body.id){
            res.status(400).json({message: '\'id\' field not provided'});
            return null;
        }

        const company = await CompanyModel.findById(req.body.id);

        if(!company){
            res.status(404).json({message: 'Company not found'});
            return null;
        }

        return company;
    }

    async create(req, res){
        const company = new CompanyModel({});

        if(await this.#set(company, req, res)) return;

        await company.save();
        return res.json(company);
    }


    async read(req, res){
        let companies = await CompanyModel.find(req.query);
        // какой нибудь фильтр типа
        /*
        companies = companies.filter(item => false);
        */
        res.json(companies);
    }


    async update(req, res){
        const company = this.#findById(req.body.id);
        if(!company) return;

        if(await this.#set(company, req, res)) return;

        await company.save();
        return res.json(company);
    }


    async delete(req, res){
        const company = this.#findById(req.body.id);
        if(!company) return;

        try{
            await company.deepDelete();
            return res.json(company);
        }
        catch(err){
            return res.status(500).json({message: err.message});
        }
    }
}