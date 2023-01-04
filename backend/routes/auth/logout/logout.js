const express = require('express');
// const passport = require('passport');

const Router = express.Router();

/*
Router.get('/', (req, res)=>{
	req.logout((err)=>{
			res.redirect('/');
	});
});
*/

Router.delete('/', (req, res)=>{
	req.logout((err)=>{
		if(err)
			return res.status(500).json({message: err});
		res.json({message: 'successful logout'});
	});
});


module.exports = Router;
