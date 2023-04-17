
const userService = require('../../../services/user-service');

class UserController {

    async createOne(req, res, next){
        try{
            const user = await userService.createUser(req.body, req.files);
            res.json({ user, message: 'User successfully created' });
        }
        catch(e){
            next(e);
        }
    }

    async findByQueryParams(req, res, next){
        try{
            const users = await userService.findUsers(req.query);
            res.json({ users });
        }
        catch(e){
            next(e);
        }
    }

    async updateOne(req, res, next){
        try{
            const user = await userService.updateUser(req.body, req.files);
            res.json({ user, message: 'User successfully updated' });
        }
        catch(e){
            next(e);
        }
    }

    async deleteOne(req, res, next){
        try{
            const user = await userService.deleteUser(req.body);
            res.json({ user, message: 'User successfully deleted' });
        }
        catch(e){
            next(e);
        }
    }


}

module.exports = new UserController();