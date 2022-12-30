const express = require('express');

const Router = express.Router();

Router.use('/conversation', require('./conversation/conversation'));
Router.use('/participant', require('./participant/participant'));
Router.use('/message', require('./message/message'));

module.exports = Router;