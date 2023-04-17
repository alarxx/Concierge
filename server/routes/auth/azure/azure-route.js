const Router = require('express').Router();

const passport = require('passport');

// Route to initiate authentication flow
Router.get('/',
    passport.authenticate('azuread-openidconnect')
);

// Route to handle the callback and obtain user information
Router.post('/callback',
    passport.authenticate('azuread-openidconnect', {
        failureRedirect: '/auth/failure',
        successRedirect: '/auth/success'
    })
);


module.exports = Router;