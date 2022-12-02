// Не совсем register больше create

const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');


async function local(userData){
  const hash = await bcrypt.hash(userData.password, 7);

  const newUser = {
      ...userData,
      password: hash,
  };

  try{
    const created = await UserModel.create(newUser);
    return {status: 'success', user: created};
  }
  catch(err){
    const errors = Object.keys(err.errors).map(key => err.errors[key].message);
    return {status: 'fail', message: errors};
  }
}


async function create(strategy, req){
  if(strategy === 'local'){
    return await local(req.body);
  }
}


function register(strategy){
  return async (req, res, next) => {
    const data = await create(strategy, req);
    if(data.status === 'success'){
      next();
    }
    else {
      next(data.message);
    }
  }
}


module.exports = register;
