module.exports = (obj, includes=[]) => {
    if(!obj){
        return null;
    }

    const dto = includes.reduce((acc, key) => {
            acc[key] = obj[key];
            return acc;
        }, {});

    if(dto._id){
        dto.id = dto._id;
        delete dto._id;
    }

    return dto;
}

