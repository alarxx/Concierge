// Не совсем register больше create

const passport = require('passport');
const bcrypt = require('bcrypt');

const UserModel = require('../models/User');


async function local(userData){
  console.log(userData);
  const hash = await bcrypt.hash(userData.password, 10);

  const newUser = {
      ...userData,
      password: hash,
  };

  try{
    const created = await UserModel.create(newUser);
    return {created: true, doc: created, message: 'Account successfully created'};
  }
  catch(err){
    const errors = Object.keys(err.errors).map(key => err.errors[key].message);
    return {created: false, doc: null, message: errors};
  }
}


async function create(strategy, userData){
  if(strategy === 'local'){
    return await local(userData);
  }
}


function register(strategy){
  return async (req, res /*next*/) => {
    const data = await create(strategy, req.body);
    if(data.created){
      //next()
      res.status(201).json({message: data.message});
    }
    else {
      //next(data.message)
      res.status(409).json({message: data.message});
    }
  }
}


module.exports = register;
