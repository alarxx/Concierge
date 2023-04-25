
const postService = require('../../../services/post/post-service');
const StandardController = require('../../StandardController');
const standardController = StandardController(postService);

async function pagination(req, res, next){
    try{
        const posts = await postService.paginate(req.query);
        res.json({ posts });
    }
    catch(e){
        next(e);
    }
}

module.exports = ({
    ...standardController,
    pagination,
});