//Паспорт отвечает только за логин, без регистрации

const passport = require("passport");
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local');

const UserModel = require('../models/user/User');

module.exports = () => {
    passport.use(new LocalStrategy(
    	{
    		passReqToCallback: true,
    		usernameField: "email",
    	},
    	async (req, email, password, done) => {
            const user = await UserModel.findOne({email});

            if (user){
              bcrypt.compare(password, user.password,
                (err, res)=>{
                  // console.log(err, res);
                  if(res){
                    return done(null, user);
                  }
                  else {
                    return done(null, false, {message: err});
                  }
                }
              );
            }
            else{
                // console.log({message: "No such user"});
                done(null, false, {message: "No such user"});
            }
        }
    ))

    // Срабатывает один раз, как init
    passport.serializeUser(async (user, done)=>{
        // console.log('serializeUser', user);
        done(null, user.id);
    });
    // Срабатывает каждый раз, проверяет не удалился ли юзер из бд, например
    passport.deserializeUser(async (id, done)=>{
        // console.log('deserializeUser', id);
        UserModel.findById(id, (err, user)=>{
          if(user)
            return done(null, user);
          else done(null, false);
        });

    });
};

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/