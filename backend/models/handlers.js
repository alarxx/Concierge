const File = require("./binaries/File");

module.exports.deleteModels = async (model, keys) => {
    // if(this.logo) await File.deepDeleteById(this.logo);

    return await Promise.all(
        keys.map(async key => {
            if(model[key]) {
                await model.populate(key);
                if(model[key]) await model[key].deepDelete();
            }
        })
    );
}

// Не тестил
module.exports.deleteArraysOfModels = async (model, keys) => {
    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));

    return await Promise.all(
        keys.map(async key => {

            await model.populate(key);

            await Promise.all(
                model[key].map(async item => {
                    if(item) await item.deepDelete();
                })
            );

        })
    )
}

