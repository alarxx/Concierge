
const { Post } = require('../models/models-manager');
const postDto = require('../dtos/post-dto');

const StandardService = require('./helpers/StandardService');
const standardService = StandardService(Post, postDto, { creatorField: 'creator' });

const logger = require('../log/logger')('post-service');

// У поста например, хочется сделать и поиск конкретного поста, и пагинацию.
// Нужно сделать пагинацию по времени и по другим параметрам, как сделать
async function paginate({ query, skip, limit }){ // query

    // если все параметры undefined, он просто вернет все.
    const items = await Post.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    logger.log('created', { items, query, skip, limit })

    return items.map(item => postDto(item));
}


module.exports = ({
    ...standardService,
    paginate,
});