const postService = require('../../../services/post/post-service');

const controller = require('../../controller')(postService);

controller.pagination = async function(req, res, next){
    try{
        const posts = await postService.paginate(req.query);
        res.json({ posts });
    }
    catch(e){
        next(e);
    }
}

module.exports = controller;