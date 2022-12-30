/**
 * Отвечает за сохранения файлов локально и их удаления.
 * По-моему, методы не могут выдать ошибку.
 * */

const fs = require("fs");
const pathModule = require('path');
const BD_FILE_DIR = `data/files`;

/**
 * Законченный метод.
 * Завязан на express-fileupload
 * Могут ли здесь быть ошибки? Нет, никак, если не косячить с аргументами.
 * Только об отсутствии метода mv.
 * */
async function moveFile(multifile){
    const date = Date.now();

    const dir = `${BD_FILE_DIR}/${date}`;

    await fs.mkdir(dir, e => { if(e) console.log(e) });

    const fullPath = `${dir}/${multifile.name}`

    await multifile.mv(fullPath);

    return fullPath;
}

/**
 * Законченный метод.
 * Ошибки возможны в случае отсутствия path.
 * */
async function removeFile(path){
    fs.unlinkSync(path);
    await fs.rmdir(pathModule.join(path, '..'), (e)=>{ if(e) throw e });
}

module.exports = {moveFile, removeFile}