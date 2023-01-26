const path = require('path');

const FileModel = require("../../models/binaries/File");

module.exports.r_id = async (req, res) => {
    const file = await FileModel.findById(req.params.id);
    if(!file)
        return res.status(404).json({error: 'File not found'});

    if(file.private){
        if(!req.isAuthenticated())
            res.status(401).json({message: 'Unauthorized'});

        if(req.user.role === 'client' && file.owner != req.user.id){
                /*const filtered = file.accessHolders.filter(id => id == req.user.id);
                if(filtered.length === 0)
                    return res.status(403).json({error: 'Permission denied'});*/
            if(!file.accessHolders.includes(req.user.id))
                return res.status(403).json({error: 'Permission denied'});
        }
    }

    res.sendFile(path.resolve(require.main.path, file.path));
}

module.exports.download_id = async (req, res) => {
    const file = await FileModel.findById(req.params.id);
    if(!file)
        return res.status(404).json({error: 'File not found'});

    if(file.private){
        if(!req.isAuthenticated())
            res.status(401).json({message: 'Unauthorized'});

        if(req.user.role === 'client' && file.owner != req.user.id){
            /*const filtered = file.accessHolders.filter(id => id == req.user.id);
            if(filtered.length === 0)
                return res.status(403).json({error: 'Permission denied'});*/
            if(!file.accessHolders.includes(req.user.id))
                return res.status(403).json({error: 'Permission denied'});
        }
    }

    res.download(path.resolve(require.main.path, file.path));
}

/*
▄───▄
█▀█▀█
█▄█▄█
─███──▄▄
─████▐█─█
─████───█
─▀▀▀▀▀▀▀
*/