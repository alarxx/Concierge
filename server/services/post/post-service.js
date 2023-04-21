
const CrudService = require('../crud/CrudService');
const { Post } = require('../../models/models-manager');
const postDto = require('../../dtos/post-dto');

class PostService extends CrudService{
    constructor(Model, dto=f=>f, opts={ creatorField: 'creator' }) {
        super(Model, dto, opts);
    }

    // У поста например, хочется сделать и поиск конкретного поста, и пагинацию.
    // Нужно сделать пагинацию по времени и по другим параметрам, как сделать
    async paginate({ query, skip, limit }){ // query

        // если все параметры undefined, он просто вернет все.
        const items = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        this.logger.log('created', { items, query, skip, limit })

        return items.map(item => postDto(item));
    }
}

module.exports = new PostService(Post, postDto);