const postService = require('../../../services/post/post-service');

const controller = require('../../controller')(postService);

module.exports = controller;