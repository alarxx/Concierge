const File = require("./binaries/File");

/**
 * Метод просто populate-ит поля модели, которые мы указываем в keys[] и удаляет их
 * */
module.exports.deleteModels = async (model, keys) => {
    // if(this.logo) await File.deepDeleteById(this.logo);

    return await Promise.all(
        keys.map(async key => {
            // Не знаю почему я здесь 2 раза проверяю наличие
            if(model[key]) {
                await model.populate(key);
                if(model[key]) {
                    await model[key].deepDelete();
                }
            }
        })
    );
}

// Не тестил
module.exports.deleteArraysOfModels = async (model, keys) => {
    // await Promise.all(this.images.map(async id => await File.deepDeleteById(id)));

    return await Promise.all(
        keys.map(async key => {

            await model.populate(key); // Раскрываем массив

            await Promise.all(
                model[key].map(async item => { // Удаляем каждый элемент массива
                    if(item){
                        await item.deepDelete();
                    }
                })
            );

        })
    )
}

