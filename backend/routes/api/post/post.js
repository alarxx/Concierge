const rootDir = require.main.path;
const express = require('express');
const fs = require('fs');
const Router = express.Router();

const PostModel = require(rootDir + '/models/Post');

Router.get('/', (req, res)=>{
	res.sendFile(rootDir + '/views/post/create_post.html');
});

Router.post('/', async (req, res)=>{
	const photo = req.files.photo;

	const savedPhotoDir = `${rootDir}/data/files/${req.body.order}`;
	fs.mkdir(savedPhotoDir, (err)=>{});

	const photosPath = `${savedPhotoDir}/${photo.name}`;

	await photo.mv(photosPath, async (err) => {
		console.log(err, photosPath);
	});

	const newModel = new PostModel({
		title: req.body.title,
		body: req.body.body,
		image: `/data/files/${req.body.order}/${photo.name}`,
		user_id: req.user.id
	});

	try{
		const created = await newModel.save();
		res.json({status: 'success', post: created});
  	}
  	catch(err){
		const errors = Object.keys(err.errors).map(key => err.errors[key].message);
		res.json({status: 'fail', message: errors});
  	}
});

Router.put('/', (req, res)=>{

});
Router.delete('/', (req, res)=>{

});

module.exports = Router;
