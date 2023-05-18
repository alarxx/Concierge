
const logger = require('../../log/logger')('auth-controller');
const authService = require('../../services/auth-service');

function logout(req, res, next){
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
        res.json({ message: 'Successfully logged out' });
    });
}

function whoami(req, res, next){
    try{
        logger.log("who am i. authenticated:", Boolean(req.isAuthenticated()), "user:", req.user);
        res.json({ user: req.user });
    }
    catch(e){
        next(e);
    }
}

async function activation(req, res, next){
    try{
        const user = await authService.activation(req.body);

        res.status(201).json({ user, message: 'New user was successfully created' });
    }
    catch(e){
        next(e);
    }
}


async function setName(req, res, next){
    try{
        const {name, phone} = req.body;

        const user = await authService.setName({ user: req.user, name, phone });

        res.json({ message: "Successfully assigned a name" })
    }
    catch(e){
        next(e);
    }
}


async function sendActivationMail(req, res, next){
    try{
        await authService.sendActivationMail(req.body);
        res.json({ message: 'Email sent successfully' });
    }
    catch(e){
        next(e);
    }
}


function successAuthentication(req, res){
    const url = `${process.env.CLIENT_URL}/?authenticated=true`;
    logger.log(`Success authentication, redirect to ${url}`);
    res.redirect(303, url);
}


function failureRedirect(req, res){
    const url = `${process.env.CLIENT_URL}/?authenticated=false`;
    logger.log(`Authentication failed, please try again, redirect to ${url}`);
    res.redirect(303, url);
}


async function resetPassword(req, res, next){
    try{
        await authService.resetPassword(req.body);
        res.json({ message: 'Password successfully changed' });
    }
    catch(e){
        next(e);
    }
}

async function sendResetPasswordMail(req, res, next){
    logger.log("sendResetPasswordMail");
    try{
        await authService.sendResetPasswordMail(req.body);
        res.json({ message: 'Email sent successfully' });
    }
    catch(e){
        next(e);
    }
}


module.exports = ({
    logout,
    whoami,
    activation,
    setName,
    sendActivationMail,
    successAuthentication,
    failureRedirect,
    resetPassword,
    sendResetPasswordMail,
});