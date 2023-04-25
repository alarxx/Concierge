const path = require('path');

const fileService = require('../../services/file-service');

module.exports = ({

    async r_id(req, res, next){
        try{
            const id = req.params.id;
            const file = await fileService.getFile(id, req.user);
            const options = {
                headers: {
                    'Content-Type': file.mimetype,
                    // 'Content-Disposition': `inline`
                },
                root: require.main.path
            };
            res.sendFile(file.path, options);
        }
        catch(e){
            next(e);
        }
    },

    async download_id(req, res, next){
        try{
            const id = req.params.id;
            const file = await fileService.getFile(id, req.user);
            res.download(path.resolve(require.main.path, file.path), file.name);
        }
        catch(e){
            next(e);
        }
    },

});

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/