/**
 * Контроллер не задумывался для изменения нескольких документов.
 * c, r, u, d ... c - создаёт и т.д. ...
 * Я не смог написать гибкий c,r,u,d,
 * поэтому я начал пользоваться middleware-ами
 * и перекидывать данные между ними с помощью res.locals. (model - object, models - array)
 * */

const File = require("../models/binaries/File");

/**
 * Если файл в модель уже был загружен до этого, то он удаляет старый файл и загружает новый,
 * поэтому функция называется setFiles, а не addFiles
 *
 * @model - документ к которому мы хоти добавить файлы.
 * @files - объект, под ключами которого находятся файлы express-fileupload.
 * @keys - ключи
 * @user нужен для того, чтобы знать кто загрузил файл.
 * */
async function setFiles (model, files, user, keys) {
    if(!files) return;

    await Promise.all(
        keys.map(async key => {
            // Если в форме есть файл под таким ключом
            if(files[key]) {
                // delete if already file exist
                if(model[key])
                    await File.deepDeleteById(model[key]);
                model[key] = (await File.createFile(files[key], user)).id;
            }
        })
    );
}


/** Возвращает отфильтрованный массив ключей, которые содержатся в объекте.
 *  Можно узнать наличие определенных ключей в объекте. */
function hasKeys (obj, keys){
    return keys.filter(key => obj.hasOwnProperty(key));
}


/**
 * @Model - mongoose model, к которой мы хотим добавить controller в стиле REST.
 * @nestedObjectKeys - это поля модели, которые всегда должны вести себя как обычные вложенные объекты.
 *                     Когда мы обновляем, в body мы можем положить объекты под этими ключами и у нас автоматом обновится и та модель.
 * */
