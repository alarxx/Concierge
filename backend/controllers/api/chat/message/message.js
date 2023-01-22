
const MessageModel = require('../../../../models/chat/Message');
const Model = MessageModel
const messageController = require('../../../controller')({Model});

/*messageController.find = async function(){
    const query = {...req.query};
    if(query.id){
        query._id = query.id;
        delete query.id;
    }

    res.locals.models = await Model.find(query);

    next();
}*/

module.exports = messageController;
