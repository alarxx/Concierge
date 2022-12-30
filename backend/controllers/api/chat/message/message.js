
const MessageModel = require('../../../../models/chat/Message');
const MessageController = require('../../../controller')(MessageModel);

/**
 * Первичная проверка.
 * Можно ли изменять или имеет ли доступ к определенному методу,
 * к какому определяем в routes
 * */
MessageController.roleAccess = (req, res, next) => {
    /*if(req.user.role !== 'manager')
        return res.status(403).json({message: 'Permission denied'});*/
    next();
}

/**
 * Разрешено ли сохранения файла с определенным расширением,
 * перед post и put
 * */
MessageController.filesValidation = (req, res, next) => {
    next();
}

/**
 * Доступ на изменение документа. Проверяем можем ли мы менять res.locals.model
 * */
MessageController.changeAccess = (req,res, next) => {
    // у нас есть res.locals.model
    next();
}

/**
 * Доступ на чтение. Filter res.locals.models
 * */
MessageController.readAccess = (req, res, next)=>{
    // у нас есть res.locals.models
    next();
}

module.exports = MessageController;
