// Просто всё отдаем
module.exports = (obj, excludes=[]) => {
    if(!obj){
        return null;
    }
    console.log("DTO-EXCLUDES", objinstanceof, {obj, keys:Object.keys(obj), excludes});
    const dto = Object.keys(obj).reduce((acc, key) => {
            if(!excludes.includes(key)) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});

    console.log("DTO:", dto);

    if(dto._id){
        dto.id = dto._id;
        delete dto._id;
    }

    return dto;
}

