module.exports = async (email) => {
    const UserModel = require('../models/models-manager').User;
    const user = await UserModel.findOne({ email });
    if(!user)
        return console.log(`Can not find user with email ${ email }`);
    user.role = 'admin';
    await user.save()
}