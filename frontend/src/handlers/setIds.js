/**
 * обход объекта и обход его внутренних объектов.
 * Если это массив, он все равно будет проходить каждый элемент (ключ - это индекс)
 * */
function objectsTraversal(obj, f){
    f(obj);

    for(const key in obj){
        if(typeof obj[key] === 'object'){
            objectsTraversal(obj[key], f)
        }
    }
}

function renameId(obj){
    if(obj._id) {
        obj.id = obj._id;
        delete obj._id;
    }
}

/**
 * Меняем объект! Не чистая функция, создавать клон, пока не вижу смысла.
 * Создать глубокий клон можно вот так JSON.parse(JSON.stringify(obj))
 * */
module.exports = function(obj){
    objectsTraversal(obj, renameId)
    return obj;
}


/*
//Проверка
const arr = [
    {_id: 1},
    "a", "b", "c",
    {d: {_id: 2}}
]
objectsTraversal(arr, console.log)
*/
