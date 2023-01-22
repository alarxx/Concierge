
const colors = require('../logging/colors');
const log = require('../logging/log');


/**
 * Контроллер не задумывался для изменения нескольких документов.
 * c, r, u, d ... c - создаёт и т.д. ...
 * Я не смог написать гибкий c,r,u,d,
 * поэтому я начал пользоваться middleware-ами
 * и перекидывать данные между ними с помощью res.locals. (model - object, models - array)
 *
 * Не до конца продумал обработку файлов. Да я и не уверен, что хранить локально это хорошая идея.
 * */


const File = require("../models/binaries/File");


/** Возвращает отфильтрованный массив ключей, которые содержатся в объекте.
 *  Можно узнать наличие определенных ключей в объекте. */
function hasKeys(obj, keys){
    return keys.filter(key => obj.hasOwnProperty(key));
}

function initialize_log(Model){
    const modelName = Model.collection.modelName;
    console.log(colors.gray(`Init`), modelName, colors.gray('controller.'));
    const model = new Model({});
    if(!Model.nestedObjectKeys){
        console.log(`${colors.gray(`Not detected statics.`)}${colors.yellow('nestedObjectKeys')}${colors.gray(', default = [].')}`);
    }
    if(!Model.publicFiles){
        console.log(`${colors.gray(`Not detected statics.`)}${colors.yellow('publicFiles')}${colors.gray(', default = [].')}`);
    }
    if(!model.onCreate) {
        console.log(`${colors.gray(`Not detected methods.`)}${colors.yellow('onCreate')}${colors.gray(', just not be executed at model creation.')}`);
    }
    if(!model.deepDelete) {
        // const msg = `Add methods.deepDelete to model ${modelName}, please!`
        const msg = `${colors.yellow(`Add required methods.`)}${colors.red('deepDelete')}${colors.yellow(` to model ${modelName}, please!`)}`
        throw new Error(msg);
    }
    console.log();
}

function handleError(req, res, err){
    if(err.errors){
        const errors = Object.keys(err.errors).map(key => {
            log(colors.red(err.errors[key].message));
            return err.errors[key].message
        });
        res.status(400).json({error: errors});
    }else{
        log(colors.red(err.message));
        res.status(500).json({error: err.message});
    }
    log(colors.red(`###########################################`));
}

function getFileFields(Model){
    return Object.values(Model.schema.paths)
        .filter(field =>
            Model.schema.paths[field.path].instance === 'ObjectID' &&
            Model.schema.paths[field.path].options.ref === 'File'
        )
        .map(field => field.path);
}

function getUniqueFields(Model){
    const uniqueFields = Object.values(Model.schema.paths)
        .filter(field => field.options.unique)
        .map(field => field.path);
    uniqueFields.unshift('id');
    return uniqueFields;
}

/**
 * @Model - mongoose model, к которой мы хотим добавить controller в стиле REST.
 * @nestedObjectKeys - это поля модели, которые всегда должны вести себя как обычные вложенные объекты.
 *                     Когда мы обновляем, в body мы можем положить объекты под этими ключами и у нас автоматом обновится и та модель.
 * */
