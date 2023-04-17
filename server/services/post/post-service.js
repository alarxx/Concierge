
const CrudService = require('../crud/CrudService');
const { Post } = require('../../models/models-manager');
const postDto = require('../../dtos/post-dto');

class PostService extends CrudService{
    constructor(Model, dto=f=>f) {
        super(Model, dto);
    }
}

module.exports = new PostService(Post, postDto);