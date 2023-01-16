const express = require('express');
const passport = require('passport');


const Router = express.Router();


Router.get('/', (req, res)=>{
	res.sendFile(require.main.path + '/view/auth/login.html');
});

Router.post('/', passport.authenticate('local', {failureMessage: true}), (req, res)=>{
    // console.log(req.user);
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email,
		entity: req.user.entity,
		role: req.user.role,
	});
});

module.exports = Router;
