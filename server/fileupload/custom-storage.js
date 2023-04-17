const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

async function _fileExists(filepath){
  try{
    await fs.promises.access(filepath, fs.constants.F_OK)
    return true;
  }catch(e){
    return false;
  }
}
async function _dstPath(dstDir, hash){
  // Нужно переместить из file.tmpPath в dstDir/hash[0]/hash
  const dir = path.join(dstDir, hash.substring(0, 1));
  await fs.promises.mkdir(dir).catch(err=>{});

  // файлы с одинаковым содержимым, будут иметь одинаковый hash
  return path.join(dir, hash);
}
async function _saveFile(tmpPath, dstDir, hash){
  const dstPath = await _dstPath(dstDir, hash)

  if(!await _fileExists(dstPath)){
    // Может выйти ошибка, если file.path в tmp почему-то не существует.
    // Когда такое может быть? Если юзер залил 2 файла с одинаковыми названиями в одно и то же время в мс
    await fs.promises.rename(tmpPath, dstPath);
  } else {
    await fs.promises.unlink(tmpPath);
  }

  return dstPath;
}

function CustomStorage (opts){
  this.tmpDir = opts.tmpDir;
  this.dstDir = opts.dstDir;
}

/**
 * Записывает входящий файл во временную папку.
 * */
CustomStorage.prototype._handleFile = function _handleFile (req, file, cb) {
  (async ()=>{
    const user = { id: '6405e8c268dadbbfadd21932' }; // from req, можно, наверное, еще в body какие нибудь данные передавать

    const dstDir = this.dstDir;
    const tmpDir = this.tmpDir;

    const hashBuilder = crypto.createHash('md5');

    // В буфер кладем хэш именно по названию, 
    // ну и данные пользователя, потому что названия у разных клиентов могут совпасть, 
    // а при переносе уже пользуемся хэшем полного файла

    // !!! Нужна проверка на существование такого же файла !!! Возможно клиент будет скидывать 2 одинаковых файла одновременно
    // const nameHash = crypto.createHash('md5').update(`${user.id}${file.originalname}`).digest('hex');

    const filename = `${user.id}-${file.originalname}`;

    const destination = path.join(tmpDir, String(Date.now()));
    await fs.promises.mkdir(destination, { recursive: true }).catch(err => {});

    const tmpPath = path.join(destination, filename);
    const outStream = fs.createWriteStream(tmpPath);

    file.stream.pipe(outStream);

    file.stream.on('data', async chunk => {
      // outStream.write(chunk)
      hashBuilder.update(chunk);
    })

    outStream.on('error', cb);

    outStream.on('finish', function () {
      const hash = `${hashBuilder.digest('hex')}-${user.id}`;
      cb(null, {
        hash: hash,
        size: outStream.bytesWritten,
        save: async () => _saveFile(tmpPath, dstDir, hash),
      })
    })
  })()
}

CustomStorage.prototype._removeFile = function _removeFile (req, file, cb) {}

module.exports = function (opts) {
  return new CustomStorage(opts)
}
