const express = require('express');
const passport = require('passport');

const Router = express.Router();

Router.get('/', (req, res)=>{
	req.logout((err)=>{
			res.redirect('/');
	});
});

Router.delete('/', (req, res)=>{
	req.logout((err)=>{
		if(err){
			res.json({status: 'fail', message: err});
		}
		else {
			res.json({status: 'success'});
		}
	});
});


module.exports = Router;
