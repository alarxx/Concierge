
const User = require('../../../models/user/User');

const userController = require('../../controller')({Model: User});

userController.access = async (req, res, next) => {
    const managers = await User.find({role: "manager"});
    if(managers.length === 0){
        return next()
    }

    if(req.user.role !== 'manager'){
        return res.status(403).json({error: "Permission denied"});
    }
    next();
}

module.exports = userController;
