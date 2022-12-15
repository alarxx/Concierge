const absPath = path => require('path').join(require.main.path, path);

const express = require('express');

const Router = express.Router();

const PostModel = require(absPath('models/Post'));

Router.get('/create', (req, res)=>{
	try{
		res.sendFile(absPath('views/post/CreatePost.html'));
	}catch (e){
		res.send(e.message);
	}
});

Router.get('/:id', async (req, res)=>{
	const doc = await PostModel
		.where('_id').equals(req.params.id)
		.where('user_id').equals(req.user.id);

	if(!doc.length)
		res.status(404).json({message: 'not found'});

	res.json(doc[0]);
});

const {c, r, u, d} = require.main.require('./controllers/api/post/post');
Router.post('/', c);
Router.get('/', r);
Router.put('/', u);
Router.delete('/', d);

module.exports = Router;