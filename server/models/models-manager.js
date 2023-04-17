/**
 * Решает circular dependency problem
 * */

class ModelsManager {
    constructor() {
        this.User = require('./user/User');
        this.File = require('./binaries/File');
        this.Mailer = require('./mailer/Mailer');
        this.Post = require('./post/Post');
    }
}

module.exports = new ModelsManager();