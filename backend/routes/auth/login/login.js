const express = require('express');
const passport = require('passport');


const Router = express.Router();


Router.get('/', (req, res)=>{
	res.sendFile(require.main.path + '/views/auth/login.html');
});

Router.post('/', passport.authenticate('local', {failureMessage: true}), (req, res)=>{
    console.log(req.user);
	res.json({
			message:'success',
			name: req.user.name,
			email: req.user.email,
		});
});

module.exports = Router;