module.exports = ({Model}) => {
    // if(process.env.REST_LOG === 'needed')
        initialize_log(Model)

    const controller = {};

    controller.Model = Model;

    controller.handleError = handleError;

    const nestedObjectKeys = Model.nestedObjectKeys ? Model.nestedObjectKeys() : [];
    controller.nestedObjectKeys = nestedObjectKeys;

    /** В множественном числе дает */
    const modelName = Model.collection.modelName;
    controller.modelName = modelName;


    /**
     * fields that are unique in the collection
     * */
    const uniqueFields = getUniqueFields(Model);
    controller.uniqueFields = uniqueFields;

    /**
     * fields of Mongoose Schema that refer to File
     * */
    const fileFields = getFileFields(Model);
    controller.fileFields = fileFields;

    const publicFiles = Model.publicFiles ? Model.publicFiles() : [];
    controller.publicFiles = publicFiles;

    /**
     * Если файл в модель уже был загружен до этого, то он удаляет старый файл и загружает новый,
     * поэтому функция называется setFiles, а не addFiles
     *
     * Нужно как-нибудь из схемы указывать должен ли файл быть открытым или нет...
     *
     * @model - документ к которому мы хоти добавить файлы.
     * @files - объект, под ключами которого находятся файлы express-fileupload.
     * @user нужен для того, чтобы знать кто загрузил файл.
     * */
    async function setFiles (model, files, user) {
        if(!files) return;

        await Promise.all(
            fileFields.map(async key => {
                // Если в форме есть файл под таким ключом
                if(files[key]) {
                    // delete if file already exist
                    if(model[key]){
                        await File.deepDeleteById(model[key]);
                    }
                    const newFile = await File.createFile(files[key], user);
                    if(publicFiles.includes(key)){
                        newFile.private = false;
                        await newFile.save();
                    }
                    model[key] = (newFile).id;
                }
            })
        );
    }
    controller.setFiles = setFiles;


    /* -----------------------------------------------------------------------------------------
    Следующие 4 функции нужно будет override-ить в специфичном контроллере.
    Можно не переназначать, но для этого придется какие-то хэндлеры придумать, пока не думал как
    */
    /**
     * Deprecated
     * Первичная проверка. Проверка на то может ли пользователь вообще пользоваться этой апишкой.
     * Бывает что некоторые модели может создать только определенные пользователи
     * Можно ли изменять или имеет ли доступ к определенному методу,
     * к какому определяем в routes
     * */
    /*controller.roleAccess = (req, res, next) => { // большая проверка
        /!*if(req.user.role !== 'manager')
            return res.status(403).json({message: 'Permission denied'});*!/
        next();
    }*/

    /**
     * Проверка отправляемых с клиента двоичных файлов (req.files).
     * Разрешено ли сохранения файла с определенным расширением,
     * перед post и put, можно пользоваться controller.fileFields.
     * */
    controller.filesValidation = (req, res, next) => {
        //req.files - то, что надо проверить
        //controller.fileFields - под этими ключами должны лежать файлы в req.files
        next();
    }

    /**
     * Deprecated
     * Доступ на изменение определенного документа. Проверяем можем ли мы менять res.locals.model
     * */
    /*controller.changeAccess = (req,res, next) => {
        // у нас есть res.locals.model
        // например, пользователю можно менять только те модели, которые он создал сам:
        /!*if(res.locals.model.customer != req.user.id)
            return res.status(403).json({error: `Access denied. You are not the creator of this order`});*!/

        next();
    }*/

    /**
     * Deprecated
     * Доступ на чтение. Filter res.locals.models.
     * Задумывалось как models.filter после find.
     * Но кажется лучше сразу find переназначать
     * */
    /*controller.readAccess = (req, res, next)=>{
        // у нас есть res.locals.models
        next();
    }*/
    /* ----------------------------------------------------------------------------------------- */


    /**
     * Работает только с body, на методах put, delete,
     * Проверяем наличие и возвращаем модель по primary key.
     * Primary key за раз можно передать всего 1.
     * На самом деле, в таблице должен быть только 1 primary key
     * */
    controller.findOne = async (req, res, next) => {
        const contains = hasKeys(req.body, uniqueFields);

        if (contains.length === 0) {
            return res.status(400).json({error: `${'\''.concat(uniqueFields.join('\' or \'')).concat('\'')} field not provided`});
        }
        else if(contains.length > 1){
            return res.status(400).json({error: `More than one primary key (of ${'\''.concat(uniqueFields.join('\', \'')).concat('\'')}) provided in req.body`});
        }

        const pkey = contains[0]==='id'?'_id':contains[0];
        // console.log({[pkey]: req.body[contains[0]]});

        /*
        перенес этот кусок в update и delete, isModelFound теперь должен проверять
        if (!model){
            return res.status(404).json({error: `${modelName} not found`});
        }*/

        res.locals.model = await Model.findOne({[pkey]: req.body[contains[0]]});
        res.locals.tried = true;

        next();
    }

    /**
     * Работает только с параметрами (динамическими route-ами /:id)
     * Не хочу его использовать, лучше пусть все get будут через search queryParams проходить
     * */
    controller.findById = async (req, res) => {
        log(colors.cyan(`### FIND BY ID (${modelName}) ###`));
        const { id } = req.params;
        if(!id){
            log(colors.red("In what case can there be no id?"));
            log(colors.red('###########################################'));
            return res.status(500).json({error: "Path `id` is required. Something went wrong"});
        }
        const model = await Model.findById(id);

        if (!model){
            log(colors.red("Model not found"));
            log(colors.red('###########################################'));
            return res.status(404).json({error: `${modelName} not found`});
        }

        log(model);
        res.json(model);
        log(colors.cyan('###########################################'));
    }

    /**
     * Только с методом GET пользуемся, после чего переходим на r
     * */
    controller.find = async (req, res, next) => {
        const query = {...req.query};
        if(query.id){
            query._id = query.id;
            delete query.id;
        }

        res.locals.models = await Model.find(query);

        next();
    }


    /**
     * Здесь нужна только первичная проверка кажется (??)
     * Метод create и update сильно похожи, но create имеет функцию автоматического добавления некоторой информации (onCreate).
     * В create мы можем все записать в один try-catch, потому что мы можем сделать model.deepDelete(полностью снести модель) в случае ошибки.
     * В update же мы не можем так делать и в случае чего, нам нужно удалять специфичные изменения.
     * */
    controller.c = async (req, res) => {
        log(colors.cyan(`### CREATE (${modelName}) ###`));

        const model = new Model({});

        try {
            /**
             * Может выдать серверную ошибку. Может выдать любую ошибку, так как этот метод отдаем на заполнение пользователя кодом(программиста)....
             * Например, строим one-to-one connections, создаем модели и назначаем их id под определенное поле.
             * Еще можно указывать owner-a, например.
             * Не знаю как назвать: autoFilling, autocomplete(занято),
             * Если вернуть false, то это будет означать, что мы обработали запрос в функции.
             * Возможно логичнее было бы сделать наоборот, если выход не пустой, то означает, что обработали response,
             * Чтобы пользователю не пришлось постоянно делать return true
             */
            if(model.onCreate) {
                log(colors.gray('--- onCreate function on ---'));
                if(await model.onCreate({
                    req,
                    res,
                    body: req.body,
                    user: req.user
                })){
                    return;
                }
            }

            /**
             * Назначаем примитивные поля и производим валидацию.
             * Не знаю асинхронная ли функция set */
            await model.set(req.body);

            await model.validate();

            /* Назначаем nestedObjects
            * !!! Нужно еще добавить файлы наверное? !!! */
            await Promise.all(nestedObjectKeys.map(
                async (key) => {
                    await model.populate(key);
                    /** Назначаем примитивные поля и производим валидацию */
                    if(req.body[key]){
                        if(typeof req.body[key] !== 'object'){
                            throw new Error('bullshit nested object');
                        }
                        await model[key].set(req.body[key]).validate();
                    }
                }
            ))

            // Отсюда могут выйти системные ошибки
            await setFiles(model, req.files, req.user);

        } catch (err) {
            log(colors.red('Cancel changes. Something went wrong.'));
            await model.deepDelete();
            return handleError(req, res, err);
        }

        log(colors.gray(`--- Final Saves (${modelName}) ---`));

        await Promise.all(nestedObjectKeys.map(async key => await model[key].save()));
        await model.save();

        log(colors.cyan('###########################################'));

        return res.json(model);
    }


    /** Над этим надо будет поработать, мы не можем отдавать все что захочет пользователь
     *  Эту функцию лучше не трогать, лучше менять функцию find
     *  Этот контроллер обрабатывает только множество, если нужно только одну модель, то есть findOneById
     */
    controller.r = async (req, res) => {
        const models = res.locals.models;
        if(!models){
            console.log(colors.red('Incorrectly written code. Missing model search'));
            return res.status(500).json({error: 'Incorrectly written code. Missing model search'});
        }

        await Promise.all(models.map(async model => {
            await Promise.all(nestedObjectKeys.map(async key => {
                await model.populate(key);
            }));
        }))

        log(colors.cyan(`### FOUND (${modelName}) ###`));
        log(models);
        log(colors.cyan('###########################################'));


        res.json(models);
    }


    function _isModelFound(req, res){
        if (!res.locals.model){
            if(res.locals.tried){
                log(colors.red(`${modelName} not found`));
                res.status(404).json({error: `${modelName} not found`});
            }
            else {
                console.log(colors.red('Incorrectly written code. Missing model search'));
                res.status(500).json({error: 'Incorrectly written code. Missing model search'});
            }
            return false;
        }
        return true;
    }

    /**
     * Метод create и update сильно похожи, но create имеет функцию автоматического добавления некоторой информации (onCreate).
     * В create мы можем все записать в один try-catch, потому что мы можем сделать model.deepDelete в случае ошибки.
     * В update мы не можем так делать и в случае чего, нам нужно удалять специфичные изменения
     * */
    controller.u = async (req, res) => {
        if(!_isModelFound(req, res)) return;

        const model = res.locals.model;

        log(colors.cyan(`### UPDATE (${modelName}) ###`));

        try {
            /** Назначаем примитивные поля и производим валидацию */
            await model.set(req.body).validate();
        } catch (err) {
            return handleError(req, res, err);
        }

        /* Назначаем nestedObjects
        * !!! Нужно еще добавить файлы наверное? !!! */
        try {
            await Promise.all(nestedObjectKeys.map(
                async (key) => {
                    // Вот здесь вопрос, должны ли мы раскрывать вложенный объект, если не назначали его
                    await model.populate(key);
                    /** Назначаем примитивные поля и производим валидацию */
                    if(req.body[key]){
                        if(typeof req.body[key] !== 'object'){
                            throw new Error('bullshit nested object');
                        }
                        await model[key].set(req.body[key]).validate();
                    }
                }
            ))
        } catch (err) {
            return handleError(req, res, err);
        }


        try {
            // Отсюда могут выйти системные ошибки
            // Если выйдут, то придется отменять действия выполненные до этого
            await setFiles(model, req.files, req.user, fileFields);
        } catch (err) {
            // await removeFiles(model, req.files, req.user, fileFields); // Когда нибудь придется написать недотранзакцию
            return handleError(req, res, err);
        }

        await Promise.all(nestedObjectKeys.map(async key => await model[key].save()))
        await model.save();

        log(colors.cyan('###########################################'));

        return res.json(model);
    }


    /**
     * Самый простой и понятный метод
     * */
    controller.d = async (req, res) => {
        if(!_isModelFound(req, res)) return;

        // const model = await controller.findModel(req, res);
        const model = res.locals.model;

        log(colors.cyan(`### DELETE (${modelName}) ###`));

        try {
            await model.deepDelete();

            log(colors.cyan('###########################################'));

            // deep delete удаляет и может раскрывать некоторые нежелательные поля
            // При удалении в принципе хватает, того что мы вернем id удаленного документа
            return res.json({id: model.id, message: 'successfully deleted'});
        } catch (err) {
            return handleError(req, res, err);
        }
    }


    controller.arrayField = (key) => (req, res, next) => {
        if(!req.body[key])
            return res.status(400).json({error: `\'${key}\' field not provided`});

        let array = req.body[key];

        if(typeof array === 'string') {
            try {
                array = JSON.parse(array);
            } catch (e) {
                return res.status(400).json({error: e.message});
            }
        }

        res.locals.key = key;
        res.locals.array = array;

        next();
    };

    /** Для работы с полями массивами. Назначает как примитивные поля. С файлами по-другому должно быть*/
    controller.addToArray = async (req, res) => {
        const {model, array, key} = res.locals;
        if (!model || !array) return;

        try {
            const non_repeating = array.filter(id =>
                !model[key].some( item => item.equals(id) )
            );
            model[key] = [...model[key], ...non_repeating];
            return res.json(await model.save());
        } catch (err) {
            return handleError(req, res, err);
        }
    }

    controller.removeFromArray = async (req, res) => {
        const {model, array, key} = res.locals;
        if (!model || !array) return;

        try {
            model[key] = model[key].filter(item =>
                !array.some( id => item.equals(id) )
            );
            return res.json(await model.save());
        } catch (err) {
            return handleError(req, res, err);
        }
    }


    return controller;
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/