const models = {}

function initialize(){
    models.User = require('./User')
    models.Company = require('./Company')

    models.File = require('./binaries/File');

    models.Message = require('./chat/Message')
    models.Conversation = require('./chat/Conversation')
    models.Participant = require('./chat/Participant')
    models.Notification = require('./chat/Notification')

    models.Order = require('./order/Order')
    models.Order_Meta = require('./order/Order_Meta')

    models.Service = require('./services/Service');
    models.Booking = require('./services/Booking');

    models.Hotel = require('./services/hotel/Hotel');
    models.Hotel_Service = require('./services/hotel/Hotel_Service');
    models.Hotel_Booking = require('./services/hotel/Hotel_Booking');
}


module.exports = {
    models,
    initialize
};