module.exports = ({Model, nestedObjectKeys=[]}) => {
    const controller = {};

    /** В множественном числе дает */
    const modelName = Model.collection.collectionName;
    controller.modelName = modelName;

    /**
     * fields that are unique in the collection
     * */
    const uniqueFields = Object.values(Model.schema.paths)
        .filter(field => field.options.unique)
        .map(field => field.path);
    uniqueFields.unshift('id');
    controller.uniqueFields = uniqueFields;

    /**
     * fields of Mongoose Schema that refer to File
     * */
    const fileFields = Object.values(Model.schema.paths)
        .filter(field =>
            Model.schema.paths[field.path].instance === 'ObjectID' &&
            Model.schema.paths[field.path].options.ref === 'File'
        )
        .map(field => field.path);
    controller.fileFields = fileFields;


    /* -----------------------------------------------------------------------------------------
    Следующие 4 функции нужно будет override-ить в специфичном контроллере.
    Можно не переназначать, но для этого придется какие-то хэндлеры придумать, пока не думал как
    */
    /**
     * Первичная проверка.
     * Бывает что некоторые модели может создать только определенные пользователи
     * Можно ли изменять или имеет ли доступ к определенному методу,
     * к какому определяем в routes
     * */
    controller.roleAccess = (req, res, next) => { // большая проверка
        /*if(req.user.role !== 'manager')
            return res.status(403).json({message: 'Permission denied'});*/
        next();
    }

    /**
     * Разрешено ли сохранения файла с определенным расширением,
     * перед post и put, можно пользоваться fileFields
     * */
    controller.filesValidation = (req, res, next) => {
        next();
    }

    /**
     * Доступ на изменение документа. Проверяем можем ли мы менять res.locals.model
     * */
    controller.changeAccess = (req,res, next) => {
        // у нас есть res.locals.model
        // например, пользователю можно менять только те модели, которые он создал сам:
        /*if(res.locals.model.customer != req.user.id)
            return res.status(403).json({error: `Access denied. You are not the creator of this order`});*/

        next();
    }

    /**
     * Доступ на чтение. Filter res.locals.models.
     * Задумывалось как models.filter после find.
     * Но кажется лучше сразу find переназначать
     * */
    controller.readAccess = (req, res, next)=>{
        // у нас есть res.locals.models
        next();
    }
    /* ----------------------------------------------------------------------------------------- */


    /**
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
        const model = await Model.findOne({[pkey]: req.body[contains[0]]});

        // console.log({[pkey]: req.body[contains[0]]});
        // console.log({model});

        if (!model){
            return res.status(404).json({error: `${modelName} not found`});
        }

        await Promise.all(nestedObjectKeys.map(async key => {
            await model.populate(key);
        }));

        res.locals.model = model;
        next();
    }

    /**
     * Я не знаю как красиво сделать выбор между query и body.
     * Пусть пока побудет так
     * */
    controller.find = async (req, res, next) => {
        res.locals.models = await Model.find(req.query);
        next();
    }


    /**
     * Здесь нужна только первичная проверка кажется
     * Метод create и update сильно похожи, но create имеет функцию автоматического добавления некоторой информации (firstFilling).
     * */
    controller.c = async (req, res) => {
        const model = new Model({});

        try {
            /**
             * Назначаем примитивные поля и производим валидацию.
             * Не знаю асинхронная ли функция set */
            await model.set(req.body);
            /**
             * Может выдать серверную ошибку.
             * Например, строим one-to-one connections, создаем модели и назначаем их id под определенное поле.
             * Еще можно указывать owner-a, например.
             * Не знаю как назвать: autoFilling, autocomplete(занято),
             */
            if(model.firstFilling) {
                await model.firstFilling({
                    body: req.body,
                    user: req.user
                });
            }

            await model.validate()

            // Отсюда могут выйти системные ошибки
            await setFiles(model, req.files, req.user, fileFields);

        } catch (err) {
            await model.deepDelete();

            if(err.errors){
                const errors = Object.keys(err.errors).map(key => err.errors[key].message);
                return res.status(400).json({error: errors});
            }else{
                return res.status(500).json({error: err.message});
            }
        }

        await model.save();

        await Promise.all(nestedObjectKeys.map(async key => {
            await model.populate(key);
            await model[key].save()
        }));

        return res.json(model);
    }


    /** Над этим надо будет поработать, мы не можем отдавать все что захочет пользователь */
    controller.r = async (req, res) => {
        const models = res.locals.models;
        await Promise.all(models.map(async model => {
            await Promise.all(nestedObjectKeys.map(async key => {
                await model.populate(key);
            }));
        }))
        res.json(models);
    }


    controller.u = async (req, res) => {
        // const model = await controller.findModel(req, res);
        const model = res.locals.model;
        if(!model) return;

        try {
            /** Назначаем примитивные поля и производим валидацию */
            await model.set(req.body).validate();
        } catch (err) {
            const errors = Object.keys(err.errors).map(key => err.errors[key].message);
            return res.status(400).json({error: errors});
        }

        await Promise.all(nestedObjectKeys.map(
            async (key) => {
                try {
                    /** Назначаем примитивные поля и производим валидацию */
                    await model[key].set(req.body[key]).validate();
                } catch (err) {
                    if(err.errors){
                        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
                        return res.status(400).json({error: errors});
                    }else{
                        return res.status(500).json({error: err.message});
                    }
                }
            })
        )

        try {
            // Отсюда могут выйти системные ошибки
            // Если выйдут, то придется отменять действия выполненные до этого
            await setFiles(model, req.files, req.user, fileFields);
        } catch (err) {
            // await removeFiles(model, req.files, req.user, fileFields); // Когда нибудь придется написать недотранзакцию
            return res.status(500).json({error: err.message});
            
        }

        await model.save();
        await Promise.all(nestedObjectKeys.map(async key => await model[key].save()))
        return res.json(model);
    }


    /**
     * Самый простой и понятный метод
     * */
    controller.d = async (req, res) => {
        // const model = await controller.findModel(req, res);
        const model = res.locals.model;
        if(!model) return;

        try {
            await model.deepDelete();
            // deep delete удаляет и может раскрывать некоторые нежелательные поля
            // При удалении в принципе хватает, того что мы вернем id удаленного документа
            return res.json({id: model.id, message: 'successfully deleted'});
        } catch (err) {
            return res.status(500).json({error: err.message});
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
            const errors = Object.keys(err.errors).map(k => err.errors[k].message);
            return res.status(400).json({error: errors});
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
            const errors = Object.keys(err.errors).map(k => err.errors[k].message);
            return res.status(400).json({error: errors});
        }
    }


    return controller;
}

