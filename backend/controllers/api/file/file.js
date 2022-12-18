const path = require('path');


const FileModel = require("../../../models/binaries/File");


module.exports.r = async (req, res) => {
    const file = await FileModel.findById(req.params.id);
    if(!file)
        return res.status(404).json({message: 'File not found'});

    if(file.private && req.user.role === 'client'){
        if(file.owner != req.user.id){
            const filtered = file.accessHolders.filter(id => id == req.user.id);
            if(filtered.length === 0)
                return res.status(403).json({message: 'Permission denied'});
        }
    }

    res.sendFile(path.resolve(require.main.path, file.path));
}

