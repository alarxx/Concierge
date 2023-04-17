/**
 * Метод сохраняет файл локально и сохраняет в базе mongo
 * function arguments: express-fileupload file and owner user id
 * returns {status, created_doc, message}
 * */

const fs = require('fs');
const mongoose = require('mongoose');
const { File } = require('../models/models-manager');

const ApiError = require('../exceptions/ApiError');

class CrudService {
    constructor() {
        this.logger = require('../log/logger')('FileService');
    }

}

module.exports = new CrudService();