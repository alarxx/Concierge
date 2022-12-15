// Почему я не отдаю res в методы? Можно было бы не возвращать объект, а сразу отправлять ответ
// Просто как понять насколько глубоко можно отдавать res...
// Ну вообще было бы удобно, если бы все получали req, res,
// но модели, как и классы, должны отвечать только за свою часть



const PostModel = require.main.require('./models/Post');

/*
async function updatePost(req){
    try{
        if(!req.body.id) throw new Error('id must be provided');

        const model = await PostModel.findById(req.body.id);
        if(!model) throw new Error('Document not found');

        if(!canModify(req, model)) throw new Error('No permission to modify')

        if(req.body.title) model.title = req.body.title;
        if(req.body.body) model.body = req.body.body;
        if(req.files.image) model.images.push(await saveFile(req.files.image, BD_FILE_DIR));

        // console.log(req.files.image)

        model.save();

        return {status: 'success', model};
    }catch(e){
        return {status: 'fail', message:e.message};
    }
}
*/

async function createPost(req){
    // Создаем модель для mongo
    const newModel = new PostModel({...req.body});

    // Добавляем файл, если есть
    if(req.files.image){
        const {status, model, message} = await newModel.addFile(req.files.image, req.user.id);
        if(status === 'fail')
            return {status, message};
    }

    // Назначаем владельца поста
    newModel.owner = req.user.id;

    // Сохраняем модель в mongo
    try{
        const created = await newModel.save();
        return {status: 'success', model: created};
    }
    catch(err){
        const errors = Object.keys(err.errors).map(key => err.errors[key].message);
        return {status: 'fail', message: errors};
    }
}

const canModify = (user, model) => model.ownerId.equals(user.id) || model.accessHoldersIds.includes(user.id);

async function deletePost(req){
    // Поиск объекта
    const post = await PostModel.findById(req.body.id);

    // Нашелся ли объект
    if(!post)
        return {status: 'fail', message: `Not found post of ${req.body.id}`}

    // Может ли юзер редактировать пост
    if(!canModify(req.user, post))
        return {status: 'fail', message: 'user can not modify post'}

    // Удаляем все бинарные файлы связанные с постом
    const delStatus = await post.deleteAllFiles();
    if(delStatus.status === 'fail')
        return delStatus;

    // Удаляем модель из mongo
    try{
        await post.delete();
        return {status: 'success', model: post};
    }
    catch(err){
        return {status: 'fail', message: 'For some reason failed to delete'};
    }
}

module.exports.c = async (req, res) => {
    res.json(await createPost(req));
}
module.exports.r = async (req, res) => {
    const docs = await PostModel.where('ownerId').equals(req.user.id);
    // if(docs.length === 0)
    //     return res.json({message: 'haven\'t posted yet'});
    res.json(docs);
}
module.exports.u = async (req, res) => {
    // res.json(await updatePost(req));
    res.json({status: 'fail', message: 'update not implemented yet'});
}
module.exports.d = async (req, res) => {
    res.json(await deletePost(req));
}