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

	const savedPhotoDir = `${rootDir}/public/files/${req.body.order}`;
	fs.mkdir(savedPhotoDir, (err)=>{});

	const photosPath = `${savedPhotoDir}/${photo.name}`;

	photo.mv(photosPath, async (err) => {
		console.log(err, photosPath);
	});

	const newModel = {
		title: req.body.title,
		body: req.body.body,
		image: photosPath,
		user_id: req.user.id
	}

	// try{
  //   const created = await PostModel.create(newModel);
  //   res.json({status: 'success', post: created});
  // }
  // catch(err){
  //   const errors = Object.keys(err.errors).map(key => err.errors[key].message);
  //   res.json({status: 'fail', message: errors});
  // }

	res.json(newModel);
});

module.exports = Router;
