/**
 * Решает circular dependency problem
 * */

class ModelsManager {
    constructor() {
        this.User = require('./user/User');
        this.File = require('./binaries/File');
        this.Mailer = require('./mailer/Mailer');
        this.Post = require('./post/Post');

        // this.Company = require('./company/Company')

        // this.Message = require('./chat/Message')
        // this.Conversation = require('./chat/Conversation')
        // this.Participant = require('./chat/Participant')
        // this.Notification = require('./chat/Notification')

        this.Order = require('./order/Order')
        // this.Order_Meta = require('./order/Order_Meta')

        // this.Office = require('./services/Office');
        // this.Service = require('./services/Service');
        // this.Booking = require('./services/Booking');

        // this.Hotel = require('./services/hotel/Hotel');
        // this.Hotel_Service = require('./services/hotel/Hotel_Service');
        // this.Hotel_Booking = require('./services/hotel/Hotel_Booking');

        // this.Flight = require('./services/flight/Flight');
        // this.Flight_Service = require('./services/flight/Flight_Service');
        // this.Flight_Booking = require('./services/flight/Flight_Booking');
    }
}

module.exports = new ModelsManager();