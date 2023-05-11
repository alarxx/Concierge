const ApiError = require("../../../exceptions/ApiError");
const ModelService = require("../../helpers/ModelService");
const AdminService = require('../../helpers/AdminService');

const { Message, Participant } = require('../../../models/models-manager');
const messageDto = require('../../../dtos/chat/message-dto');
const checkNecessaryFields = require("../../helpers/checkNecessaryFields");

const logger = require('../../../log/logger')('message-service');

const adminService = AdminService(Message, messageDto, { creatorField: 'sender' });

const modelService = new ModelService(Message);

async function pagination(filters, user){ //, skip, limit, sort) { // query
    if (!user) {
        throw ApiError.ServerError('user is missing')
    }
    // if(user.role !== 'admin'){
    //     throw ApiError.Forbidden('Permission denied. Only for admins.');
    // }

    checkNecessaryFields(filters, ['skip', 'limit', 'conversation']);

    const { skip, limit, conversation } = filters;

    const participation = await Participant.find({ conversation, user: user.id });
    if(!participation){
        throw ApiError.Forbidden(`Permission to conversation(${conversation}) denied`);
    }

    // Все эти значения string, выглядеть будут примерно так -createdAt, потом нужно будет распарсить.
    // А что если сделать сортировку по несуществующему полю?
    // Потом нужно удалить из filters эти значения

    let sort;
    if (!filters.sort) {
        sort = {createdAt: -1}; // сначала новые?
    } else {
        const _sort = filters.sort;
        const fieldName = _sort.startsWith('-') ? _sort.slice(1) : _sort;
        const sortDirection = _sort.startsWith('-') ? -1 : 1;
        sort = {[fieldName]: sortDirection}
    }

    delete filters.skip;
    delete filters.limit;
    delete filters.sort;

    const items = await Message.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit);

    return items.map(item => messageDto(item));
}

module.exports = ({
    ...adminService,
    pagination,
});