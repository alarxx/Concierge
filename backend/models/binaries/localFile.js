/**
 * Отвечает за сохранения файлов локально и их удаления
 * */

const fs = require("fs");
const pathModule = require('path');
const BD_FILE_DIR = `data/files`;

/** Законченный метод */
async function moveFile(multifile){
    try{
        const date = Date.now();

        const dir = `${BD_FILE_DIR}/${date}`;

        fs.mkdirSync(dir);

        const fullPath = `${dir}/${multifile.name}`

        await multifile.mv(fullPath);

        return fullPath;
    }catch(err){
        return null;
    }
}

/** Законченный метод */
async function removeFile(path){
    try{
        fs.unlinkSync(path)
        fs.rmdirSync(pathModule.join(path, '..'));
        return true;
    }catch(err){
        return false;
    }
}

module.exports = {moveFile, removeFile}